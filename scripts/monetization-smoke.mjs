import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.join(root, ".monetization-smoke-last.json");

function readEnvFile(file) {
  if (!fs.existsSync(file)) return {};

  const env = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index < 0) continue;

    const key = trimmed.slice(0, index).trim();
    const rawValue = trimmed.slice(index + 1).trim();
    env[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
  return env;
}

function redactConfig(env) {
  return {
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL ? "present" : "missing",
    STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY
      ? env.STRIPE_SECRET_KEY.startsWith("sk_test_")
        ? "present_test"
        : env.STRIPE_SECRET_KEY.startsWith("sk_live_")
          ? "present_live"
          : "present_unknown_prefix"
      : "missing",
    OPENAI_API_KEY: env.OPENAI_API_KEY ? "present" : "missing",
    OPENAI_MODEL: env.OPENAI_MODEL || "default"
  };
}

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

function requestJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        let json = null;
        try {
          json = body ? JSON.parse(body) : null;
        } catch {
          json = null;
        }
        resolve({ body, headers: res.headers, json, statusCode: res.statusCode });
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function waitForReady(baseUrl, timeoutMs = 15000) {
  const started = Date.now();
  let lastError = "";

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await requestJson(baseUrl);
      if (response.statusCode && response.statusCode < 500) return;
      lastError = `HTTP ${response.statusCode}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  throw new Error(`Server did not become ready: ${lastError}`);
}

function runBuild() {
  const result = spawnSync("npm", ["run", "build"], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe"
  });

  if (result.status !== 0) {
    throw new Error(`Production build failed:\n${result.stdout}\n${result.stderr}`);
  }
}

function startServer(env, port) {
  const child = spawn("npm", ["start"], {
    cwd: root,
    env: { ...process.env, ...env, NEXT_PUBLIC_SITE_URL: `http://localhost:${port}`, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  });

  let logs = "";
  child.stdout.on("data", (chunk) => {
    logs += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    logs += chunk.toString();
  });

  return { child, getLogs: () => logs.slice(-4000) };
}

function sampleCheckoutPayload() {
  return {
    style: "anxious",
    locale: "zh",
    answers: [
      { questionId: "q1", optionId: "A", optionText: "开始焦虑，频繁看手机", style: "anxious" },
      { questionId: "q2", optionId: "D", optionText: "害怕被抛下或被突然冷落", style: "anxious" },
      { questionId: "q3", optionId: "D", optionText: "反复琢磨对方每句话是什么意思", style: "anxious" },
      { questionId: "q4", optionId: "A", optionText: "很快投入，爱得太用力", style: "anxious" },
      { questionId: "q5", optionId: "A", optionText: "被离开", style: "anxious" }
    ]
  };
}

async function main() {
  const env = {
    ...readEnvFile(path.join(root, ".env")),
    ...readEnvFile(path.join(root, ".env.local"))
  };
  const config = redactConfig(env);
  const port = await findFreePort();
  const baseUrl = `http://localhost:${port}`;
  const report = {
    checkedAt: new Date().toISOString(),
    baseUrl,
    config,
    checks: []
  };

  let server;
  try {
    runBuild();
    report.checks.push({ name: "production_build", status: "pass" });

    server = startServer(env, port);
    await waitForReady(baseUrl);
    report.checks.push({ name: "production_server_ready", status: "pass" });

    const checkout = await requestJson(`${baseUrl}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: baseUrl
      },
      body: JSON.stringify(sampleCheckoutPayload())
    });

    const checkoutUrl = checkout.json?.url || "";
    if (!env.STRIPE_SECRET_KEY) {
      const failedClosed = checkout.statusCode === 500 && /Stripe is not configured/i.test(checkout.body);
      report.checks.push({
        name: "checkout_without_stripe_fails_closed",
        status: failedClosed ? "pass" : "fail",
        httpStatus: checkout.statusCode
      });
      report.status = "blocked_config";
      report.nextAction = "Add STRIPE_SECRET_KEY to .env.local, then rerun npm run monetization:smoke.";
    } else if (checkout.statusCode === 200 && /^https:\/\/checkout\.stripe\.com\//.test(checkoutUrl)) {
      report.checks.push({
        name: "stripe_checkout_url_created",
        status: "pass",
        httpStatus: checkout.statusCode,
        checkoutHost: "checkout.stripe.com"
      });
      report.checkoutUrl = checkoutUrl;
      report.status = env.OPENAI_API_KEY ? "ready_for_manual_test_payment" : "checkout_ready_openai_fallback";
      report.nextAction = env.OPENAI_API_KEY
        ? "Open the checkout URL and complete a Stripe test payment if explicitly authorized."
        : "Add OPENAI_API_KEY for live AI reports; checkout creation is ready.";
    } else {
      report.checks.push({
        name: "stripe_checkout_url_created",
        status: "fail",
        httpStatus: checkout.statusCode,
        body: checkout.body.slice(0, 500)
      });
      report.status = "failed";
      report.nextAction = "Inspect /api/checkout and Stripe environment configuration.";
    }
  } catch (error) {
    report.status = "failed";
    report.error = error instanceof Error ? error.message : String(error);
    if (server) report.serverLogs = server.getLogs();
  } finally {
    if (server) server.child.kill("SIGTERM");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
  }

  console.log(JSON.stringify(report, null, 2));
  if (report.status === "failed" || report.status === "blocked_config") {
    process.exit(1);
  }
}

main();

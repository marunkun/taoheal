import type { D1Database } from "@cloudflare/workers-types";

interface CloudflareEnv {
  DB: D1Database;
  [key: string]: unknown;
}

interface CloudflareContext {
  env: CloudflareEnv;
}

let cachedContext: CloudflareContext | null = null;

export function getCloudflareContext(): CloudflareContext {
  if (cachedContext) return cachedContext;

  // 在 Edge Runtime 中使用 process.env
  if (typeof process !== "undefined" && process.env) {
    cachedContext = {
      env: {
        DB: process.env.DB as unknown as D1Database,
        ...process.env,
      } as CloudflareEnv,
    };
  }

  return cachedContext || { env: { DB: undefined as unknown as D1Database } };
}

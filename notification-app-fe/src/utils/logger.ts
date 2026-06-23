type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils"
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";
interface LogRequest {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}
interface LogResponse {
  logID?: string;
  message?: string;
  [key: string]: unknown;
}
const LOG_ENDPOINT = "http://4.224.186.213/evaluation-service/logs";
const TOKEN: string = import.meta.env.VITE_LOG_TOKEN;
export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string,
): Promise<LogResponse | null> {
  try {
    const payload: LogRequest = {
      stack,
      level,
      package: pkg,
      message,
    };
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data: LogResponse = await response.json();
    if (!response.ok) {
      console.error("Logging API Error:", data);
      return null;
    }
    return data;
  } catch (error) {
    console.error(
      "Logging Middleware Error:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

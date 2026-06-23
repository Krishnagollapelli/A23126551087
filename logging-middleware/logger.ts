type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  // Frontend
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  // Shared
  | "auth"
  | "config"
  | "middleware"
  | "utils"
  // Backend
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
export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string,
  token: string,
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
        Authorization: `Bearer ${token}`,
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

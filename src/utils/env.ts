import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// List required variables here
export const ENV = {
  E2E_FRONT_URL: requireEnv("E2E_FRONT_URL"),
  E2E_STANDARD_USER: requireEnv("E2E_STANDARD_USER"),
  E2E_LOCKED_USER: requireEnv("E2E_LOCKED_USER"),
  E2E_PROBLEM_USER: requireEnv("E2E_PROBLEM_USER"),
  E2E_PERFORMANCE_USER: requireEnv("E2E_PERFORMANCE_USER"),
  E2E_ERROR_USER: requireEnv("E2E_ERROR_USER"),
  E2E_VISUAL_USER: requireEnv("E2E_VISUAL_USER"),
  E2E_ALL_USER_PSWD: requireEnv("E2E_ALL_USER_PSWD"),
};

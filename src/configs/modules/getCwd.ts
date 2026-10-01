export const getCwd = (env: NodeJS.ProcessEnv): string => {
  if ((env.USE_INIT_CWD ?? "false") === "false") {
    return process.cwd();
  }
  if (env.INIT_CWD !== null && env.INIT_CWD !== undefined) {
    return env.INIT_CWD;
  }
  return process.cwd();
};

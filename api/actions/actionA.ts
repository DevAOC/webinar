export const run: ActionRun = async ({ params, logger, api, connections }) => {
  logger.error("Uh oh!");
  // logger.

  throw new Error("Uh oh!");
};

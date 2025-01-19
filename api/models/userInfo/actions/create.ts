import { applyParams, save, ActionOptions } from "gadget-server";

export const run: ActionRun = async ({ params, record, logger, api, connections }) => {
  applyParams(params, record);
  await save(record);
};

export const onSuccess: ActionOnSuccess = async ({
  params,
  record,
  logger,
  api,
}) => {
  // Extract the necessary fields from the record
  const { phoneNumber, fullName, eContact, address, userEmail } = record;

  // Log the extracted fields
  logger.info(
    { phoneNumber, fullName, eContact, address, userEmail },
    `Gadgemon created with the following details: phoneNumber=${phoneNumber}, fullName=${fullName}, address=${address}, eContact=${eContact}, userEmail=${userEmail}`
  );
};

export const options: ActionOptions = {
  actionType: "create",
};
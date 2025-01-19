import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "userInfo" model, go to https://usafe.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "xuvYwQfG8uOp",
  fields: {
    address: {
      type: "string",
      validations: { required: true },
      storageKey: "oNksUn8FOcQd",
    },
    eContact: {
      type: "string",
      validations: { required: true },
      storageKey: "ijDvVn3eNL7i",
    },
    fullName: {
      type: "string",
      validations: { required: true },
      storageKey: "ziyukxOf1fWn",
    },
    phoneNumber: {
      type: "string",
      validations: { required: true },
      storageKey: "TlqMahmUHHYq",
    },
    userEmail: {
      type: "string",
      validations: { required: true },
      storageKey: "ZBxM97HyJpCz",
    },
  },
};

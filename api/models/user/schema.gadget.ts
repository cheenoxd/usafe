import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://usafe.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "NRT7lsg270tI",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "t0uxilUtAYEm",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "PYq-zhGCj6u9",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "oWeMbVr6h8ea",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "IZLaXWpNAWVO",
    },
    firstName: { type: "string", storageKey: "pT628ogUXb41" },
    gender: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["Female", "Male", "Non-binary"],
      storageKey: "97zIEdz_VBZn",
    },
    googleImageUrl: { type: "url", storageKey: "rz24JoTG5mt4" },
    googleProfileId: { type: "string", storageKey: "SzA0VNP8KRYu" },
    lastName: { type: "string", storageKey: "-sWlCeO7J_CQ" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "CJR-H3d4pHek",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "78BYiwbPAiFX",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "fdJJuyX_orqd",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "ZFnIqNebOuiE",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "ctaa_3HhB1zP",
    },
  },
};

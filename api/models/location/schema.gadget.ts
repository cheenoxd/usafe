import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "location" model, go to https://usafe.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "BgyvLotgT-pB",
  fields: {
    latitude: {
      type: "number",
      decimals: 2,
      storageKey: "It7066-ZsBE2",
    },
    longitude: {
      type: "number",
      decimals: 2,
      storageKey: "1ZXHqXZ3p76k",
    },
    userIdz: { type: "number", storageKey: "kSMunQPrv4H5" },
  },
};

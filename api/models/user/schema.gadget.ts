import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://abcde.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "sxl1FUWfc57v",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "Vnwn0LANI3Sr",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "Yt57mUEF2J4P",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Lwqauv8GRR5-",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "p_vzigEkplAH",
    },
    firstName: { type: "string", storageKey: "7T4YTnvhSIJN" },
    googleImageUrl: { type: "url", storageKey: "tbSwRzdKccFh" },
    googleProfileId: { type: "string", storageKey: "XhLTegpGEy-x" },
    lastName: { type: "string", storageKey: "r3exS72sWwIA" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "qWV52f1-M9o8",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "V8d9FJK2Ca5p",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "LPWDjVLeGXAB",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "VKwzkqKXHCmB",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "whqUqV9Ytzld",
    },
  },
};

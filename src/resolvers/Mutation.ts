import { IContext } from "./types";
import { signupClientMutation } from "./mutations/client/signup/signup";
import { ISignupClientArgs } from "../resolvers/mutations/client/signup/types";
import { ISignupProviderArgs } from "./mutations/provider/signup/types";
import { signupProviderMutation } from "./mutations/provider/signup/signup";
import { ISigninClientArgs } from "./mutations/client/signin/types";
import { signinClientMutation } from "./mutations/client/signin/signin";
import { ISigninProviderArgs } from "./mutations/provider/signin/types";
import { signinProviderMutation } from "./mutations/provider/signin/signin";
import { addServiceMutation } from "./mutations/service/addServices/addServices";
import { IAddServiceArgs } from "./mutations/service/addServices/types";
import { addStaffMutation } from "./mutations/staff/addStaff/addStaff";
import { IAddStaffArgs } from "./mutations/staff/addStaff/types";
import { IDeleteServiceArgs } from "./mutations/service/deleteService/types";
import { deleteServiceMutation } from "./mutations/service/deleteService/deleteService";
import { IDeleteStaffArgs } from "./mutations/staff/deleteStaff/types";
import { deleteStaffMutation } from "./mutations/staff/deleteStaff/deleteStaff";
import { editServiceMutation } from "./mutations/service/editService/editService";
import { IEditServiceArgs } from "./mutations/service/editService/types";
import { IEditStaffArgs } from "./mutations/staff/editStaff/types";
import { editStaffMutation } from "./mutations/staff/editStaff/editStaff";

export default {
  /**
   * Client sign up mutation
   */
  signupClient: async (_: any, client: ISignupClientArgs, ctx: IContext) => {
    return signupClientMutation(_, client, ctx);
  },
  /**
   * Client sign in mutation
   */
  signinClient: async (_: any, client: ISigninClientArgs, ctx: IContext) => {
    return signinClientMutation(_, client, ctx);
  },

  /**
   * Provider sign up mutation
   */
  signupProvider: async (
    _: any,
    provider: ISignupProviderArgs,
    ctx: IContext
  ) => {
    return signupProviderMutation(_, provider, ctx);
  },

  /**
   * Provider sign up mutation
   */
  signinProvider: async (
    _: any,
    provider: ISigninProviderArgs,
    ctx: IContext
  ) => {
    return signinProviderMutation(_, provider, ctx);
  },

  /**
   * Add service mutation
   */
  addService: async (_: any, service: IAddServiceArgs, ctx: IContext) => {
    return addServiceMutation(_, service, ctx);
  },

  /**
   * Delete service mutation
   */
  deleteService: async (_: any, service: IDeleteServiceArgs, ctx: IContext) => {
    return deleteServiceMutation(_, service, ctx);
  },

  /**
   * Edit service mutation
   */
  editService: async (_: any, service: IEditServiceArgs, ctx: IContext) => {
    return editServiceMutation(_, service, ctx);
  },

  /**
   * Add staff mutation
   */
  addStaff: async (_: any, staff: IAddStaffArgs, ctx: IContext) => {
    return addStaffMutation(_, staff, ctx);
  },

  /**
   * Delete staff mutation
   */
  deleteStaff: async (_: any, staff: IDeleteStaffArgs, ctx: IContext) => {
    return deleteStaffMutation(_, staff, ctx);
  },

  /**
   * Edit staff mutation
   */
  editStaff: async (_: any, staff: IEditStaffArgs, ctx: IContext) => {
    return editStaffMutation(_, staff, ctx);
  },
};

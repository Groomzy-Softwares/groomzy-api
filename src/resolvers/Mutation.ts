import { IContext } from "./types";
import { signupClientMutation } from "./mutations/client/signup/signup";
import { ISignupClientArgs } from "../resolvers/mutations/client/signup/types";
import { ISignupProviderArgs } from "./mutations/provider/signup/types";
import { signupProviderMutation } from "./mutations/provider/signup/signup";
import { ISigninClientArgs } from "./mutations/client/signin/types";
import { signinClientMutation } from "./mutations/client/signin/signin";
import { ISigninProviderArgs } from "./mutations/provider/signin/types";
import { signinProviderMutation } from "./mutations/provider/signin/signin";

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
};

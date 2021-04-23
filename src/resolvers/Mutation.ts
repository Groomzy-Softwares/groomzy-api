import { IContext } from "./types";
import { signupClientMutation } from "./mutations/client/signup";
import { ISignupClientArgs } from "../resolvers/mutations/client/types";
import { ISignupServiceProviderArgs } from "./mutations/provider/types";
import { signupServiceProviderMutation } from "./mutations/provider/signup";

export default {
  /**
   * Client sign up mutation
   */
  signupClient: async (_: any, client: ISignupClientArgs, ctx: IContext) => {
    return signupClientMutation(_, client, ctx);
  },
  signupServiceProvider: async (
    _: any,
    serviceProvider: ISignupServiceProviderArgs,
    ctx: IContext
  ) => {
    return signupServiceProviderMutation(_, serviceProvider, ctx);
  },
};

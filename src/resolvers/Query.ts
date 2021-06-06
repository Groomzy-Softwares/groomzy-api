import { IContext } from "./types";
import { clientsQuery } from "./queries/client/clients";
import { providersQuery } from "./queries/provider/providers";

export default {
  /**
   * Get all clients
   * @param _
   * @param __
   * @param ctx
   * @returns [Client]
   */
  clients: async (_: any, __: any, ctx: IContext) => clientsQuery(_, __, ctx),

  /**
   * Get all service providers
   * @param _
   * @param __
   * @param ctx
   * @returns [Privider]
   */
  providers: async (_: any, __: any, ctx: IContext) =>
    providersQuery(_, __, ctx),

  /**
   * TO DO ADD MORE QUERIES
   */
};

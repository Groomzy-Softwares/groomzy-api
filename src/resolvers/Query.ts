import { IContext } from "./interfaces";
import { clientsQuery } from "./queries/client/clients";

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
   * TO DO ADD MORE QUERIES
   */
};

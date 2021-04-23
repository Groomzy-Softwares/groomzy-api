import { IContext } from "../../types";

export const providersQuery = async (_: any, __: any, ctx: IContext) => {
  try {
    return ctx.prisma.serviceProvider.findMany({
      include: {
        address: true,
      },
    });
  } catch (error) {
    throw Error(error.message);
  }
};

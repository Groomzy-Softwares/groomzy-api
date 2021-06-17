import { IContext } from "../../types";

export const providersQuery = async (_: any, __: any, ctx: IContext) => {
  try {
    return ctx.prisma.provider.findMany({
      include: {
        address: true,
        dayTimes: {
          include: {
            day: true,
            time: true,
          },
        },
        staffs: true,
        bookings: {
          include: {
            rating: true,
          },
        },
        serviceProviderCategories: {
          select: {
            category: true,
          },
        },
      },
    });
  } catch (error) {
    throw Error(error.message);
  }
};

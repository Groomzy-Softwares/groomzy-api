import { IContext } from "../../types";

export const providerBookingsQuery = async (
  _: any,
  provideBookingsArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = provideBookingsArgs;
  try {
    return ctx.prisma.provider.findFirst({
      where: {
        id: providerId,
      },
      select: {
        bookings: {
          include: {
            client: true,
            staff: true,
            service: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

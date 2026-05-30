import prisma from "../../lib/prisma";

export class UsersService {
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      include: {
        driverProfile: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...safeUser } = user;

    return safeUser;
  }
}
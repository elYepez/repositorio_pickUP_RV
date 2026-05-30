import prisma from "../../lib/prisma";

interface DriverProfileData {
  userId: string;
  licenseNumber: string;
  plateNumber: string;
  vehicleModel: string;
  vehicleColor: string;
}

export class DriverService {
  static async createProfile(
    data: DriverProfileData
  ) {
    const existingProfile =
      await prisma.driverProfile.findUnique({
        where: {
          userId: data.userId,
        },
      });

    if (existingProfile) {
      throw new Error(
        "Driver profile already exists"
      );
    }

    const profile =
      await prisma.driverProfile.create({
        data: {
          userId: data.userId,
          licenseNumber: data.licenseNumber,
          plateNumber: data.plateNumber,
          vehicleModel: data.vehicleModel,
          vehicleColor: data.vehicleColor,
        },
      });

    return profile;
  }
}
import prisma from "../../lib/prisma";

interface CreateRouteData {
  driverId: string;

  origin: string;
  destination: string;

  departureTime: string;

  availableSeats: number;

  price?: number;
}

export class RoutesService {
  static async createRoute(
    data: CreateRouteData
  ) {
    const route = await prisma.route.create({
      data: {
        driverId: data.driverId,

        origin: data.origin,
        destination: data.destination,

        departureTime: new Date(
          data.departureTime
        ),

        availableSeats: data.availableSeats,

        price: data.price,
      },

      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            driverProfile: true,
          },
        },
      },
    });

    return route;
  }

  static async getRoutes() {
    const routes = await prisma.route.findMany({
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            driverProfile: true,
          },
        },
      },

      orderBy: {
        departureTime: "asc",
      },
    });

    return routes;
  }
}
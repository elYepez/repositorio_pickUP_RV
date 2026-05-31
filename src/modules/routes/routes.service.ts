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

  static async getMyRoutes(
  driverId: string
) {
  return prisma.route.findMany({
    where: {
      driverId
    },

    include: {
      tripRequests: true
    }
  });
}

static async cancelRoute(
  routeId: string,
  driverId: string
) {
  const route =
    await prisma.route.findUnique({
      where: {
        id: routeId
      }
    });

  if (!route) {
    throw new Error("Route not found");
  }

  if (route.driverId !== driverId) {
    throw new Error("Forbidden");
  }

  return prisma.route.update({
    where: {
      id: routeId
    },

    data: {
      status: "CANCELLED"
    }
  });
}
static async completeRoute(
  routeId: string,
  driverId: string
) {
  const route =
    await prisma.route.findUnique({
      where: {
        id: routeId
      }
    });

  if (!route) {
    throw new Error("Route not found");
  }

  if (route.driverId !== driverId) {
    throw new Error("Forbidden");
  }

  return prisma.route.update({
    where: {
      id: routeId
    },

    data: {
      status: "COMPLETED"
    }
  });
}



  static async getRouteById(routeId: string) {
  const route = await prisma.route.findUnique({
    where: {
      id: routeId
    },

    include: {
      driver: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },

      tripRequests: {
        include: {
          passenger: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });

  if (!route) {
    throw new Error("Route not found");
  }

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
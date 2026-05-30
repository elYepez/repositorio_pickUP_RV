import prisma from "../../lib/prisma";

export class TripRequestsService {
  static async createRequest(
    passengerId: string,
    routeId: string
  ) {
    const route = await prisma.route.findUnique({
      where: {
        id: routeId,
      },
    });

    if (!route) {
      throw new Error("Route not found");
    }

    if (route.availableSeats <= 0) {
      throw new Error("No seats available");
    }

    const existingRequest =
      await prisma.tripRequest.findFirst({
        where: {
          passengerId,
          routeId,
        },
      });

    if (existingRequest) {
      throw new Error(
        "Trip request already exists"
      );
    }

    const request =
      await prisma.tripRequest.create({
        data: {
          passengerId,
          routeId,
        },

        include: {
          passenger: {
            select: {
              id: true,
              name: true,
            },
          },

          route: true,
        },
      });

    return request;
  }

  static async acceptRequest(
    requestId: string,
    driverId: string
  ) {
    const request =
      await prisma.tripRequest.findUnique({
        where: {
          id: requestId,
        },

        include: {
          route: true,
        },
      });

    if (!request) {
      throw new Error("Request not found");
    }

    if (request.route.driverId !== driverId) {
      throw new Error("Forbidden");
    }

    if (request.route.availableSeats <= 0) {
      throw new Error("No seats available");
    }

    await prisma.route.update({
      where: {
        id: request.routeId,
      },

      data: {
        availableSeats: {
          decrement: 1,
        },
      },
    });

    const updatedRequest =
      await prisma.tripRequest.update({
        where: {
          id: requestId,
        },

        data: {
          status: "ACCEPTED",
        },
      });

    return updatedRequest;
  }

  static async getAllRequests() {
  return prisma.tripRequest.findMany({
    include: {
      passenger: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      route: {
        select: {
          id: true,
          origin: true,
          destination: true,
          driverId: true
        }
      }
    }
  });
}

static async getMyRequests(passengerId: string) {
  return prisma.tripRequest.findMany({
    where: {
      passengerId
    },
    include: {
      route: {
        include: {
          driver: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
}

static async rejectRequest(
  requestId: string,
  driverId: string
) {
  const request =
    await prisma.tripRequest.findUnique({
      where: {
        id: requestId
      },
      include: {
        route: true
      }
    });

  if (!request)
    throw new Error("Request not found");

  if (request.route.driverId !== driverId)
    throw new Error("Forbidden");

  return prisma.tripRequest.update({
    where: {
      id: requestId
    },
    data: {
      status: "REJECTED"
    }
  });
}
static async cancelRequest(
  requestId: string,
  passengerId: string
) {
  const request =
    await prisma.tripRequest.findUnique({
      where: {
        id: requestId
      }
    });

  if (!request)
    throw new Error("Request not found");

  if (request.passengerId !== passengerId)
    throw new Error("Forbidden");

  return prisma.tripRequest.update({
    where: {
      id: requestId
    },
    data: {
      status: "CANCELLED"
    }
  });
}

static async getRouteRequests(
  routeId: string,
  driverId: string
) {
  const route = await prisma.route.findUnique({
    where: {
      id: routeId
    }
  });

  if (!route)
    throw new Error("Route not found");

  if (route.driverId !== driverId)
    throw new Error("Forbidden");

  return prisma.tripRequest.findMany({
    where: {
      routeId
    },
    include: {
      passenger: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

}

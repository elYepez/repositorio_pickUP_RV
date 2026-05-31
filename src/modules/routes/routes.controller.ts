import { Request, Response } from "express";

import { RoutesService } from "./routes.service";

export class RoutesController {
  static async create(
    req: Request,
    res: Response
  ) {
    try {
      const route =
        await RoutesService.createRoute({
          driverId: req.user!.userId,

          origin: req.body.origin,

          destination:
            req.body.destination,

          departureTime:
            req.body.departureTime,

          availableSeats:
            req.body.availableSeats,

          price: req.body.price,
        });

      res.status(201).json(route);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async getById(
  req: Request,
  res: Response
) {
  try {
    const route =
      await RoutesService.getRouteById(
        req.params.id
      );

    res.json(route);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
}

static async myRoutes(
  req: Request,
  res: Response
) {
  try {
    const routes =
      await RoutesService.getMyRoutes(
        req.user!.userId
      );

    res.json(routes);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
}

static async cancel(
  req: Request,
  res: Response
) {
  try {
    const route =
      await RoutesService.cancelRoute(
        req.params.id,
        req.user!.userId
      );

    res.json(route);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
}

static async complete(
  req: Request,
  res: Response
) {
  try {
    const route =
      await RoutesService.completeRoute(
        req.params.id,
        req.user!.userId
      );

    res.json(route);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
}

  

  static async getAll(
    req: Request,
    res: Response
  ) {
    try {
      const routes =
        await RoutesService.getRoutes();

      res.json(routes);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  
}
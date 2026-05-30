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
import { Request, Response } from "express";

import { TripRequestsService } from "./tripRequests.service";

export class TripRequestsController {
  static async create(
    req: Request,
    res: Response
  ) {
    try {
      const request =
        await TripRequestsService.createRequest(
          req.user!.userId,
          req.body.routeId
        );

      res.status(201).json(request);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async accept(
    req: Request,
    res: Response
  ) {
    try {
      const request =
        await TripRequestsService.acceptRequest(
          req.params.id!,
          req.user!.userId
        );

      res.json(request);
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
    const requests =
      await TripRequestsService.getAllRequests();

    res.json(requests);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}
static async myRequests(
  req: Request,
  res: Response
) {
  const requests =
    await TripRequestsService.getMyRequests(
      req.user!.userId
    );

  res.json(requests);
}
static async routeRequests(
  req: Request,
  res: Response
) {
  try {
    const requests =
      await TripRequestsService.getRouteRequests(
        req.params.routeId,
        req.user!.userId
      );

    res.json(requests);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

}
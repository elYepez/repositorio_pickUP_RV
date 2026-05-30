import { Request, Response } from "express";
import { DriverService } from "./driver.service";

export class DriverController {
  static async createProfile(
    req: Request,
    res: Response
  ) {
    try {
      const profile =
        await DriverService.createProfile({
          userId: req.user!.userId,

          licenseNumber:
            req.body.licenseNumber,

          plateNumber:
            req.body.plateNumber,

          vehicleModel:
            req.body.vehicleModel,

          vehicleColor:
            req.body.vehicleColor,
        });

      res.status(201).json(profile);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
import { Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {
  static async me(req: Request, res: Response) {
    try {
      const user = await UsersService.getProfile(
        req.user!.userId
      );

      res.json(user);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
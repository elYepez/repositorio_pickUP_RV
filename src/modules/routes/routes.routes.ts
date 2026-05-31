import { Router } from "express";

import { RoutesController } from "./routes.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",

  authMiddleware,

  requireRole("DRIVER"),

  RoutesController.create
);

router.get(
  "/",
  authMiddleware,
  RoutesController.getAll
);

router.get(
  "/my-routes",
  authMiddleware,
  RoutesController.myRoutes
);

router.get(
  "/:id",
  authMiddleware,
  RoutesController.getById
);



router.patch(
  "/:id/cancel",
  authMiddleware,
  RoutesController.cancel
);

router.patch(
  "/:id/complete",
  authMiddleware,
  RoutesController.complete
);


export default router;
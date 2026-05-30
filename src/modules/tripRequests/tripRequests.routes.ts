import { Router } from "express";

import { TripRequestsController } from "./tripRequests.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  TripRequestsController.create
);

router.patch(
  "/:id/accept",
  authMiddleware,
  TripRequestsController.accept
);

router.get(
  "/",
  authMiddleware,
  TripRequestsController.getAll
);
router.get(
  "/my-requests",
  authMiddleware,
  TripRequestsController.myRequests
);
router.get(
  "/route/:routeId",
  authMiddleware,
  TripRequestsController.routeRequests
);
router.patch(
  "/:id/accept",
  authMiddleware,
  TripRequestsController.accept
);
router.patch(
  "/:id/reject",
  authMiddleware,
  TripRequestsController.reject
);
router.patch(
  "/:id/cancel",
  authMiddleware,
  TripRequestsController.cancel
);

export default router;
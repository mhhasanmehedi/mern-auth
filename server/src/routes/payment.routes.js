import express from "express";
import {
  paymentCancel,
  paymentFail,
  paymentIpn,
  paymentSSLCommerz,
  paymentSuccess,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", paymentSSLCommerz);
router.post("/ipn", paymentIpn);
router.post("/success/:tranId", paymentSuccess);
router.post("/fail/:tranId", paymentFail);
router.post("/cancel/:tranId", paymentCancel);

export default router;

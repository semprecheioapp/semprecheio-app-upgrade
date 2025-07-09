
import rateLimit from "express-rate-limit";
import { getStorage } from "../storage/memory-storage";

export const createRateLimit = (windowMs: number, max: number) => {
  return rateLimit({
    windowMs,
    max,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export const generalLimiter = createRateLimit(15 * 60 * 1000, 100); // 100 requests per 15 minutes
export const authLimiter = createRateLimit(15 * 60 * 1000, 5); // 5 auth attempts per 15 minutes

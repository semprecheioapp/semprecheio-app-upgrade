
import { Request, Response, NextFunction } from "express";
import { getStorage } from "../storage/memory-storage";

export const auditMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const storage = getStorage();
  const timestamp = new Date().toISOString();
  const userId = (req as any).userId || 'anonymous';
  
  console.log(`[AUDIT ${timestamp}] User: ${userId}, Method: ${req.method}, Path: ${req.path}`);
  
  next();
};

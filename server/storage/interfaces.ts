
import { StorageUser, InsertStorageUser, StorageSession, StorageClient, InsertStorageClient } from "../types/storage-types";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<StorageUser | undefined>;
  getUserByEmail(email: string): Promise<StorageUser | undefined>;
  createUser(user: InsertStorageUser): Promise<StorageUser>;
  validateUser(email: string, password: string): Promise<StorageUser | null>;
  createSession(userId: number, expiresAt: Date): Promise<StorageSession>;
  getSession(sessionId: string): Promise<StorageSession | undefined>;
  deleteSession(sessionId: string): Promise<void>;
  getUserBySessionId(sessionId: string): Promise<StorageUser | undefined>;
  
  // Client operations
  getClient(id: string): Promise<StorageClient | undefined>;
  getClientByEmail(email: string): Promise<StorageClient | undefined>;
  createClient(client: InsertStorageClient): Promise<StorageClient>;
  validateClient(email: string, password: string): Promise<StorageClient | null>;
  updateClient(id: string, updates: Partial<InsertStorageClient>): Promise<StorageClient | undefined>;
  deleteClient(id: string): Promise<void>;
  listClients(): Promise<StorageClient[]>;
}

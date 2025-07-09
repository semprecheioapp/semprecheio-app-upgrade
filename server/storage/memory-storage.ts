
import { IStorage } from "./interfaces";
import { UserOperations } from "./user-operations";
import { ClientOperations } from "./client-operations";
import { StorageUser, InsertStorageUser, StorageSession, StorageClient, InsertStorageClient } from "../types/storage-types";

export class MemStorage implements IStorage {
  private userOps: UserOperations;
  private clientOps: ClientOperations;

  constructor() {
    this.userOps = new UserOperations();
    this.clientOps = new ClientOperations();
  }

  // User operations
  async getUser(id: number): Promise<StorageUser | undefined> {
    return this.userOps.getUser(id);
  }

  async getUserByEmail(email: string): Promise<StorageUser | undefined> {
    return this.userOps.getUserByEmail(email);
  }

  async createUser(user: InsertStorageUser): Promise<StorageUser> {
    return this.userOps.createUser(user);
  }

  async validateUser(email: string, password: string): Promise<StorageUser | null> {
    return this.userOps.validateUser(email, password);
  }

  async createSession(userId: number, expiresAt: Date): Promise<StorageSession> {
    return this.userOps.createSession(userId, expiresAt);
  }

  async getSession(sessionId: string): Promise<StorageSession | undefined> {
    return this.userOps.getSession(sessionId);
  }

  async deleteSession(sessionId: string): Promise<void> {
    return this.userOps.deleteSession(sessionId);
  }

  async getUserBySessionId(sessionId: string): Promise<StorageUser | undefined> {
    return this.userOps.getUserBySessionId(sessionId);
  }

  // Client operations
  async getClient(id: string): Promise<StorageClient | undefined> {
    return this.clientOps.getClient(id);
  }

  async getClientByEmail(email: string): Promise<StorageClient | undefined> {
    return this.clientOps.getClientByEmail(email);
  }

  async createClient(client: InsertStorageClient): Promise<StorageClient> {
    return this.clientOps.createClient(client);
  }

  async validateClient(email: string, password: string): Promise<StorageClient | null> {
    return this.clientOps.validateClient(email, password);
  }

  async updateClient(id: string, updates: Partial<InsertStorageClient>): Promise<StorageClient | undefined> {
    return this.clientOps.updateClient(id, updates);
  }

  async deleteClient(id: string): Promise<void> {
    return this.clientOps.deleteClient(id);
  }

  async listClients(): Promise<StorageClient[]> {
    return this.clientOps.listClients();
  }
}

export const storage = new MemStorage();

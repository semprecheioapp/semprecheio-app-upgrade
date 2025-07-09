
import bcrypt from "bcryptjs";
import { StorageUser, InsertStorageUser, StorageSession } from "../types/storage-types";

export class UserOperations {
  private users: Map<number, StorageUser>;
  private sessions: Map<string, StorageSession>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    this.currentId = 1;
    this.initializeTestUsers();
  }

  private async initializeTestUsers() {
    const hashedPassword = await bcrypt.hash("123456", 10);
    
    const superAdmin: StorageUser = {
      id: this.currentId++,
      name: "Super Administrador",
      email: "super@admin.com",
      password: hashedPassword,
      role: "super_admin",
      createdAt: new Date(),
    };

    const admin: StorageUser = {
      id: this.currentId++,
      name: "Administrador",
      email: "admin@salon.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    };
    
    this.users.set(superAdmin.id, superAdmin);
    this.users.set(admin.id, admin);
  }

  async getUser(id: number): Promise<StorageUser | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<StorageUser | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertStorageUser): Promise<StorageUser> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const id = this.currentId++;
    const user: StorageUser = { 
      id, 
      name: insertUser.name,
      email: insertUser.email,
      password: hashedPassword,
      role: insertUser.role || "user",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<StorageUser | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async createSession(userId: number, expiresAt: Date): Promise<StorageSession> {
    const sessionId = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
    
    const session: StorageSession = {
      id: sessionId,
      userId,
      expiresAt,
      createdAt: new Date(),
    };
    
    this.sessions.set(sessionId, session);
    return session;
  }

  async getSession(sessionId: string): Promise<StorageSession | undefined> {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;
    
    // Check if session is expired
    if (session.expiresAt < new Date()) {
      this.sessions.delete(sessionId);
      return undefined;
    }
    
    return session;
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }

  async getUserBySessionId(sessionId: string): Promise<StorageUser | undefined> {
    const session = await this.getSession(sessionId);
    if (!session) return undefined;
    
    return this.getUser(session.userId);
  }
}

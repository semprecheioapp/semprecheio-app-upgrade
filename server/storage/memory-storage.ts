
import { StorageUser, StorageClient, InsertStorageUser, InsertStorageClient } from '../types/storage-types';
import { UserOperations } from './user-operations';
import { ClientOperations } from './client-operations';
import { ProfessionalOperations } from './professional-operations';
import { ExtendedOperations } from './extended-operations';
import { StorageInterface } from './interfaces';

export class MemoryStorage implements StorageInterface {
  private userOps: UserOperations;
  private clientOps: ClientOperations;
  private professionalOps: ProfessionalOperations;
  private extendedOps: ExtendedOperations;

  constructor() {
    this.userOps = new UserOperations();
    this.clientOps = new ClientOperations();
    this.professionalOps = new ProfessionalOperations();
    this.extendedOps = new ExtendedOperations();
  }

  // User operations
  async createUser(userData: InsertStorageUser): Promise<StorageUser> {
    return this.userOps.createUser(userData);
  }

  async getUserById(id: number): Promise<StorageUser | null> {
    return this.userOps.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<StorageUser | null> {
    return this.userOps.getUserByEmail(email);
  }

  async validateUserCredentials(email: string, password: string): Promise<StorageUser | null> {
    return this.userOps.validateUserCredentials(email, password);
  }

  async updateUser(id: number, updates: Partial<StorageUser>): Promise<StorageUser | null> {
    return this.userOps.updateUser(id, updates);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userOps.deleteUser(id);
  }

  async getUsers(): Promise<StorageUser[]> {
    return this.userOps.getUsers();
  }

  // Client operations
  async createClient(clientData: InsertStorageClient): Promise<StorageClient> {
    return this.clientOps.createClient(clientData);
  }

  async getClientById(id: string): Promise<StorageClient | null> {
    return this.clientOps.getClientById(id);
  }

  async getClientByEmail(email: string): Promise<StorageClient | null> {
    return this.clientOps.getClientByEmail(email);
  }

  async updateClient(id: string, updates: Partial<StorageClient>): Promise<StorageClient | null> {
    return this.clientOps.updateClient(id, updates);
  }

  async deleteClient(id: string): Promise<boolean> {
    return this.clientOps.deleteClient(id);
  }

  async getClients(): Promise<StorageClient[]> {
    return this.clientOps.getClients();
  }

  // Session operations
  async createUserSession(userId: number): Promise<{ id: string; userId: number; expiresAt: Date }> {
    return this.userOps.createUserSession(userId);
  }

  async getSession(sessionId: string): Promise<{ id: string; userId: number; expiresAt: Date } | null> {
    return this.userOps.getSession(sessionId);
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    return this.userOps.deleteSession(sessionId);
  }

  // Extended operations - delegate to appropriate operations class
  async createProfessional(data: any): Promise<any> {
    return this.professionalOps.createProfessional(data);
  }

  async getProfessionalById(id: string): Promise<any> {
    return this.professionalOps.getProfessionalById(id);
  }

  async updateProfessional(id: string, updates: any): Promise<any> {
    return this.professionalOps.updateProfessional(id, updates);
  }

  async deleteProfessional(id: string): Promise<boolean> {
    return this.professionalOps.deleteProfessional(id);
  }

  async getProfessionals(): Promise<any[]> {
    return this.professionalOps.getProfessionals();
  }

  async createSpecialty(data: any): Promise<any> {
    return this.professionalOps.createSpecialty(data);
  }

  async getSpecialtyById(id: string): Promise<any> {
    return this.professionalOps.getSpecialtyById(id);
  }

  async updateSpecialty(id: string, updates: any): Promise<any> {
    return this.professionalOps.updateSpecialty(id, updates);
  }

  async deleteSpecialty(id: string): Promise<boolean> {
    return this.professionalOps.deleteSpecialty(id);
  }

  async getSpecialties(): Promise<any[]> {
    return this.professionalOps.getSpecialties();
  }

  async createService(data: any): Promise<any> {
    return this.professionalOps.createService(data);
  }

  async getServiceById(id: string): Promise<any> {
    return this.professionalOps.getServiceById(id);
  }

  async updateService(id: string, updates: any): Promise<any> {
    return this.professionalOps.updateService(id, updates);
  }

  async deleteService(id: string): Promise<boolean> {
    return this.professionalOps.deleteService(id);
  }

  async getServices(): Promise<any[]> {
    return this.professionalOps.getServices();
  }

  // Extended operations delegation
  async createAppointment(data: any): Promise<any> {
    return this.extendedOps.createAppointment(data);
  }

  async getAppointmentById(id: string): Promise<any> {
    return this.extendedOps.getAppointmentById(id);
  }

  async updateAppointment(id: string, updates: any): Promise<any> {
    return this.extendedOps.updateAppointment(id, updates);
  }

  async deleteAppointment(id: string): Promise<boolean> {
    return this.extendedOps.deleteAppointment(id);
  }

  async getAppointments(): Promise<any[]> {
    return this.extendedOps.getAppointments();
  }

  async createCustomer(data: any): Promise<any> {
    return this.extendedOps.createCustomer(data);
  }

  async getCustomerById(id: string): Promise<any> {
    return this.extendedOps.getCustomerById(id);
  }

  async updateCustomer(id: string, updates: any): Promise<any> {
    return this.extendedOps.updateCustomer(id, updates);
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return this.extendedOps.deleteCustomer(id);
  }

  async getCustomers(): Promise<any[]> {
    return this.extendedOps.getCustomers();
  }

  async createConnection(data: any): Promise<any> {
    return this.extendedOps.createConnection(data);
  }

  async getConnectionById(id: string): Promise<any> {
    return this.extendedOps.getConnectionById(id);
  }

  async updateConnection(id: string, updates: any): Promise<any> {
    return this.extendedOps.updateConnection(id, updates);
  }

  async deleteConnection(id: string): Promise<boolean> {
    return this.extendedOps.deleteConnection(id);
  }

  async getConnections(): Promise<any[]> {
    return this.extendedOps.getConnections();
  }

  async createAvailability(data: any): Promise<any> {
    return this.extendedOps.createAvailability(data);
  }

  async getAvailabilityById(id: string): Promise<any> {
    return this.extendedOps.getAvailabilityById(id);
  }

  async updateAvailability(id: string, updates: any): Promise<any> {
    return this.extendedOps.updateAvailability(id, updates);
  }

  async deleteAvailability(id: string): Promise<boolean> {
    return this.extendedOps.deleteAvailability(id);
  }

  async getAvailabilities(): Promise<any[]> {
    return this.extendedOps.getAvailabilities();
  }

  async createBackup(data: any): Promise<any> {
    return this.extendedOps.createBackup(data);
  }

  async getBackupById(id: string): Promise<any> {
    return this.extendedOps.getBackupById(id);
  }

  async updateBackup(id: string, updates: any): Promise<any> {
    return this.extendedOps.updateBackup(id, updates);
  }

  async deleteBackup(id: string): Promise<boolean> {
    return this.extendedOps.deleteBackup(id);
  }

  async getBackups(): Promise<any[]> {
    return this.extendedOps.getBackups();
  }

  async createSubscription(data: any): Promise<any> {
    return this.extendedOps.createSubscription(data);
  }

  async getSubscriptionById(id: string): Promise<any> {
    return this.extendedOps.getSubscriptionById(id);
  }

  async updateSubscription(id: string, updates: any): Promise<any> {
    return this.extendedOps.updateSubscription(id, updates);
  }

  async deleteSubscription(id: string): Promise<boolean> {
    return this.extendedOps.deleteSubscription(id);
  }

  async getSubscriptions(): Promise<any[]> {
    return this.extendedOps.getSubscriptions();
  }
}

// Create and export singleton instance
const storage = new MemoryStorage();

export function getStorage(): MemoryStorage {
  return storage;
}

export { storage };

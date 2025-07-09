
import { IStorage } from "./interfaces";
import { UserOperations } from "./user-operations";
import { ClientOperations } from "./client-operations";
import { ProfessionalOperations } from "./professional-operations";
import { ExtendedOperations } from "./extended-operations";
import { StorageUser, InsertStorageUser, StorageSession, StorageClient, InsertStorageClient } from "../types/storage-types";

export class MemStorage implements IStorage {
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

  // Professional operations
  async getProfessional(id: string): Promise<any | undefined> {
    return this.professionalOps.getProfessional(id);
  }

  async getProfessionalByEmail(email: string): Promise<any | undefined> {
    return this.professionalOps.getProfessionalByEmail(email);
  }

  async createProfessional(professional: any): Promise<any> {
    return this.professionalOps.createProfessional(professional);
  }

  async updateProfessional(id: string, updates: any): Promise<any | undefined> {
    return this.professionalOps.updateProfessional(id, updates);
  }

  async deleteProfessional(id: string): Promise<void> {
    return this.professionalOps.deleteProfessional(id);
  }

  async listProfessionals(clientId: string): Promise<any[]> {
    return this.professionalOps.listProfessionals(clientId);
  }

  async listProfessionalsByClient(clientId: string): Promise<any[]> {
    return this.professionalOps.listProfessionalsByClient(clientId);
  }

  // Extended operations (delegated to ExtendedOperations)
  async getSpecialty(id: string): Promise<any | undefined> {
    return this.extendedOps.getSpecialty(id);
  }

  async createSpecialty(specialty: any): Promise<any> {
    return this.extendedOps.createSpecialty(specialty);
  }

  async updateSpecialty(id: string, updates: any): Promise<any | undefined> {
    return this.extendedOps.updateSpecialty(id, updates);
  }

  async deleteSpecialty(id: string): Promise<void> {
    return this.extendedOps.deleteSpecialty(id);
  }

  async listSpecialties(clientId: string): Promise<any[]> {
    return this.extendedOps.listSpecialties(clientId);
  }

  async listSpecialtiesByClient(clientId: string): Promise<any[]> {
    return this.extendedOps.listSpecialtiesByClient(clientId);
  }

  async getService(id: string): Promise<any | undefined> {
    return this.extendedOps.getService(id);
  }

  async createService(service: any): Promise<any> {
    return this.extendedOps.createService(service);
  }

  async updateService(id: string, updates: any): Promise<any | undefined> {
    return this.extendedOps.updateService(id, updates);
  }

  async deleteService(id: string): Promise<void> {
    return this.extendedOps.deleteService(id);
  }

  async listServices(clientId: string): Promise<any[]> {
    return this.extendedOps.listServices(clientId);
  }

  async listServicesByClient(clientId: string): Promise<any[]> {
    return this.extendedOps.listServicesByClient(clientId);
  }

  async getAppointment(id: string): Promise<any | undefined> {
    return this.extendedOps.getAppointment(id);
  }

  async createAppointment(appointment: any): Promise<any> {
    return this.extendedOps.createAppointment(appointment);
  }

  async updateAppointment(id: string, updates: any): Promise<any | undefined> {
    return this.extendedOps.updateAppointment(id, updates);
  }

  async deleteAppointment(id: string): Promise<void> {
    return this.extendedOps.deleteAppointment(id);
  }

  async cancelAppointment(id: string): Promise<void> {
    return this.extendedOps.cancelAppointment(id);
  }

  async listAppointments(clientId: string): Promise<any[]> {
    return this.extendedOps.listAppointments(clientId);
  }

  async getCustomer(id: string): Promise<any | undefined> {
    return this.extendedOps.getCustomer(id);
  }

  async createCustomer(customer: any): Promise<any> {
    return this.extendedOps.createCustomer(customer);
  }

  async updateCustomer(id: string, updates: any): Promise<any | undefined> {
    return this.extendedOps.updateCustomer(id, updates);
  }

  async deleteCustomer(id: string): Promise<void> {
    return this.extendedOps.deleteCustomer(id);
  }

  async listCustomers(clientId: string): Promise<any[]> {
    return this.extendedOps.listCustomers(clientId);
  }

  async getConnection(id: number): Promise<any | undefined> {
    return this.extendedOps.getConnection(id);
  }

  async createConnection(connection: any): Promise<any> {
    return this.extendedOps.createConnection(connection);
  }

  async updateConnection(id: number, updates: any): Promise<any | undefined> {
    return this.extendedOps.updateConnection(id, updates);
  }

  async deleteConnection(id: number): Promise<void> {
    return this.extendedOps.deleteConnection(id);
  }

  async listConnections(clientId: string): Promise<any[]> {
    return this.extendedOps.listConnections(clientId);
  }

  async validateConnection(connectionId: number): Promise<boolean> {
    return this.extendedOps.validateConnection(connectionId);
  }

  async getClientByWhatsappInstance(instanceUrl: string): Promise<StorageClient | undefined> {
    return this.extendedOps.getClientByWhatsappInstance(instanceUrl);
  }

  async getProfessionalAvailability(id: string): Promise<any | undefined> {
    return this.extendedOps.getProfessionalAvailability(id);
  }

  async createProfessionalAvailability(availability: any): Promise<any> {
    return this.extendedOps.createProfessionalAvailability(availability);
  }

  async updateProfessionalAvailability(id: string, updates: any): Promise<any | undefined> {
    return this.extendedOps.updateProfessionalAvailability(id, updates);
  }

  async deleteProfessionalAvailability(id: string): Promise<void> {
    return this.extendedOps.deleteProfessionalAvailability(id);
  }

  async listProfessionalAvailability(professionalId: string): Promise<any[]> {
    return this.extendedOps.listProfessionalAvailability(professionalId);
  }

  async listProfessionalAvailabilityByClient(clientId: string): Promise<any[]> {
    return this.extendedOps.listProfessionalAvailabilityByClient(clientId);
  }

  async updateMonthlyAvailability(data: any): Promise<void> {
    return this.extendedOps.updateMonthlyAvailability(data);
  }

  async generateNextMonthAvailability(data: any): Promise<void> {
    return this.extendedOps.generateNextMonthAvailability(data);
  }

  async createBackup(clientId: string): Promise<any> {
    return this.extendedOps.createBackup(clientId);
  }

  async generateSQLExport(clientId: string): Promise<string> {
    return this.extendedOps.generateSQLExport(clientId);
  }

  async listSubscriptionPlans(): Promise<any[]> {
    return this.extendedOps.listSubscriptionPlans();
  }

  async getSubscriptionPlan(id: string): Promise<any | undefined> {
    return this.extendedOps.getSubscriptionPlan(id);
  }

  async createSubscriptionPlan(plan: any): Promise<any> {
    return this.extendedOps.createSubscriptionPlan(plan);
  }

  async listSubscriptions(clientId: string): Promise<any[]> {
    return this.extendedOps.listSubscriptions(clientId);
  }

  async getSubscription(id: string): Promise<any | undefined> {
    return this.extendedOps.getSubscription(id);
  }

  async createSubscription(subscription: any): Promise<any> {
    return this.extendedOps.createSubscription(subscription);
  }

  async listInvoices(clientId: string): Promise<any[]> {
    return this.extendedOps.listInvoices(clientId);
  }

  async listPayments(clientId: string): Promise<any[]> {
    return this.extendedOps.listPayments(clientId);
  }
}

export const storage = new MemStorage();

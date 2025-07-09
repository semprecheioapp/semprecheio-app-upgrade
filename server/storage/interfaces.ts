
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

  // Professional operations
  getProfessional(id: string): Promise<any | undefined>;
  getProfessionalByEmail(email: string): Promise<any | undefined>;
  createProfessional(professional: any): Promise<any>;
  updateProfessional(id: string, updates: any): Promise<any | undefined>;
  deleteProfessional(id: string): Promise<void>;
  listProfessionals(clientId: string): Promise<any[]>;
  listProfessionalsByClient(clientId: string): Promise<any[]>;

  // Specialty operations
  getSpecialty(id: string): Promise<any | undefined>;
  createSpecialty(specialty: any): Promise<any>;
  updateSpecialty(id: string, updates: any): Promise<any | undefined>;
  deleteSpecialty(id: string): Promise<void>;
  listSpecialties(clientId: string): Promise<any[]>;
  listSpecialtiesByClient(clientId: string): Promise<any[]>;

  // Service operations
  getService(id: string): Promise<any | undefined>;
  createService(service: any): Promise<any>;
  updateService(id: string, updates: any): Promise<any | undefined>;
  deleteService(id: string): Promise<void>;
  listServices(clientId: string): Promise<any[]>;
  listServicesByClient(clientId: string): Promise<any[]>;

  // Appointment operations
  getAppointment(id: string): Promise<any | undefined>;
  createAppointment(appointment: any): Promise<any>;
  updateAppointment(id: string, updates: any): Promise<any | undefined>;
  deleteAppointment(id: string): Promise<void>;
  cancelAppointment(id: string): Promise<void>;
  listAppointments(clientId: string): Promise<any[]>;

  // Customer operations
  getCustomer(id: string): Promise<any | undefined>;
  createCustomer(customer: any): Promise<any>;
  updateCustomer(id: string, updates: any): Promise<any | undefined>;
  deleteCustomer(id: string): Promise<void>;
  listCustomers(clientId: string): Promise<any[]>;

  // Connection operations
  getConnection(id: number): Promise<any | undefined>;
  createConnection(connection: any): Promise<any>;
  updateConnection(id: number, updates: any): Promise<any | undefined>;
  deleteConnection(id: number): Promise<void>;
  listConnections(clientId: string): Promise<any[]>;
  validateConnection(connectionId: number): Promise<boolean>;
  getClientByWhatsappInstance(instanceUrl: string): Promise<StorageClient | undefined>;

  // Professional Availability operations
  getProfessionalAvailability(id: string): Promise<any | undefined>;
  createProfessionalAvailability(availability: any): Promise<any>;
  updateProfessionalAvailability(id: string, updates: any): Promise<any | undefined>;
  deleteProfessionalAvailability(id: string): Promise<void>;
  listProfessionalAvailability(professionalId: string): Promise<any[]>;
  listProfessionalAvailabilityByClient(clientId: string): Promise<any[]>;
  updateMonthlyAvailability(data: any): Promise<void>;
  generateNextMonthAvailability(data: any): Promise<void>;

  // Backup operations
  createBackup(clientId: string): Promise<any>;
  generateSQLExport(clientId: string): Promise<string>;

  // Subscription operations
  listSubscriptionPlans(): Promise<any[]>;
  getSubscriptionPlan(id: string): Promise<any | undefined>;
  createSubscriptionPlan(plan: any): Promise<any>;
  listSubscriptions(clientId: string): Promise<any[]>;
  getSubscription(id: string): Promise<any | undefined>;
  createSubscription(subscription: any): Promise<any>;
  listInvoices(clientId: string): Promise<any[]>;
  listPayments(clientId: string): Promise<any[]>;
}

import { users, sessions, clients, professionals, specialties, services, appointments, customers, connections, type User, type InsertUser, type Session, type Client, type InsertClient, type Professional, type InsertProfessional, type Specialty, type InsertSpecialty, type Service, type InsertService, type Appointment, type InsertAppointment, type Customer, type InsertCustomer, type Connection, type InsertConnection } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser(email: string, password: string): Promise<User | null>;
  createSession(userId: number, expiresAt: Date): Promise<Session>;
  getSession(sessionId: string): Promise<Session | undefined>;
  deleteSession(sessionId: string): Promise<void>;
  getUserBySessionId(sessionId: string): Promise<User | undefined>;
  
  // Client operations
  getClient(id: string): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  validateClient(email: string, password: string): Promise<Client | null>;
  updateClient(id: string, updates: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<void>;
  listClients(): Promise<Client[]>;

  // Professional operations
  getProfessional(id: string): Promise<Professional | undefined>;
  getProfessionalByEmail(email: string): Promise<Professional | undefined>;
  createProfessional(professional: InsertProfessional): Promise<Professional>;
  updateProfessional(id: string, updates: Partial<InsertProfessional>): Promise<Professional | undefined>;
  deleteProfessional(id: string): Promise<void>;
  listProfessionals(clientId: string): Promise<Professional[]>;

  // Specialty operations
  getSpecialty(id: string): Promise<Specialty | undefined>;
  createSpecialty(specialty: InsertSpecialty): Promise<Specialty>;
  updateSpecialty(id: string, updates: Partial<InsertSpecialty>): Promise<Specialty | undefined>;
  deleteSpecialty(id: string): Promise<void>;
  listSpecialties(clientId: string): Promise<Specialty[]>;

  // Service operations
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, updates: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<void>;
  listServices(clientId: string): Promise<Service[]>;

  // Appointment operations
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, updates: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<void>;
  listAppointments(clientId: string): Promise<Appointment[]>;

  // Customer operations
  getCustomer(id: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: string, updates: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: string): Promise<void>;
  listCustomers(clientId: string): Promise<Customer[]>;

  // Connection operations
  getConnection(id: number): Promise<Connection | undefined>;
  createConnection(connection: InsertConnection): Promise<Connection>;
  updateConnection(id: number, updates: Partial<InsertConnection>): Promise<Connection | undefined>;
  deleteConnection(id: number): Promise<void>;
  listConnections(clientId: string): Promise<Connection[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private sessions: Map<string, Session>;
  private clients: Map<string, Client>;
  private professionals: Map<string, Professional>;
  private specialties: Map<string, Specialty>;
  private services: Map<string, Service>;
  private appointments: Map<string, Appointment>;
  private customers: Map<string, Customer>;
  private connections: Map<number, Connection>;
  private currentId: number;
  private currentConnectionId: number;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    this.clients = new Map();
    this.professionals = new Map();
    this.specialties = new Map();
    this.services = new Map();
    this.appointments = new Map();
    this.customers = new Map();
    this.connections = new Map();
    this.currentId = 1;
    this.currentConnectionId = 1;
    
    // Initialize test data
    this.initializeTestUsers();
    this.initializeTestClients();
    this.initializeTestData();
  }

  private async initializeTestUsers() {
    const hashedPassword = await bcrypt.hash("123456", 10);
    
    const superAdmin: User = {
      id: this.currentId++,
      name: "Super Administrador",
      email: "super@admin.com",
      password: hashedPassword,
      role: "super_admin",
      createdAt: new Date(),
    };

    const admin: User = {
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

  private initializeTestClients() {
    // Real client data provided by user
    const clinicaMBK: Client = {
      id: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
      name: 'Clínica MBK',
      email: 'agenciambkautomac@gmail.com',
      phone: '556699618890',
      createdAt: new Date('2025-05-15 08:39:57.684331'),
      isActive: true,
      serviceType: 'clinica',
      whatsappInstanceUrl: 'megacode-MTflBsUXacp',
      settings: null,
      assistantId: 'asst_z5VR0QuThXhA9YR9W1RoqL7q',
      password: 'senha123',
      promptIa: null,
      agentName: null,
      plan: 'basic',
      maxUsers: 5,
      maxAppointments: 100,
      maxStorage: 1,
      customDomain: null,
      brandingSettings: null,
      businessHours: null,
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      currency: 'BRL',
      twoFactorEnabled: false,
      sessionTimeout: 24,
      emailNotifications: true,
      smsNotifications: false,
      whatsappNotifications: true,
      autoBackup: true,
      backupFrequency: 'daily',
      integrations: null,
      gdprCompliant: true,
      dataRetentionDays: 365
    };

    this.clients.set(clinicaMBK.id, clinicaMBK);
  }

  private initializeTestData() {
    // Test professionals
    const professional1: Professional = {
      id: crypto.randomUUID(),
      name: "Dr. João",
      email: "joao@clinica.com",
      phone: "1199999999",
      specialtyId: null,
      clientId: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
      isActive: true,
      createdAt: new Date(),
    };
    this.professionals.set(professional1.id, professional1);

    // Test specialties
    const specialty1: Specialty = {
      id: crypto.randomUUID(),
      name: "Cardiologia",
      description: "Especialista em coração",
      color: "#FF0000",
      serviceId: null,
      clientId: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
      isActive: true,
      createdAt: new Date(),
    };
    this.specialties.set(specialty1.id, specialty1);

    // Test services
    const service1: Service = {
      id: crypto.randomUUID(),
      name: "Consulta Cardiológica",
      category: "Consulta",
      description: "Consulta com cardiologista",
      duration: 60,
      price: 30000,
      specialtyId: specialty1.id,
      clientId: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
      isActive: true,
      createdAt: new Date(),
    };
    this.services.set(service1.id, service1);

    // Test appointments
    const appointment1: Appointment = {
      id: crypto.randomUUID(),
      clientId: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
      professionalId: professional1.id,
      serviceId: service1.id,
      scheduledAt: new Date(),
      startTime: "10:00",
      endTime: "11:00",
      duration: 60,
      status: "scheduled",
      notes: "Paciente com dor no peito",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.appointments.set(appointment1.id, appointment1);

    // Test customers
    const customer1: Customer = {
      id: crypto.randomUUID(),
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "1198888888",
      cpfCnpj: "12345678900",
      notes: "Paciente fiel",
      clientId: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
      createdAt: new Date(),
    };
    this.customers.set(customer1.id, customer1);

    const connection1: Connection = {
      id: this.currentConnectionId++,
      instance: "instance1",
      token: "token123",
      host: "https://host.com",
      clientId: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
      isActive: true,
      lastSync: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.connections.set(connection1.id, connection1);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const id = this.currentId++;
    const user: User = { 
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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async createSession(userId: number, expiresAt: Date): Promise<Session> {
    const sessionId = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
    
    const session: Session = {
      id: sessionId,
      userId,
      expiresAt,
      createdAt: new Date(),
    };
    
    this.sessions.set(sessionId, session);
    return session;
  }

  async getSession(sessionId: string): Promise<Session | undefined> {
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

  async getUserBySessionId(sessionId: string): Promise<User | undefined> {
    const session = await this.getSession(sessionId);
    if (!session) return undefined;
    
    return this.getUser(session.userId);
  }

  // Client operations
  async getClient(id: string): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    return Array.from(this.clients.values()).find(
      (client) => client.email === email,
    );
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const hashedPassword = insertClient.password 
      ? await bcrypt.hash(insertClient.password, 10) 
      : null;
    
    const id = crypto.randomUUID();
    const client: Client = {
      id,
      name: insertClient.name,
      email: insertClient.email,
      phone: insertClient.phone || null,
      createdAt: new Date(),
      isActive: insertClient.isActive ?? true,
      serviceType: insertClient.serviceType || null,
      whatsappInstanceUrl: insertClient.whatsappInstanceUrl || null,
      settings: insertClient.settings || null,
      assistantId: insertClient.assistantId || null,
      password: hashedPassword,
      promptIa: insertClient.promptIa || null,
      agentName: insertClient.agentName || null,
      plan: insertClient.plan || 'basic',
      maxUsers: insertClient.maxUsers || 5,
      maxAppointments: insertClient.maxAppointments || 100,
      maxStorage: insertClient.maxStorage || 1,
      customDomain: insertClient.customDomain || null,
      brandingSettings: insertClient.brandingSettings || null,
      businessHours: insertClient.businessHours || null,
      timezone: insertClient.timezone || 'America/Sao_Paulo',
      language: insertClient.language || 'pt-BR',
      currency: insertClient.currency || 'BRL',
      twoFactorEnabled: insertClient.twoFactorEnabled || false,
      sessionTimeout: insertClient.sessionTimeout || 24,
      emailNotifications: insertClient.emailNotifications ?? true,
      smsNotifications: insertClient.smsNotifications || false,
      whatsappNotifications: insertClient.whatsappNotifications ?? true,
      autoBackup: insertClient.autoBackup ?? true,
      backupFrequency: insertClient.backupFrequency || 'daily',
      integrations: insertClient.integrations || null,
      gdprCompliant: insertClient.gdprCompliant ?? true,
      dataRetentionDays: insertClient.dataRetentionDays || 365
    };
    
    this.clients.set(id, client);
    return client;
  }

  async validateClient(email: string, password: string): Promise<Client | null> {
    const client = await this.getClientByEmail(email);
    if (!client || !client.password) return null;
    
    const isValid = await bcrypt.compare(password, client.password);
    return isValid ? client : null;
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;

    const updatedClient: Client = {
      ...client,
      ...updates,
      id: client.id, // Keep original ID
      createdAt: client.createdAt, // Keep original creation date
    };

    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async deleteClient(id: string): Promise<void> {
    this.clients.delete(id);
  }

  async listClients(): Promise<Client[]> {
    return Array.from(this.clients.values())
      .filter(client => client.isActive)
      .sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate; // Most recent first
      });
  }

  // Professional operations
  async getProfessional(id: string): Promise<Professional | undefined> {
    return this.professionals.get(id);
  }

  async getProfessionalByEmail(email: string): Promise<Professional | undefined> {
    return Array.from(this.professionals.values()).find(
      (professional) => professional.email === email,
    );
  }

  async createProfessional(insertProfessional: InsertProfessional): Promise<Professional> {
    const id = crypto.randomUUID();
    const professional: Professional = {
      id,
      name: insertProfessional.name,
      email: insertProfessional.email,
      phone: insertProfessional.phone || null,
      specialtyId: insertProfessional.specialtyId || null,
      clientId: insertProfessional.clientId || null,
      isActive: insertProfessional.isActive ?? true,
      createdAt: new Date(),
    };
    
    this.professionals.set(id, professional);
    return professional;
  }

  async updateProfessional(id: string, updates: Partial<Professional>): Promise<Professional | undefined> {
    const professional = this.professionals.get(id);
    if (!professional) return undefined;

    const updatedProfessional: Professional = {
      ...professional,
      ...updates,
    };

    this.professionals.set(id, updatedProfessional);
    return updatedProfessional;
  }

  async deleteProfessional(id: string): Promise<void> {
    this.professionals.delete(id);
  }

  async listProfessionals(clientId: string): Promise<Professional[]> {
    return Array.from(this.professionals.values())
      .filter(professional => professional.clientId === clientId);
  }

  // Specialty operations
  async getSpecialty(id: string): Promise<Specialty | undefined> {
    return this.specialties.get(id);
  }

  async createSpecialty(insertSpecialty: InsertSpecialty): Promise<Specialty> {
    const id = crypto.randomUUID();
    const specialty: Specialty = {
      id,
      name: insertSpecialty.name,
      description: insertSpecialty.description || null,
      color: insertSpecialty.color || '#3B82F6',
      serviceId: insertSpecialty.serviceId || null,
      clientId: insertSpecialty.clientId || null,
      isActive: insertSpecialty.isActive ?? true,
      createdAt: new Date(),
    };
    
    this.specialties.set(id, specialty);
    return specialty;
  }

  async updateSpecialty(id: string, updates: Partial<Specialty>): Promise<Specialty | undefined> {
    const specialty = this.specialties.get(id);
    if (!specialty) return undefined;

    const updatedSpecialty: Specialty = {
      ...specialty,
      ...updates,
    };

    this.specialties.set(id, updatedSpecialty);
    return updatedSpecialty;
  }

  async deleteSpecialty(id: string): Promise<void> {
    this.specialties.delete(id);
  }

  async listSpecialties(clientId: string): Promise<Specialty[]> {
    return Array.from(this.specialties.values())
      .filter(specialty => specialty.clientId === clientId);
  }

  // Service operations
  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = crypto.randomUUID();
    const service: Service = {
      id,
      name: insertService.name,
      category: insertService.category || null,
      description: insertService.description || null,
      duration: insertService.duration,
      price: insertService.price || null,
      specialtyId: insertService.specialtyId || null,
      clientId: insertService.clientId || null,
      isActive: insertService.isActive ?? true,
      createdAt: new Date(),
    };
    
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updates: Partial<Service>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;

    const updatedService: Service = {
      ...service,
      ...updates,
    };

    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: string): Promise<void> {
    this.services.delete(id);
  }

  async listServices(clientId: string): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(service => service.clientId === clientId);
  }

  // Appointment operations
  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = crypto.randomUUID();
    const appointment: Appointment = {
      id,
      clientId: insertAppointment.clientId || null,
      professionalId: insertAppointment.professionalId || null,
      serviceId: insertAppointment.serviceId || null,
      scheduledAt: insertAppointment.scheduledAt,
      startTime: insertAppointment.startTime || null,
      endTime: insertAppointment.endTime || null,
      duration: insertAppointment.duration,
      status: insertAppointment.status || 'scheduled',
      notes: insertAppointment.notes || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;

    const updatedAppointment: Appointment = {
      ...appointment,
      ...updates,
    };

    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  async deleteAppointment(id: string): Promise<void> {
    this.appointments.delete(id);
  }

  async listAppointments(clientId: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values())
      .filter(appointment => appointment.clientId === clientId);
  }

  // Customer operations
  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = crypto.randomUUID();
    const customer: Customer = {
      id,
      name: insertCustomer.name,
      email: insertCustomer.email || null,
      phone: insertCustomer.phone || null,
      cpfCnpj: insertCustomer.cpfCnpj || null,
      notes: insertCustomer.notes || null,
      clientId: insertCustomer.clientId || null,
      createdAt: new Date(),
    };
    
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;

    const updatedCustomer: Customer = {
      ...customer,
      ...updates,
    };

    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  async deleteCustomer(id: string): Promise<void> {
    this.customers.delete(id);
  }

  async listCustomers(clientId: string): Promise<Customer[]> {
    return Array.from(this.customers.values())
      .filter(customer => customer.clientId === clientId);
  }

  // Connection operations
  async getConnection(id: number): Promise<Connection | undefined> {
    return this.connections.get(id);
  }

  async createConnection(insertConnection: InsertConnection): Promise<Connection> {
    const id = this.currentConnectionId++;
    const connection: Connection = {
      id,
      instance: insertConnection.instance,
      token: insertConnection.token,
      host: insertConnection.host,
      clientId: insertConnection.clientId || null,
      isActive: insertConnection.isActive ?? true,
      lastSync: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.connections.set(id, connection);
    return connection;
  }

  async updateConnection(id: number, updates: Partial<Connection>): Promise<Connection | undefined> {
    const connection = this.connections.get(id);
    if (!connection) return undefined;

    const updatedConnection: Connection = {
      ...connection,
      ...updates,
    };

    this.connections.set(id, updatedConnection);
    return updatedConnection;
  }

  async deleteConnection(id: number): Promise<void> {
    this.connections.delete(id);
  }

  async listConnections(clientId: string): Promise<Connection[]> {
    return Array.from(this.connections.values())
      .filter(connection => connection.clientId === clientId);
  }
}

export const storage = new MemStorage();


import bcrypt from "bcryptjs";
import { StorageClient, InsertStorageClient } from "../types/storage-types";

export class ClientOperations {
  private clients: Map<string, StorageClient>;

  constructor() {
    this.clients = new Map();
    this.initializeTestClients();
  }

  private initializeTestClients() {
    // Real client data provided by user
    const clinicaMBK: StorageClient = {
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

  async getClient(id: string): Promise<StorageClient | undefined> {
    return this.clients.get(id);
  }

  async getClientByEmail(email: string): Promise<StorageClient | undefined> {
    return Array.from(this.clients.values()).find(
      (client) => client.email === email,
    );
  }

  async createClient(insertClient: InsertStorageClient): Promise<StorageClient> {
    const hashedPassword = insertClient.password 
      ? await bcrypt.hash(insertClient.password, 10) 
      : null;
    
    const id = crypto.randomUUID();
    const client: StorageClient = {
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

  async validateClient(email: string, password: string): Promise<StorageClient | null> {
    const client = await this.getClientByEmail(email);
    if (!client || !client.password) return null;
    
    const isValid = await bcrypt.compare(password, client.password);
    return isValid ? client : null;
  }

  async updateClient(id: string, updates: Partial<StorageClient>): Promise<StorageClient | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;

    const updatedClient: StorageClient = {
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

  async listClients(): Promise<StorageClient[]> {
    return Array.from(this.clients.values())
      .filter(client => client.isActive)
      .sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate; // Most recent first
      });
  }
}


import { users, sessions, clients, type User, type InsertUser, type Session, type Client, type InsertClient } from "@shared/schema";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";
import type { StorageClient, InsertStorageClient, StorageUser, InsertStorageUser, StorageSession } from "./types/storage-types";

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

export class SupabaseStorage implements IStorage {
  constructor() {
    this.initializeTestData();
  }

  private async initializeTestData() {
    try {
      // Check if users table exists and has data
      const { data: existingUsers } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      
      if (!existingUsers || existingUsers.length === 0) {
        await this.seedInitialData();
      }
    } catch (error) {
      console.log("Database not ready yet, will seed later:", error);
    }
  }

  private async seedInitialData() {
    const hashedPassword = await bcrypt.hash("123456", 10);
    
    // Create super admin and admin users
    await supabase.from('users').insert([
      {
        id: 1,
        name: "Super Administrador",
        email: "superadmin@semprecheio.com",
        password: hashedPassword,
        role: "super_admin"
      },
      {
        id: 2,
        name: "Administrador",
        email: "admin@semprecheio.com", 
        password: hashedPassword,
        role: "admin"
      }
    ]);

    // Create the clinic client
    await supabase.from('clients').insert([
      {
        id: '165bc915-45bc-423e-ac8f-7a60a3bf9b05',
        name: 'Clínica MBK',
        email: 'agenciambkautomac@gmail.com',
        phone: '556699618890',
        password: hashedPassword,
        service_type: 'Estética e Beleza',
        whatsapp_instance_url: 'https://api.whatsapp.com/instance/mbk',
        settings: { 
          workingHours: { start: '08:00', end: '18:00' },
          services: ['Limpeza de Pele', 'Massagem', 'Tratamentos Faciais']
        },
        assistant_id: 'asst_mbk_clinic_001',
        is_active: true
      }
    ]);
  }

  async getUser(id: number): Promise<StorageUser | undefined> {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    return data ? this.mapUserFromSupabase(data) : undefined;
  }

  async getUserByEmail(email: string): Promise<StorageUser | undefined> {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    return data ? this.mapUserFromSupabase(data) : undefined;
  }

  async createUser(insertUser: InsertStorageUser): Promise<StorageUser> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        name: insertUser.name,
        email: insertUser.email,
        password: hashedPassword,
        role: insertUser.role || 'user'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return this.mapUserFromSupabase(data);
  }

  async validateUser(email: string, password: string): Promise<StorageUser | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async createSession(userId: number, expiresAt: Date): Promise<StorageSession> {
    const sessionId = crypto.randomUUID();
    
    const { data, error } = await supabase
      .from('sessions')
      .insert([{
        id: sessionId,
        user_id: userId,
        expires_at: expiresAt.toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return this.mapSessionFromSupabase(data);
  }

  async getSession(sessionId: string): Promise<StorageSession | undefined> {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    return data ? this.mapSessionFromSupabase(data) : undefined;
  }

  async deleteSession(sessionId: string): Promise<void> {
    await supabase
      .from('sessions')
      .delete()
      .eq('id', sessionId);
  }

  async getUserBySessionId(sessionId: string): Promise<StorageUser | undefined> {
    const { data } = await supabase
      .from('sessions')
      .select(`
        *,
        users (*)
      `)
      .eq('id', sessionId)
      .single();
    
    return data?.users ? this.mapUserFromSupabase(data.users) : undefined;
  }

  async getClient(id: string): Promise<StorageClient | undefined> {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();
    
    return data ? this.mapClientFromSupabase(data) : undefined;
  }

  async getClientByEmail(email: string): Promise<StorageClient | undefined> {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email)
      .single();
    
    return data ? this.mapClientFromSupabase(data) : undefined;
  }

  async createClient(insertClient: InsertStorageClient): Promise<StorageClient> {
    const clientId = crypto.randomUUID();
    const hashedPassword = insertClient.password ? await bcrypt.hash(insertClient.password, 10) : null;
    
    const { data, error } = await supabase
      .from('clients')
      .insert([{ 
        id: clientId,
        name: insertClient.name,
        email: insertClient.email,
        phone: insertClient.phone,
        password: hashedPassword,
        service_type: insertClient.serviceType,
        whatsapp_instance_url: insertClient.whatsappInstanceUrl,
        settings: insertClient.settings,
        assistant_id: insertClient.assistantId,
        prompt_ia: insertClient.promptIa,
        agent_name: insertClient.agentName,
        is_active: insertClient.isActive ?? true
      }])
      .select()
      .single();
    
    if (error) throw error;
    return this.mapClientFromSupabase(data);
  }

  async validateClient(email: string, password: string): Promise<StorageClient | null> {
    const client = await this.getClientByEmail(email);
    if (!client || !client.password) return null;
    
    const isValid = await bcrypt.compare(password, client.password);
    return isValid ? client : null;
  }

  async updateClient(id: string, updates: Partial<InsertStorageClient>): Promise<StorageClient | undefined> {
    const updateData: any = {};
    
    if (updates.name) updateData.name = updates.name;
    if (updates.email) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.serviceType) updateData.service_type = updates.serviceType;
    if (updates.whatsappInstanceUrl) updateData.whatsapp_instance_url = updates.whatsappInstanceUrl;
    if (updates.settings) updateData.settings = updates.settings;
    if (updates.assistantId) updateData.assistant_id = updates.assistantId;
    if (updates.promptIa) updateData.prompt_ia = updates.promptIa;
    if (updates.agentName) updateData.agent_name = updates.agentName;
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
    if (updates.password) {
      updateData.password = await bcrypt.hash(updates.password, 10);
    }
    
    const { data, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data ? this.mapClientFromSupabase(data) : undefined;
  }

  async deleteClient(id: string): Promise<void> {
    await supabase
      .from('clients')
      .delete()
      .eq('id', id);
  }

  async listClients(): Promise<StorageClient[]> {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
    
    return data ? data.map(client => this.mapClientFromSupabase(client)) : [];
  }

  // Helper methods to map Supabase data to our storage types
  private mapUserFromSupabase(data: any): StorageUser {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date(data.created_at)
    };
  }

  private mapSessionFromSupabase(data: any): StorageSession {
    return {
      id: data.id,
      userId: data.user_id,
      expiresAt: new Date(data.expires_at),
      createdAt: new Date(data.created_at)
    };
  }

  private mapClientFromSupabase(data: any): StorageClient {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      createdAt: new Date(data.created_at),
      isActive: data.is_active,
      serviceType: data.service_type || null,
      whatsappInstanceUrl: data.whatsapp_instance_url || null,
      settings: data.settings,
      assistantId: data.assistant_id || null,
      password: data.password || null,
      promptIa: data.prompt_ia || null,
      agentName: data.agent_name || null,
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
  }
}

export const storage = new SupabaseStorage();

import bcrypt from "bcrypt";
import { supabase } from "./supabase";
import type { 
  StorageUser, 
  InsertStorageUser, 
  StorageClient, 
  InsertStorageClient,
  StorageSession
} from "./types/storage-types";

export async function validateUserCredentials(email: string, passwordAttempt: string): Promise<StorageUser | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(passwordAttempt, data.password);

    if (!passwordMatch) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error in validateUserCredentials:', error);
    return null;
  }
}

export async function getUserById(userId: number): Promise<StorageUser | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error in getUserById:', error);
    return null;
  }
}

export async function createUserSession(userId: number): Promise<StorageSession> {
  try {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // Session expires in 1 day

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: userId,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      throw new Error('Failed to create session');
    }

    return {
      id: data.id,
      userId: data.user_id,
      expiresAt: new Date(data.expires_at),
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error in createUserSession:', error);
    throw error;
  }
}

export async function getSession(sessionId: string): Promise<StorageSession | null> {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select()
      .eq('id', sessionId)
      .single();

    if (error) {
      console.error('Error fetching session:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      userId: data.user_id,
      expiresAt: new Date(data.expires_at),
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error in getSession:', error);
    return null;
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', sessionId);

    if (error) {
      console.error('Error deleting session:', error);
      throw new Error('Failed to delete session');
    }
  } catch (error) {
    console.error('Error in deleteSession:', error);
    throw error;
  }
}

export async function createUser(userData: InsertStorageUser): Promise<StorageUser> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'admin'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
}

export async function createClient(clientData: InsertStorageClient): Promise<StorageClient> {
  try {
    const hashedPassword = clientData.password ? await bcrypt.hash(clientData.password, 10) : null;
    
    const { data, error } = await supabase
      .from('clients')
      .insert({
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        service_type: clientData.serviceType,
        whatsapp_instance_url: clientData.whatsappInstanceUrl,
        settings: clientData.settings,
        assistant_id: clientData.assistantId,
        password: hashedPassword,
        is_active: clientData.isActive ?? true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating client:', error);
      throw new Error('Failed to create client');
    }

    return mapSupabaseClientToStorageClient(data);
  } catch (error) {
    console.error('Error in createClient:', error);
    throw error;
  }
}

export async function updateClient(id: string, updates: Partial<InsertStorageClient>): Promise<StorageClient | null> {
  try {
    const updateData: any = {};
    
    if (updates.name) updateData.name = updates.name;
    if (updates.email) updateData.email = updates.email;
    if (updates.phone) updateData.phone = updates.phone;
    if (updates.serviceType) updateData.service_type = updates.serviceType;
    if (updates.whatsappInstanceUrl) updateData.whatsapp_instance_url = updates.whatsappInstanceUrl;
    if (updates.settings) updateData.settings = updates.settings;
    if (updates.assistantId) updateData.assistant_id = updates.assistantId;
    if (updates.password) updateData.password = updates.password;
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive;

    const { data, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating client:', error);
      return null;
    }

    return mapSupabaseClientToStorageClient(data);
  } catch (error) {
    console.error('Error in updateClient:', error);
    return null;
  }
}

export async function getClientById(clientId: string): Promise<StorageClient | null> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select()
      .eq('id', clientId)
      .single();

    if (error) {
      console.error('Error fetching client:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return mapSupabaseClientToStorageClient(data);
  } catch (error) {
    console.error('Error in getClientById:', error);
    return null;
  }
}

export async function getClients(): Promise<StorageClient[]> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select();

    if (error) {
      console.error('Error fetching clients:', error);
      return [];
    }

    return data.map(mapSupabaseClientToStorageClient);
  } catch (error) {
    console.error('Error in getClients:', error);
    return [];
  }
}

export async function deleteClient(clientId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId);

    if (error) {
      console.error('Error deleting client:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteClient:', error);
    return false;
  }
}

// Helper function to map Supabase client to StorageClient
function mapSupabaseClientToStorageClient(supabaseClient: any): StorageClient {
  return {
    id: supabaseClient.id,
    name: supabaseClient.name,
    email: supabaseClient.email,
    phone: supabaseClient.phone,
    createdAt: new Date(supabaseClient.created_at),
    isActive: supabaseClient.is_active,
    serviceType: supabaseClient.service_type,
    whatsappInstanceUrl: supabaseClient.whatsapp_instance_url,
    settings: supabaseClient.settings,
    assistantId: supabaseClient.assistant_id,
	password: supabaseClient.password,
    promptIa: supabaseClient.prompt_ia,
    agentName: supabaseClient.agent_name,
    plan: supabaseClient.plan,
    maxUsers: supabaseClient.max_users,
    maxAppointments: supabaseClient.max_appointments,
    maxStorage: supabaseClient.max_storage,
    customDomain: supabaseClient.custom_domain,
    brandingSettings: supabaseClient.branding_settings,
    businessHours: supabaseClient.business_hours,
    timezone: supabaseClient.timezone,
    language: supabaseClient.language,
    currency: supabaseClient.currency,
    twoFactorEnabled: supabaseClient.two_factor_enabled,
    sessionTimeout: supabaseClient.session_timeout,
    emailNotifications: supabaseClient.email_notifications,
    smsNotifications: supabaseClient.sms_notifications,
    whatsappNotifications: supabaseClient.whatsapp_notifications,
    autoBackup: supabaseClient.auto_backup,
    backupFrequency: supabaseClient.backup_frequency,
    integrations: supabaseClient.integrations,
    gdprCompliant: supabaseClient.gdpr_compliant,
    dataRetentionDays: supabaseClient.data_retention_days,
  };
}

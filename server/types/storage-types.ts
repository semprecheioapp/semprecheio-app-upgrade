
// Proper type definitions for storage operations
export interface StorageUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

export interface InsertStorageUser {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface StorageSession {
  id: string;
  userId: number;
  expiresAt: Date;
  createdAt: Date;
}

export interface StorageClient {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: Date;
  isActive: boolean;
  serviceType?: string | null;
  whatsappInstanceUrl?: string | null;
  settings?: any;
  assistantId?: string | null;
  password?: string | null;
  promptIa?: string | null;
  agentName?: string | null;
  plan: string;
  maxUsers: number;
  maxAppointments: number;
  maxStorage: number;
  customDomain?: string | null;
  brandingSettings?: any;
  businessHours?: any;
  timezone: string;
  language: string;
  currency: string;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  autoBackup: boolean;
  backupFrequency: string;
  integrations?: any;
  gdprCompliant: boolean;
  dataRetentionDays: number;
}

export interface InsertStorageClient {
  name: string;
  email: string;
  phone?: string;
  isActive?: boolean;
  serviceType?: string;
  whatsappInstanceUrl?: string;
  settings?: any;
  assistantId?: string;
  password?: string;
  promptIa?: string;
  agentName?: string;
  plan?: string;
  maxUsers?: number;
  maxAppointments?: number;
  maxStorage?: number;
  customDomain?: string;
  brandingSettings?: any;
  businessHours?: any;
  timezone?: string;
  language?: string;
  currency?: string;
  twoFactorEnabled?: boolean;
  sessionTimeout?: number;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  whatsappNotifications?: boolean;
  autoBackup?: boolean;
  backupFrequency?: string;
  integrations?: any;
  gdprCompliant?: boolean;
  dataRetentionDays?: number;
}


import { getStorage } from "../storage/memory-storage";
import type { StorageClient, InsertStorageClient } from "../types/storage-types";

export class ClientService {
  private storage = getStorage();

  async createClient(clientData: InsertStorageClient): Promise<StorageClient> {
    return await this.storage.createClient(clientData);
  }

  async getClientById(id: string): Promise<StorageClient | null> {
    return await this.storage.getClientById(id);
  }

  async updateClient(id: string, updates: Partial<StorageClient>): Promise<StorageClient | null> {
    return await this.storage.updateClient(id, updates);
  }

  async getAllClients(): Promise<StorageClient[]> {
    return await this.storage.getClients();
  }

  async deleteClient(id: string): Promise<boolean> {
    return await this.storage.deleteClient(id);
  }
}

export const clientService = new ClientService();

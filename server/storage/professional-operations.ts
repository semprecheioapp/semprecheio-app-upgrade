
export class ProfessionalOperations {
  private professionals: Map<string, any>;

  constructor() {
    this.professionals = new Map();
    this.initializeTestData();
  }

  private initializeTestData() {
    const professional1 = {
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
  }

  async getProfessional(id: string): Promise<any | undefined> {
    return this.professionals.get(id);
  }

  async getProfessionalByEmail(email: string): Promise<any | undefined> {
    return Array.from(this.professionals.values()).find(
      (professional) => professional.email === email,
    );
  }

  async createProfessional(insertProfessional: any): Promise<any> {
    const id = crypto.randomUUID();
    const professional = {
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

  async updateProfessional(id: string, updates: any): Promise<any | undefined> {
    const professional = this.professionals.get(id);
    if (!professional) return undefined;

    const updatedProfessional = {
      ...professional,
      ...updates,
    };

    this.professionals.set(id, updatedProfessional);
    return updatedProfessional;
  }

  async deleteProfessional(id: string): Promise<void> {
    this.professionals.delete(id);
  }

  async listProfessionals(clientId: string): Promise<any[]> {
    return Array.from(this.professionals.values())
      .filter(professional => professional.clientId === clientId);
  }

  async listProfessionalsByClient(clientId: string): Promise<any[]> {
    return this.listProfessionals(clientId);
  }
}

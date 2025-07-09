
export class ExtendedOperations {
  private specialties: Map<string, any>;
  private services: Map<string, any>;
  private appointments: Map<string, any>;
  private customers: Map<string, any>;
  private connections: Map<number, any>;
  private professionalAvailability: Map<string, any>;
  private currentConnectionId: number;

  constructor() {
    this.specialties = new Map();
    this.services = new Map();
    this.appointments = new Map();
    this.customers = new Map();
    this.connections = new Map();
    this.professionalAvailability = new Map();
    this.currentConnectionId = 1;
    this.initializeTestData();
  }

  private initializeTestData() {
    // Test specialties
    const specialty1 = {
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
    const service1 = {
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

    // Test customers
    const customer1 = {
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

    // Test connections
    const connection1 = {
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

  // Specialty operations
  async getSpecialty(id: string): Promise<any | undefined> {
    return this.specialties.get(id);
  }

  async createSpecialty(insertSpecialty: any): Promise<any> {
    const id = crypto.randomUUID();
    const specialty = {
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

  async updateSpecialty(id: string, updates: any): Promise<any | undefined> {
    const specialty = this.specialties.get(id);
    if (!specialty) return undefined;

    const updatedSpecialty = {
      ...specialty,
      ...updates,
    };

    this.specialties.set(id, updatedSpecialty);
    return updatedSpecialty;
  }

  async deleteSpecialty(id: string): Promise<void> {
    this.specialties.delete(id);
  }

  async listSpecialties(clientId: string): Promise<any[]> {
    return Array.from(this.specialties.values())
      .filter(specialty => specialty.clientId === clientId);
  }

  async listSpecialtiesByClient(clientId: string): Promise<any[]> {
    return this.listSpecialties(clientId);
  }

  // Service operations
  async getService(id: string): Promise<any | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: any): Promise<any> {
    const id = crypto.randomUUID();
    const service = {
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

  async updateService(id: string, updates: any): Promise<any | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;

    const updatedService = {
      ...service,
      ...updates,
    };

    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: string): Promise<void> {
    this.services.delete(id);
  }

  async listServices(clientId: string): Promise<any[]> {
    return Array.from(this.services.values())
      .filter(service => service.clientId === clientId);
  }

  async listServicesByClient(clientId: string): Promise<any[]> {
    return this.listServices(clientId);
  }

  // Appointment operations
  async getAppointment(id: string): Promise<any | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(insertAppointment: any): Promise<any> {
    const id = crypto.randomUUID();
    const appointment = {
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

  async updateAppointment(id: string, updates: any): Promise<any | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;

    const updatedAppointment = {
      ...appointment,
      ...updates,
    };

    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  async deleteAppointment(id: string): Promise<void> {
    this.appointments.delete(id);
  }

  async cancelAppointment(id: string): Promise<void> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      appointment.status = 'cancelled';
      this.appointments.set(id, appointment);
    }
  }

  async listAppointments(clientId: string): Promise<any[]> {
    return Array.from(this.appointments.values())
      .filter(appointment => appointment.clientId === clientId);
  }

  // Customer operations
  async getCustomer(id: string): Promise<any | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: any): Promise<any> {
    const id = crypto.randomUUID();
    const customer = {
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

  async updateCustomer(id: string, updates: any): Promise<any | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;

    const updatedCustomer = {
      ...customer,
      ...updates,
    };

    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  async deleteCustomer(id: string): Promise<void> {
    this.customers.delete(id);
  }

  async listCustomers(clientId: string): Promise<any[]> {
    return Array.from(this.customers.values())
      .filter(customer => customer.clientId === clientId);
  }

  // Connection operations
  async getConnection(id: number): Promise<any | undefined> {
    return this.connections.get(id);
  }

  async createConnection(insertConnection: any): Promise<any> {
    const id = this.currentConnectionId++;
    const connection = {
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

  async updateConnection(id: number, updates: any): Promise<any | undefined> {
    const connection = this.connections.get(id);
    if (!connection) return undefined;

    const updatedConnection = {
      ...connection,
      ...updates,
    };

    this.connections.set(id, updatedConnection);
    return updatedConnection;
  }

  async deleteConnection(id: number): Promise<void> {
    this.connections.delete(id);
  }

  async listConnections(clientId: string): Promise<any[]> {
    return Array.from(this.connections.values())
      .filter(connection => connection.clientId === clientId);
  }

  async validateConnection(connectionId: number): Promise<boolean> {
    const connection = this.connections.get(connectionId);
    return connection?.isActive === true;
  }

  // Professional Availability operations
  async getProfessionalAvailability(id: string): Promise<any | undefined> {
    return this.professionalAvailability.get(id);
  }

  async createProfessionalAvailability(availability: any): Promise<any> {
    const id = crypto.randomUUID();
    const newAvailability = {
      id,
      ...availability,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.professionalAvailability.set(id, newAvailability);
    return newAvailability;
  }

  async updateProfessionalAvailability(id: string, updates: any): Promise<any | undefined> {
    const availability = this.professionalAvailability.get(id);
    if (!availability) return undefined;

    const updatedAvailability = {
      ...availability,
      ...updates,
      updatedAt: new Date(),
    };

    this.professionalAvailability.set(id, updatedAvailability);
    return updatedAvailability;
  }

  async deleteProfessionalAvailability(id: string): Promise<void> {
    this.professionalAvailability.delete(id);
  }

  async listProfessionalAvailability(professionalId: string): Promise<any[]> {
    return Array.from(this.professionalAvailability.values())
      .filter(availability => availability.professionalId === professionalId);
  }

  async listProfessionalAvailabilityByClient(clientId: string): Promise<any[]> {
    return Array.from(this.professionalAvailability.values())
      .filter(availability => availability.clientId === clientId);
  }

  async updateMonthlyAvailability(data: any): Promise<void> {
    // Implementation for monthly availability update
    console.log('Updating monthly availability:', data);
  }

  async generateNextMonthAvailability(data: any): Promise<void> {
    // Implementation for generating next month availability
    console.log('Generating next month availability:', data);
  }

  // Additional operations for missing methods
  async getClientByWhatsappInstance(instanceUrl: string): Promise<any | undefined> {
    const connection = Array.from(this.connections.values())
      .find(conn => conn.instance === instanceUrl || conn.whatsappInstanceUrl === instanceUrl);
    return connection ? { clientId: connection.clientId } : undefined;
  }

  async createBackup(clientId: string): Promise<any> {
    return { id: crypto.randomUUID(), clientId, createdAt: new Date(), status: 'completed' };
  }

  async generateSQLExport(clientId: string): Promise<string> {
    return `-- SQL Export for client ${clientId}\n-- Generated at ${new Date().toISOString()}`;
  }

  // Subscription operations (placeholder implementations)
  async listSubscriptionPlans(): Promise<any[]> {
    return [{ id: '1', name: 'Basic', price: 2999 }, { id: '2', name: 'Pro', price: 4999 }];
  }

  async getSubscriptionPlan(id: string): Promise<any | undefined> {
    const plans = await this.listSubscriptionPlans();
    return plans.find(plan => plan.id === id);
  }

  async createSubscriptionPlan(plan: any): Promise<any> {
    return { id: crypto.randomUUID(), ...plan, createdAt: new Date() };
  }

  async listSubscriptions(clientId: string): Promise<any[]> {
    return [{ id: crypto.randomUUID(), clientId, planId: '1', status: 'active' }];
  }

  async getSubscription(id: string): Promise<any | undefined> {
    return { id, clientId: '165bc915-45bc-423e-ac8f-7a60a3bf9b05', planId: '1', status: 'active' };
  }

  async createSubscription(subscription: any): Promise<any> {
    return { id: crypto.randomUUID(), ...subscription, createdAt: new Date() };
  }

  async listInvoices(clientId: string): Promise<any[]> {
    return [{ id: crypto.randomUUID(), clientId, amount: 2999, status: 'paid' }];
  }

  async listPayments(clientId: string): Promise<any[]> {
    return [{ id: crypto.randomUUID(), clientId, amount: 2999, status: 'completed' }];
  }
}

import type { 
  Customer, InsertCustomer,
  Conversation, InsertConversation,
  Message, InsertMessage,
  Workflow, InsertWorkflow,
  Ticket, InsertTicket,
  Integration, InsertIntegration,
  AnalyticsData
} from "@shared/schema";

export interface IStorage {
  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | null>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer | null>;

  // Conversations
  getConversations(): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation | null>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: string, conversation: Partial<Conversation>): Promise<Conversation | null>;

  // Messages
  getMessages(conversationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;

  // Workflows
  getWorkflows(): Promise<Workflow[]>;
  getWorkflow(id: string): Promise<Workflow | null>;
  createWorkflow(workflow: InsertWorkflow): Promise<Workflow>;
  updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow | null>;

  // Tickets
  getTickets(): Promise<Ticket[]>;
  getTicket(id: string): Promise<Ticket | null>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicket(id: string, ticket: Partial<Ticket>): Promise<Ticket | null>;

  // Integrations
  getIntegrations(): Promise<Integration[]>;
  getIntegration(id: string): Promise<Integration | null>;
  createIntegration(integration: InsertIntegration): Promise<Integration>;
  updateIntegration(id: string, integration: Partial<Integration>): Promise<Integration | null>;

  // Analytics
  getAnalytics(): Promise<AnalyticsData>;
}

class MemStorage implements IStorage {
  private customers: Customer[] = [
    {
      id: "cust-1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1-555-0123",
      satisfactionRating: 4,
      tags: ["premium", "returning"],
      createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    },
    {
      id: "cust-2", 
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "+1-555-0456",
      satisfactionRating: 5,
      tags: ["enterprise"],
      createdAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
    },
    {
      id: "cust-3",
      name: "Emma Davis",
      email: "emma@example.com",
      satisfactionRating: 3,
      tags: ["new"],
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    }
  ];

  private conversations: Conversation[] = [
    {
      id: "conv-1",
      customerId: "cust-1",
      subject: "Billing Question",
      status: "open",
      channel: "chat",
      priority: "medium",
      assignedAgent: "agent-1",
      lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "conv-2",
      customerId: "cust-2",
      subject: "Technical Support",
      status: "pending",
      channel: "email",
      priority: "high",
      assignedAgent: "agent-2",
      lastActivity: new Date(Date.now() - 7200000), // 2 hours ago
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    },
    {
      id: "conv-3",
      customerId: "cust-3",
      subject: "Product Inquiry",
      status: "resolved",
      channel: "voice",
      priority: "low",
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    }
  ];

  private messages: Message[] = [
    {
      id: "msg-1",
      conversationId: "conv-1",
      sender: "customer",
      content: "Hi, I have a question about my recent bill. There seems to be an extra charge I don't understand.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      sender: "ai",
      content: "I'd be happy to help you understand your billing. Let me review your account details. I can see the charge you're referring to - it appears to be for premium support services that were activated last month. Would you like me to explain this in more detail?",
      timestamp: new Date(Date.now() - 7000000), // Shortly after
      isRead: true,
    },
    {
      id: "msg-3",
      conversationId: "conv-2",
      sender: "customer",
      content: "I'm experiencing issues with the API integration. Getting 500 errors consistently.",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      isRead: true,
    },
    {
      id: "msg-4",
      conversationId: "conv-2",
      sender: "ai",
      content: "I understand you're experiencing 500 errors with the API integration. This can be frustrating. Let me help you troubleshoot this issue. Can you please share the specific endpoint you're calling and any error messages you're receiving?",
      timestamp: new Date(Date.now() - 10600000), // Shortly after
      isRead: true,
    }
  ];

  private workflows: Workflow[] = [
    {
      id: "wf-1",
      name: "Payment Refund Process",
      description: "Automated workflow for processing customer refund requests",
      trigger: "refund_request",
      actions: ["validate_request", "check_eligibility", "process_refund", "send_confirmation"],
      isActive: true,
      successRate: 92,
      executionCount: 234,
      createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
    },
    {
      id: "wf-2",
      name: "Technical Support Escalation",
      description: "Escalates complex technical issues to senior engineers",
      trigger: "technical_complexity_high",
      actions: ["analyze_issue", "assign_specialist", "notify_customer", "track_resolution"],
      isActive: true,
      successRate: 87,
      executionCount: 156,
      createdAt: new Date(Date.now() - 86400000 * 20), // 20 days ago
    },
    {
      id: "wf-3",
      name: "Customer Onboarding",
      description: "Welcome new customers and guide them through setup",
      trigger: "new_customer_signup",
      actions: ["send_welcome_email", "schedule_onboarding_call", "create_account_setup_tasks"],
      isActive: true,
      successRate: 95,
      executionCount: 89,
      createdAt: new Date(Date.now() - 86400000 * 15), // 15 days ago
    }
  ];

  private tickets: Ticket[] = [
    {
      id: "ticket-1",
      customerId: "cust-1",
      subject: "Billing discrepancy",
      description: "Customer reporting unexpected charge on account",
      category: "payment",
      status: "open",
      priority: "medium",
      assignedAgent: "agent-1",
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      updatedAt: new Date(Date.now() - 3600000),
    },
    {
      id: "ticket-2",
      customerId: "cust-2",
      subject: "API Integration Issues",
      description: "500 errors when calling user management endpoints",
      category: "technical",
      status: "in-progress",
      priority: "high",
      assignedAgent: "agent-2",
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      updatedAt: new Date(Date.now() - 1800000), // 30 minutes ago
    }
  ];

  private integrations: Integration[] = [
    {
      id: "int-1",
      name: "Stripe",
      type: "stripe",
      status: "connected",
      config: { webhook_url: "https://api.example.com/stripe-webhook" },
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
      createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
    },
    {
      id: "int-2",
      name: "HubSpot CRM",
      type: "hubspot",
      status: "connected",
      config: { api_key: "***", portal_id: "12345" },
      lastSync: new Date(Date.now() - 7200000), // 2 hours ago
      createdAt: new Date(Date.now() - 86400000 * 45), // 45 days ago
    },
    {
      id: "int-3",
      name: "Microsoft Teams",
      type: "teams",
      status: "disconnected",
      config: {},
      createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
    },
    {
      id: "int-4",
      name: "Salesforce",
      type: "salesforce",
      status: "error",
      config: { instance_url: "https://company.salesforce.com" },
      lastSync: new Date(Date.now() - 86400000), // 1 day ago
      createdAt: new Date(Date.now() - 86400000 * 60), // 60 days ago
    }
  ];

  // Helper function to generate IDs
  private generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    return [...this.customers];
  }

  async getCustomer(id: string): Promise<Customer | null> {
    return this.customers.find(c => c.id === id) || null;
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const newCustomer: Customer = {
      ...customer,
      id: this.generateId('cust'),
      createdAt: new Date(),
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer | null> {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.customers[index] = { ...this.customers[index], ...customer };
    return this.customers[index];
  }

  // Conversations
  async getConversations(): Promise<Conversation[]> {
    return [...this.conversations];
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return this.conversations.find(c => c.id === id) || null;
  }

  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const newConversation: Conversation = {
      ...conversation,
      id: this.generateId('conv'),
      lastActivity: new Date(),
      createdAt: new Date(),
    };
    this.conversations.push(newConversation);
    return newConversation;
  }

  async updateConversation(id: string, conversation: Partial<Conversation>): Promise<Conversation | null> {
    const index = this.conversations.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.conversations[index] = { 
      ...this.conversations[index], 
      ...conversation,
      lastActivity: new Date()
    };
    return this.conversations[index];
  }

  // Messages
  async getMessages(conversationId: string): Promise<Message[]> {
    return this.messages.filter(m => m.conversationId === conversationId);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = {
      ...message,
      id: this.generateId('msg'),
      timestamp: new Date(),
    };
    this.messages.push(newMessage);
    
    // Update conversation last activity
    await this.updateConversation(message.conversationId, {});
    
    return newMessage;
  }

  // Workflows
  async getWorkflows(): Promise<Workflow[]> {
    return [...this.workflows];
  }

  async getWorkflow(id: string): Promise<Workflow | null> {
    return this.workflows.find(w => w.id === id) || null;
  }

  async createWorkflow(workflow: InsertWorkflow): Promise<Workflow> {
    const newWorkflow: Workflow = {
      ...workflow,
      id: this.generateId('wf'),
      successRate: 0,
      executionCount: 0,
      createdAt: new Date(),
    };
    this.workflows.push(newWorkflow);
    return newWorkflow;
  }

  async updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow | null> {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) return null;
    
    this.workflows[index] = { ...this.workflows[index], ...workflow };
    return this.workflows[index];
  }

  // Tickets
  async getTickets(): Promise<Ticket[]> {
    return [...this.tickets];
  }

  async getTicket(id: string): Promise<Ticket | null> {
    return this.tickets.find(t => t.id === id) || null;
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const newTicket: Ticket = {
      ...ticket,
      id: this.generateId('ticket'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tickets.push(newTicket);
    return newTicket;
  }

  async updateTicket(id: string, ticket: Partial<Ticket>): Promise<Ticket | null> {
    const index = this.tickets.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    this.tickets[index] = { 
      ...this.tickets[index], 
      ...ticket,
      updatedAt: new Date()
    };
    return this.tickets[index];
  }

  // Integrations
  async getIntegrations(): Promise<Integration[]> {
    return [...this.integrations];
  }

  async getIntegration(id: string): Promise<Integration | null> {
    return this.integrations.find(i => i.id === id) || null;
  }

  async createIntegration(integration: InsertIntegration): Promise<Integration> {
    const newIntegration: Integration = {
      ...integration,
      id: this.generateId('int'),
      createdAt: new Date(),
    };
    this.integrations.push(newIntegration);
    return newIntegration;
  }

  async updateIntegration(id: string, integration: Partial<Integration>): Promise<Integration | null> {
    const index = this.integrations.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    this.integrations[index] = { 
      ...this.integrations[index], 
      ...integration,
      lastSync: integration.status === 'connected' ? new Date() : this.integrations[index].lastSync
    };
    return this.integrations[index];
  }

  // Analytics
  async getAnalytics(): Promise<AnalyticsData> {
    const openTickets = this.tickets.filter(t => t.status === 'open').length;
    const resolvedToday = this.tickets.filter(t => 
      t.status === 'resolved' && 
      t.updatedAt.toDateString() === new Date().toDateString()
    ).length;
    
    const totalConversations = this.conversations.length;
    const ratings = this.customers
      .map(c => c.satisfactionRating)
      .filter(r => r !== undefined) as number[];
    const averageRating = ratings.length > 0 
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
      : 0;

    const activeWorkflows = this.workflows.filter(w => w.isActive).length;
    const successfulWorkflows = this.workflows.filter(w => w.successRate > 80).length;

    return {
      activeTickets: openTickets,
      responseTime: "2m 15s",
      csat: 4.2,
      resolvedToday,
      totalConversations,
      averageRating: Math.round(averageRating * 10) / 10,
      pendingWorkflows: activeWorkflows - successfulWorkflows,
      successfulWorkflows,
    };
  }
}

export const storage = new MemStorage();
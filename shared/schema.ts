import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// Customer schema
export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  satisfactionRating: z.number().min(1).max(5).optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.date().default(() => new Date()),
});

export const insertCustomerSchema = customerSchema.omit({ 
  id: true, 
  createdAt: true 
});

export type Customer = z.infer<typeof customerSchema>;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

// Conversation schema
export const conversationSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  subject: z.string(),
  status: z.enum(["open", "resolved", "pending"]).default("open"),
  channel: z.enum(["chat", "email", "voice", "sms"]).default("chat"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  assignedAgent: z.string().optional(),
  lastActivity: z.date().default(() => new Date()),
  createdAt: z.date().default(() => new Date()),
});

export const insertConversationSchema = conversationSchema.omit({ 
  id: true, 
  createdAt: true,
  lastActivity: true 
});

export type Conversation = z.infer<typeof conversationSchema>;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

// Message schema
export const messageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  sender: z.enum(["customer", "agent", "ai"]),
  content: z.string(),
  timestamp: z.date().default(() => new Date()),
  isRead: z.boolean().default(false),
});

export const insertMessageSchema = messageSchema.omit({ 
  id: true, 
  timestamp: true 
});

export type Message = z.infer<typeof messageSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Workflow schema
export const workflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  trigger: z.string(),
  actions: z.array(z.string()),
  isActive: z.boolean().default(true),
  successRate: z.number().min(0).max(100).default(0),
  executionCount: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
});

export const insertWorkflowSchema = workflowSchema.omit({ 
  id: true, 
  createdAt: true,
  successRate: true,
  executionCount: true 
});

export type Workflow = z.infer<typeof workflowSchema>;
export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;

// Ticket schema
export const ticketSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  subject: z.string(),
  description: z.string(),
  category: z.enum(["payment", "technical", "account", "appointment", "order", "general"]).default("general"),
  status: z.enum(["open", "in-progress", "resolved", "closed"]).default("open"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  assignedAgent: z.string().optional(),
  resolution: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const insertTicketSchema = ticketSchema.omit({ 
  id: true, 
  createdAt: true,
  updatedAt: true 
});

export type Ticket = z.infer<typeof ticketSchema>;
export type InsertTicket = z.infer<typeof insertTicketSchema>;

// Integration schema
export const integrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["stripe", "hubspot", "salesforce", "teams", "slack", "email", "sms"]),
  status: z.enum(["connected", "disconnected", "error"]).default("disconnected"),
  config: z.record(z.string()).default({}),
  lastSync: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const insertIntegrationSchema = integrationSchema.omit({ 
  id: true, 
  createdAt: true 
});

export type Integration = z.infer<typeof integrationSchema>;
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;

// Analytics data types
export type AnalyticsData = {
  activeTickets: number;
  responseTime: string;
  csat: number;
  resolvedToday: number;
  totalConversations: number;
  averageRating: number;
  pendingWorkflows: number;
  successfulWorkflows: number;
};
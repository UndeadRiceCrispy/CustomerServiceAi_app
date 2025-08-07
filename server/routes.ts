import express from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema, insertCustomerSchema, insertWorkflowSchema, insertTicketSchema } from "@shared/schema";
import { generateCustomerServiceResponse, analyzeConversationSentiment, categorizeTicket } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analytics endpoints
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Customer endpoints
  app.get("/api/customers", async (req, res) => {
    try {
      const customers = await storage.getCustomers();
      res.json(customers);
    } catch (error) {
      console.error("Get customers error:", error);
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  });

  app.get("/api/customers/:id", async (req, res) => {
    try {
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer);
    } catch (error) {
      console.error("Get customer error:", error);
      res.status(500).json({ error: "Failed to fetch customer" });
    }
  });

  app.post("/api/customers", async (req, res) => {
    try {
      const validatedData = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(validatedData);
      res.status(201).json(customer);
    } catch (error) {
      console.error("Create customer error:", error);
      res.status(400).json({ error: "Failed to create customer" });
    }
  });

  // Conversation endpoints
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Get conversations error:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/conversations/:id", async (req, res) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error) {
      console.error("Get conversation error:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(validatedData);
      res.status(201).json(conversation);
    } catch (error) {
      console.error("Create conversation error:", error);
      res.status(400).json({ error: "Failed to create conversation" });
    }
  });

  // Message endpoints
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/conversations/:id/messages", async (req, res) => {
    try {
      const messageData = {
        ...req.body,
        conversationId: req.params.id,
      };
      
      const validatedData = insertMessageSchema.parse(messageData);
      const message = await storage.createMessage(validatedData);

      // Generate AI response if the message is from a customer
      if (validatedData.sender === "customer") {
        try {
          // Get conversation history for context
          const allMessages = await storage.getMessages(req.params.id);
          const conversation = await storage.getConversation(req.params.id);
          
          // Get customer context
          let customerContext;
          if (conversation) {
            const customer = await storage.getCustomer(conversation.customerId);
            customerContext = customer ? {
              name: customer.name,
              satisfactionRating: customer.satisfactionRating,
              tags: customer.tags
            } : undefined;
          }

          // Generate AI response
          const messageHistory = [...allMessages, message].map(m => ({
            content: m.content,
            sender: m.sender
          }));

          const aiResponse = await generateCustomerServiceResponse(messageHistory, customerContext);
          
          // Create AI response message
          const aiMessage = await storage.createMessage({
            conversationId: req.params.id,
            sender: "ai",
            content: aiResponse,
            isRead: false,
          });

          // Analyze sentiment of the conversation
          const sentiment = await analyzeConversationSentiment(messageHistory);
          console.log(`Conversation sentiment: ${sentiment.sentiment} (${sentiment.score})`);

          // Return both messages
          res.status(201).json({ userMessage: message, aiMessage });
        } catch (aiError) {
          console.error("AI response error:", aiError);
          // Still return the user message even if AI fails
          res.status(201).json({ userMessage: message });
        }
      } else {
        res.status(201).json({ userMessage: message });
      }
    } catch (error) {
      console.error("Create message error:", error);
      res.status(400).json({ error: "Failed to create message" });
    }
  });

  // Workflow endpoints
  app.get("/api/workflows", async (req, res) => {
    try {
      const workflows = await storage.getWorkflows();
      res.json(workflows);
    } catch (error) {
      console.error("Get workflows error:", error);
      res.status(500).json({ error: "Failed to fetch workflows" });
    }
  });

  app.post("/api/workflows", async (req, res) => {
    try {
      const validatedData = insertWorkflowSchema.parse(req.body);
      const workflow = await storage.createWorkflow(validatedData);
      res.status(201).json(workflow);
    } catch (error) {
      console.error("Create workflow error:", error);
      res.status(400).json({ error: "Failed to create workflow" });
    }
  });

  // Ticket endpoints
  app.get("/api/tickets", async (req, res) => {
    try {
      const tickets = await storage.getTickets();
      res.json(tickets);
    } catch (error) {
      console.error("Get tickets error:", error);
      res.status(500).json({ error: "Failed to fetch tickets" });
    }
  });

  app.post("/api/tickets", async (req, res) => {
    try {
      const ticketData = { ...req.body };
      
      // Auto-categorize the ticket using AI
      if (ticketData.description && !ticketData.category) {
        try {
          const category = await categorizeTicket(ticketData.description, ticketData.subject);
          ticketData.category = category;
        } catch (aiError) {
          console.error("Ticket categorization error:", aiError);
          // Continue with default category
        }
      }
      
      const validatedData = insertTicketSchema.parse(ticketData);
      const ticket = await storage.createTicket(validatedData);
      res.status(201).json(ticket);
    } catch (error) {
      console.error("Create ticket error:", error);
      res.status(400).json({ error: "Failed to create ticket" });
    }
  });

  // Integration endpoints
  app.get("/api/integrations", async (req, res) => {
    try {
      const integrations = await storage.getIntegrations();
      res.json(integrations);
    } catch (error) {
      console.error("Get integrations error:", error);
      res.status(500).json({ error: "Failed to fetch integrations" });
    }
  });

  app.post("/api/integrations", async (req, res) => {
    try {
      const integration = await storage.createIntegration(req.body);
      res.status(201).json(integration);
    } catch (error) {
      console.error("Create integration error:", error);
      res.status(400).json({ error: "Failed to create integration" });
    }
  });

  app.patch("/api/integrations/:id", async (req, res) => {
    try {
      const integration = await storage.updateIntegration(req.params.id, req.body);
      if (!integration) {
        return res.status(404).json({ error: "Integration not found" });
      }
      res.json(integration);
    } catch (error) {
      console.error("Update integration error:", error);
      res.status(400).json({ error: "Failed to update integration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
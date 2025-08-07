# Overview

Evevo Ai is a comprehensive AI-powered customer service platform that provides intelligent multi-channel support capabilities. The platform leverages Google Gemini AI to deliver contextual customer responses, automated sentiment analysis, and smart ticket categorization. It supports various communication channels including live chat, email, voice, and SMS, while providing real-time analytics and automated workflow management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

## Frontend Architecture

- **React 18 with TypeScript**: Provides type-safe component development and modern React features
- **Vite Build System**: Enables fast development with hot module replacement and optimized production builds
- **Tailwind CSS + Radix UI**: Combines utility-first styling with accessible, unstyled components via shadcn/ui
- **TanStack Query**: Manages server state, caching, and synchronization for API interactions
- **Wouter Router**: Lightweight client-side routing solution for single-page application navigation

## Backend Architecture

- **Node.js Express API**: RESTful API server providing endpoints for customer service operations
- **TypeScript**: Full-stack type safety ensuring consistency between frontend and backend data models
- **PostgreSQL with Drizzle ORM**: Relational database with type-safe query builder for data persistence

## AI Integration

- **Google Gemini AI**: Core AI engine powering intelligent response generation, sentiment analysis, and ticket categorization
- **Smart Escalation Logic**: AI-driven decision making for routing complex issues to human agents

## Multi-Channel Communication

- **Real-time Chat System**: Live customer conversation handling with WebSocket or similar real-time communication
- **Email Processing**: Automated email response generation and management
- **Voice Call Simulation**: Voice support capability integration
- **SMS Handling**: Text message customer interaction processing

## Analytics & Monitoring

- **Real-time Metrics Dashboard**: Performance tracking for response times, ticket volumes, and customer satisfaction
- **Workflow Success Tracking**: Monitors automated process completion rates and effectiveness

## External Dependencies

## AI Services

- **Google Gemini AI**: Primary AI engine for natural language processing, response generation, and sentiment analysis

## Database

- **PostgreSQL**: Primary data storage for customer interactions, tickets, user accounts, and analytics data
- **Drizzle ORM**: Database abstraction layer providing type-safe queries and migrations

## Potential Integrations

- **CRM Systems**: HubSpot and Salesforce connectivity for customer data synchronization
- **Microsoft Teams**: Communication platform integration for internal team collaboration
- **Stripe**: Payment processing integration for billing and subscription management
- **Email Services**: SMTP providers for automated email communication
- **SMS Gateways**: Third-party SMS service providers for text message support

## Development Tools

- **Vite**: Frontend build tool and development server
- **TanStack Query**: Client-side data fetching and state management
- **Radix UI**: Headless component library for accessible UI elements

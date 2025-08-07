# Evevo Ai - Customer Service Platform

A comprehensive AI-powered customer service platform featuring multi-channel support, intelligent conversation handling, automated workflow management, and real-time analytics.

## Features

### 🤖 AI-Powered Customer Service
- **Intelligent Responses**: Google Gemini AI generates contextual customer service responses
- **Sentiment Analysis**: Automatic analysis of customer conversation tone and satisfaction
- **Ticket Categorization**: AI-powered classification of support requests (payment, technical, account, etc.)
- **Smart Escalation**: Intelligent routing to human agents based on complexity

### 💬 Multi-Channel Support
- **Live Chat**: Real-time customer conversations with AI assistance
- **Email Integration**: Automated email response handling
- **Voice Support**: Voice call simulation and management
- **SMS Support**: Text message customer interactions

### 📊 Analytics & Reporting
- **Real-time Metrics**: Active tickets, response times, CSAT scores
- **Performance Tracking**: Agent productivity and workflow success rates
- **Customer Insights**: Satisfaction ratings and interaction history
- **Visual Dashboards**: Charts and graphs for key metrics

### 🔄 Workflow Automation
- **Process Management**: Automated multi-step customer service workflows
- **Custom Triggers**: Configurable automation rules
- **Success Tracking**: Monitor workflow completion rates
- **Integration Ready**: Connect with external systems and APIs

### 🔌 System Integrations
- **CRM Systems**: HubSpot, Salesforce connectivity
- **Communication Platforms**: Microsoft Teams integration
- **Payment Processing**: Stripe integration support
- **Extensible Architecture**: Easy addition of new integrations

## Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Radix UI + shadcn/ui** for accessible components
- **TanStack Query** for server state management
- **Wouter** for lightweight routing

### Backend
- **Node.js** with Express.js REST API
- **TypeScript** for full-stack type safety
- **PostgreSQL** with Drizzle ORM
- **Google Gemini AI** for natural language processing
- **Session management** with PostgreSQL storage

### Database Schema
- **Customers**: User profiles and satisfaction tracking
- **Conversations**: Multi-channel interaction management
- **Messages**: Individual conversation messages
- **Workflows**: Automated process definitions
- **Tickets**: Support request management
- **Integrations**: Third-party service configurations

## Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or use the provided in-memory storage)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lorikeet-ai-platform.git
   cd lorikeet-ai-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   DATABASE_URL=your_postgres_url (optional, uses in-memory storage by default)
   ```

4. **Get your Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Add it to your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000` to access the platform

## Usage

### Customer Service Chat
1. Navigate to the "Conversations" page
2. Select a customer conversation from the sidebar
3. Send messages as a customer service agent
4. Watch as Gemini AI provides intelligent response suggestions
5. Analyze conversation sentiment and customer satisfaction

### Workflow Management
1. Go to the "Workflows" section
2. View automated processes and their success rates
3. Create custom workflows for common customer issues
4. Monitor execution metrics and optimize processes

### Analytics Dashboard
1. Access the main dashboard for key metrics
2. View real-time data on active tickets and response times
3. Monitor customer satisfaction (CSAT) scores
4. Track agent performance and productivity

### System Integrations
1. Visit the "Integrations" page
2. Configure connections to external services
3. Set up CRM synchronization and communication platforms
4. Monitor integration health and data flow

## Project Structure

```
lorikeet-ai-platform/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages/routes
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Express.js backend API
│   ├── services/          # Business logic and AI integration
│   ├── routes.ts          # API route definitions
│   └── storage.ts         # Data persistence layer
├── shared/                # Shared types and schemas
└── README.md             # Project documentation
```

## API Endpoints

### Analytics
- `GET /api/analytics` - Get platform metrics and KPIs

### Conversations
- `GET /api/conversations` - List all customer conversations
- `GET /api/conversations/:id` - Get specific conversation details
- `GET /api/conversations/:id/messages` - Get conversation messages
- `POST /api/conversations/:id/messages` - Send new message (with AI response)

### Customers
- `GET /api/customers` - List all customers
- `GET /api/customers/:id` - Get customer details

### Workflows
- `GET /api/workflows` - List automated workflows
- `POST /api/workflows` - Create new workflow

### Integrations
- `GET /api/integrations` - List system integrations
- `POST /api/integrations` - Add new integration

## Development

### Adding New Features
1. Define data models in `shared/schema.ts`
2. Update storage interface in `server/storage.ts`
3. Add API routes in `server/routes.ts`
4. Create frontend components in `client/src/components/`
5. Add pages and routing in `client/src/pages/`

### AI Integration
The platform uses Google's Gemini AI for:
- **Response Generation**: `generateCustomerServiceResponse()`
- **Sentiment Analysis**: `analyzeConversationSentiment()`
- **Ticket Categorization**: `categorizeTicket()`

All AI functions are located in `server/services/gemini.ts` and can be extended for additional capabilities.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions, issues, or feature requests, please open an issue on GitHub or contact the development team.

## Acknowledgments

- Built with modern web technologies and AI capabilities
- Inspired by leading customer service platforms
- Designed for scalability and extensibility# CustomerServiceAi_app
# CustomerServiceAi_app

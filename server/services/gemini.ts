import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateCustomerServiceResponse(
  messages: Array<{ content: string; sender: string }>,
  customerContext?: { name?: string; satisfactionRating?: number; tags?: string[] }
): Promise<string> {
  try {
    const conversationHistory = messages
      .map(msg => `${msg.sender}: ${msg.content}`)
      .join('\n');

    const contextInfo = customerContext ? 
      `Customer Info: ${customerContext.name || 'Unknown'}, Satisfaction: ${customerContext.satisfactionRating || 'N/A'}/5, Tags: ${customerContext.tags?.join(', ') || 'None'}` 
      : '';

    const prompt = `You are a helpful customer service AI assistant. Based on the conversation history below, provide a professional, empathetic, and helpful response to the customer's latest message.

${contextInfo ? `${contextInfo}\n` : ''}
Conversation History:
${conversationHistory}

Guidelines:
- Be professional, friendly, and empathetic
- Provide specific, actionable solutions when possible
- Ask clarifying questions if needed
- Show understanding of the customer's concerns
- Keep responses concise but thorough
- If you cannot solve the issue, suggest escalation to a human agent

Respond as the customer service agent:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "I apologize, but I'm having trouble processing your request right now. Let me connect you with a human agent who can better assist you.";
  } catch (error) {
    console.error("AI response generation error:", error);
    return "I apologize for the technical issue. Let me connect you with a human agent who can help you immediately.";
  }
}

export async function analyzeConversationSentiment(messages: Array<{ content: string; sender: string }>) {
  try {
    const customerMessages = messages
      .filter(msg => msg.sender === 'customer')
      .map(msg => msg.content)
      .join(' ');

    if (!customerMessages.trim()) {
      return { sentiment: 'neutral', score: 0.5 };
    }

    const systemPrompt = `Analyze the sentiment of customer messages and provide a sentiment score from 0 (very negative) to 1 (very positive). 
Respond with JSON in this format: 
{'sentiment': 'positive|negative|neutral', 'score': number}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            sentiment: { type: "string" },
            score: { type: "number" },
          },
          required: ["sentiment", "score"],
        },
      },
      contents: `Analyze the sentiment of these customer messages: ${customerMessages}`,
    });

    const rawJson = response.text;
    const result = rawJson ? JSON.parse(rawJson) : {};
    
    return {
      sentiment: result.sentiment || 'neutral',
      score: Math.max(0, Math.min(1, result.score || 0.5))
    };
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    return { sentiment: 'neutral', score: 0.5 };
  }
}

export async function categorizeTicket(message: string, subject?: string): Promise<string> {
  try {
    const prompt = `Categorize this customer service request into one of these categories:
- payment: billing, charges, refunds, payment issues
- technical: bugs, errors, system problems
- account: login, password, profile, settings
- appointment: scheduling, rescheduling, cancellations
- order: shipping, delivery, product issues
- general: other inquiries

Message: ${message}
${subject ? `Subject: ${subject}` : ''}

Respond with just the category name.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const category = response.text?.toLowerCase().trim() || 'general';
    const validCategories = ['payment', 'technical', 'account', 'appointment', 'order', 'general'];
    
    return validCategories.includes(category) ? category : 'general';
  } catch (error) {
    console.error("Categorization error:", error);
    return 'general';
  }
}
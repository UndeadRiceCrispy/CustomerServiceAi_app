import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, MessageCircle, Send, User, Bot } from "lucide-react";
import type { Conversation, Customer, Message } from "@shared/schema";

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: conversations = [], isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
    queryFn: () => fetch("/api/conversations").then(res => res.json()),
  });

  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ["/api/customers"],
    queryFn: () => fetch("/api/customers").then(res => res.json()),
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/conversations", selectedConversation, "messages"],
    queryFn: () => fetch(`/api/conversations/${selectedConversation}/messages`).then(res => res.json()),
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch(`/api/conversations/${selectedConversation}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "customer",
          content,
          isRead: false,
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations", selectedConversation, "messages"] });
      setNewMessage("");
    },
  });

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-4 w-4" />;
      case "voice": return <Phone className="h-4 w-4" />;
      case "sms": return <MessageCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const customerData = selectedConversationData ? customers.find(c => c.id === selectedConversationData.customerId) : null;

  if (conversationsLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <div className="mt-6">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Conversations List */}
      <div className="w-80 border-r bg-muted/40 overflow-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Active Conversations</h2>
          <p className="text-sm text-muted-foreground">{conversations.length} conversations</p>
        </div>
        <div className="space-y-2 p-4">
          {conversations.map((conversation) => {
            const customer = customers.find(c => c.id === conversation.customerId);
            return (
              <Card 
                key={conversation.id}
                className={`cursor-pointer transition-colors hover:bg-accent ${
                  selectedConversation === conversation.id ? "border-primary bg-accent" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getChannelIcon(conversation.channel)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium truncate">
                          {customer?.name || "Unknown Customer"}
                        </h3>
                        <div className="flex space-x-1">
                          <Badge variant="outline" className={getStatusColor(conversation.status)}>
                            {conversation.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.subject}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className={getPriorityColor(conversation.priority)}>
                          {conversation.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conversation.lastActivity).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="border-b p-4 bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {customerData?.name || "Unknown Customer"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversationData?.subject}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className={getStatusColor(selectedConversationData?.status || "")}>
                    {selectedConversationData?.status}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(selectedConversationData?.priority || "")}>
                    {selectedConversationData?.priority}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messagesLoading ? (
                <div>Loading messages...</div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "customer" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "customer"
                          ? "bg-muted"
                          : message.sender === "ai"
                          ? "bg-blue-500 text-white"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "ai" ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-75">
                          {message.sender === "ai" ? "AI Assistant" : 
                           message.sender === "customer" ? customerData?.name || "Customer" : "Agent"}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message as customer..."
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && newMessage.trim()) {
                      sendMessageMutation.mutate(newMessage.trim());
                    }
                  }}
                />
                <Button
                  onClick={() => newMessage.trim() && sendMessageMutation.mutate(newMessage.trim())}
                  disabled={!newMessage.trim() || sendMessageMutation.isPending}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Send a message as the customer to see AI-powered responses
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
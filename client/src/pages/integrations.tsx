import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Plus, CheckCircle, AlertCircle, XCircle, Calendar } from "lucide-react";
import type { Integration } from "@shared/schema";

export default function Integrations() {
  const { data: integrations = [], isLoading } = useQuery<Integration[]>({
    queryKey: ["/api/integrations"],
    queryFn: () => fetch("/api/integrations").then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <div className="mt-6">Loading integrations...</div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      stripe: "Payment Processing",
      hubspot: "CRM System",
      salesforce: "CRM System", 
      teams: "Communication",
      slack: "Communication",
      email: "Email Service",
      sms: "SMS Gateway"
    };
    return labels[type] || type;
  };

  const connectedIntegrations = integrations.filter(i => i.status === "connected");
  const errorIntegrations = integrations.filter(i => i.status === "error");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Connect external services to enhance your customer service platform
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Integration Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
            <p className="text-xs text-muted-foreground">
              Configured services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{connectedIntegrations.length}</div>
            <p className="text-xs text-muted-foreground">
              Active connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorIntegrations.length}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.length > 0 
                ? Math.round((connectedIntegrations.length / integrations.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall connectivity
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {getStatusIcon(integration.status)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription>{getTypeLabel(integration.type)}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={getStatusBadge(integration.status)}
                    >
                      {integration.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Type</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {integration.type}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Status</h4>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <span className="text-sm capitalize">{integration.status}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Configuration</h4>
                    <div className="space-y-1">
                      {Object.keys(integration.config).length > 0 ? (
                        Object.entries(integration.config).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{key.replace(/_/g, ' ')}:</span>
                            <span className="font-medium truncate max-w-32">
                              {typeof value === 'string' && value.includes('***') 
                                ? value 
                                : typeof value === 'string' && value.length > 20
                                ? `${value.substring(0, 20)}...`
                                : String(value)
                              }
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No configuration available</p>
                      )}
                    </div>
                  </div>

                  {integration.lastSync && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Last Sync</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(integration.lastSync).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">
                      Added {new Date(integration.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                      <Button 
                        variant={integration.status === "connected" ? "destructive" : "default"} 
                        size="sm"
                      >
                        {integration.status === "connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {integrations.length === 0 && (
        <div className="text-center py-12">
          <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No integrations configured</h3>
          <p className="text-muted-foreground mb-4">
            Connect external services to extend your platform's capabilities
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Integration
          </Button>
        </div>
      )}

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>
              Popular services you can connect to your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Stripe</h4>
                <p className="text-sm text-muted-foreground mt-1">Payment processing and billing</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Connect
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Slack</h4>
                <p className="text-sm text-muted-foreground mt-1">Team communication and alerts</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Connect
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Twilio</h4>
                <p className="text-sm text-muted-foreground mt-1">SMS and voice communication</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
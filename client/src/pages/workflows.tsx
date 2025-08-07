import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, BarChart3, Settings, Zap, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import type { Workflow } from "@shared/schema";

export default function Workflows() {
  const { data: workflows = [], isLoading } = useQuery<Workflow[]>({
    queryKey: ["/api/workflows"],
    queryFn: () => fetch("/api/workflows").then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
        <div className="mt-6">Loading workflows...</div>
      </div>
    );
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getSuccessRateBadge = (rate: number) => {
    if (rate >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (rate >= 75) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
          <p className="text-muted-foreground">
            Automated processes and customer service workflows
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Workflow Settings
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.filter(w => w.isActive).length}</div>
            <p className="text-xs text-muted-foreground">
              {workflows.length} total workflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.length > 0 
                ? Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all workflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.reduce((acc, w) => acc + w.executionCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.filter(w => w.successRate >= 90).length}
            </div>
            <p className="text-xs text-muted-foreground">
              90%+ success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <div className="grid gap-4">
          {workflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <CardDescription>{workflow.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={getSuccessRateBadge(workflow.successRate)}
                    >
                      {workflow.successRate}% Success
                    </Badge>
                    <Badge variant={workflow.isActive ? "default" : "secondary"}>
                      {workflow.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {workflow.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Trigger</h4>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {workflow.trigger}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Actions</h4>
                    <div className="flex flex-wrap gap-1">
                      {workflow.actions.slice(0, 2).map((action, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                      {workflow.actions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{workflow.actions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Performance</h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Executions:</span>
                        <span className="font-medium">{workflow.executionCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className={`font-medium ${getSuccessRateColor(workflow.successRate)}`}>
                          {workflow.successRate}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">
                          {new Date(workflow.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Workflow Steps</h4>
                  <div className="flex items-center space-x-2 overflow-x-auto">
                    {workflow.actions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap">
                          {action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        {index < workflow.actions.length - 1 && (
                          <div className="w-4 h-px bg-border"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {workflows.length === 0 && (
        <div className="text-center py-12">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No workflows found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first automated workflow to streamline customer service processes
          </p>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Create Your First Workflow
          </Button>
        </div>
      )}
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Users, Clock, Star } from "lucide-react";
import type { AnalyticsData } from "@shared/schema";

export default function Analytics() {
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics"],
    queryFn: () => fetch("/api/analytics").then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="mt-6">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">Unable to load analytics data.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your customer service performance
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Activity className="h-3 w-3 mr-1" />
          Real-time Data
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.responseTime}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              12% faster than yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.csat}/5</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3 improvement this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalConversations}</div>
            <div className="flex items-center text-xs text-blue-600">
              <Activity className="h-3 w-3 mr-1" />
              Active interactions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.resolvedToday}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23% from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>
              Customer satisfaction by communication channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Live Chat</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-secondary rounded-full">
                    <div className="w-[92%] h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">4.6/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-secondary rounded-full">
                    <div className="w-[88%] h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">4.4/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Voice</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-secondary rounded-full">
                    <div className="w-[85%] h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">4.2/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SMS</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-secondary rounded-full">
                    <div className="w-[80%] h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">4.0/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Assistant Performance</CardTitle>
            <CardDescription>
              Gemini AI metrics and effectiveness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Response Accuracy</span>
                  <span className="text-sm text-muted-foreground">94.2%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm text-muted-foreground">4.1/5</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Resolution Rate</span>
                  <span className="text-sm text-muted-foreground">87.5%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Response Speed</span>
                  <span className="text-sm text-muted-foreground">1.2s avg</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Categories</CardTitle>
            <CardDescription>
              Distribution of support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Technical Support</span>
                <span className="text-sm text-muted-foreground">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Billing & Payments</span>
                <span className="text-sm text-muted-foreground">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Account Management</span>
                <span className="text-sm text-muted-foreground">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">General Inquiries</span>
                <span className="text-sm text-muted-foreground">17%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
            <CardDescription>
              Average response times by hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analytics.responseTime}</div>
                <p className="text-sm text-muted-foreground">Current average</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Peak hours: 9AM-11AM</span>
                  <span>3m 45s</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Off hours: 12AM-6AM</span>
                  <span>1m 20s</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Weekend average</span>
                  <span>2m 10s</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
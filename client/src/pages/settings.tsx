import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Shield, Database, Palette, Globe } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your platform preferences and system settings
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Settings className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </CardTitle>
            <CardDescription>
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  Customer Service Admin
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  admin@lorikeet.ai
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <div className="mt-1">
                <Badge>Administrator</Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Configure how you receive alerts and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">New Conversations</h4>
                  <p className="text-sm text-muted-foreground">Get notified when customers start new conversations</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">High Priority Tickets</h4>
                  <p className="text-sm text-muted-foreground">Immediate alerts for urgent customer issues</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Workflow Failures</h4>
                  <p className="text-sm text-muted-foreground">Alerts when automated processes fail</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Daily Reports</h4>
                  <p className="text-sm text-muted-foreground">Summary of daily activity and metrics</p>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </div>
            <Button variant="outline">Manage Notifications</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Privacy</span>
            </CardTitle>
            <CardDescription>
              Security settings and data protection preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Badge variant="secondary">Not Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Session Timeout</h4>
                  <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                </div>
                <Badge variant="outline">24 hours</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Data Encryption</h4>
                  <p className="text-sm text-muted-foreground">All customer data is encrypted at rest and in transit</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Security Settings</Button>
              <Button variant="outline">Privacy Policy</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>AI & Data Settings</span>
            </CardTitle>
            <CardDescription>
              Configure AI assistant behavior and data handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">AI Response Generation</h4>
                  <p className="text-sm text-muted-foreground">Use Gemini AI for automated customer responses</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Sentiment Analysis</h4>
                  <p className="text-sm text-muted-foreground">Automatically analyze customer conversation sentiment</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Auto-Categorization</h4>
                  <p className="text-sm text-muted-foreground">Automatically categorize support tickets</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Data Retention</h4>
                  <p className="text-sm text-muted-foreground">How long to keep conversation data</p>
                </div>
                <Badge variant="outline">12 months</Badge>
              </div>
            </div>
            <Button variant="outline">AI Configuration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">Choose between light and dark modes</p>
                </div>
                <Badge variant="outline">Light</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Compact Mode</h4>
                  <p className="text-sm text-muted-foreground">Show more information in less space</p>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Sidebar</h4>
                  <p className="text-sm text-muted-foreground">Navigation sidebar behavior</p>
                </div>
                <Badge variant="outline">Always Visible</Badge>
              </div>
            </div>
            <Button variant="outline">Appearance Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>System Information</span>
            </CardTitle>
            <CardDescription>
              Platform version and system details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Platform Version</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  Lorikeet AI v1.0.0
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">AI Model</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  Gemini 2.5 Flash
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Database</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  In-Memory Storage
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Last Updated</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">System Health</Button>
              <Button variant="outline">Download Logs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
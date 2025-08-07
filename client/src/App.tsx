import { Route, Switch } from "wouter";
import Dashboard from "./pages/dashboard";
import Conversations from "./pages/conversations";
import Analytics from "./pages/analytics";
import Workflows from "./pages/workflows";
import Integrations from "./pages/integrations";
import Settings from "./pages/settings";
import NotFound from "./pages/not-found";
import MainLayout from "./components/layout/main-layout";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        <Route path="/" component={() => <MainLayout><Dashboard /></MainLayout>} />
        <Route path="/conversations" component={() => <MainLayout><Conversations /></MainLayout>} />
        <Route path="/analytics" component={() => <MainLayout><Analytics /></MainLayout>} />
        <Route path="/workflows" component={() => <MainLayout><Workflows /></MainLayout>} />
        <Route path="/integrations" component={() => <MainLayout><Integrations /></MainLayout>} />
        <Route path="/settings" component={() => <MainLayout><Settings /></MainLayout>} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
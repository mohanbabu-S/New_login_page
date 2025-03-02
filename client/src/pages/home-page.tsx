import { useAuth } from "../hooks/use-auth";
import { Button } from "../components/ui/button";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to login if not authenticated
  if (!user) {
    setLocation("/auth");
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome, {user.username}!
          </h1>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Logout
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-lg text-muted-foreground">
            You have successfully logged in to the secure area. This page is protected
            and only accessible to authenticated users.
          </p>
        </div>
      </div>
    </div>
  );
}

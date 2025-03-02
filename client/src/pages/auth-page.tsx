import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/use-auth";
import { insertUserSchema, InsertUser } from "../../../shared/schema";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation, user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
  });

  const onSubmit = async (data: InsertUser) => {
    if (isLogin) {
      await loginMutation.mutateAsync(data);
    } else {
      await registerMutation.mutateAsync(data);
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Sign up to get started with our platform"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="username">
                Username
              </label>
              <Input
                id="username"
                type="text"
                disabled={isPending}
                {...register("username")}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                disabled={isPending}
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              disabled={isPending}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </Card>
      </div>

      {/* Hero Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8 items-center justify-center">
        <div className="text-white text-center max-w-lg">
          <h2 className="text-4xl font-bold mb-4">Secure Authentication System</h2>
          <p className="text-lg opacity-90">
            Experience our modern authentication system with secure session management
            and user-friendly interface. Built with React and Express for a seamless
            user experience.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/useUiStore";
import { signIn } from "next-auth/react";

export default function LoginDialog() {
  const { isLoginOpen, closeLogin, login } = useUiStore();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // abhi demo ke liye direct login karenge
    login(); // ✅ authenticated state true ho jayega
  };

  const handleGoogleLogin = async () => {
    await signIn("google");
    login(); // google ke baad bhi store update
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={(open) => !open && closeLogin()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLoginMode ? "Login" : "Create Account"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <>
              <Input type="text" placeholder="First Name" required />
              <Input type="text" placeholder="Last Name" required />
            </>
          )}
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" className="w-full">
            {isLoginMode ? "Login" : "Create Account"}
          </Button>
        </form>

        <Button variant="outline" className="w-full mt-2" onClick={handleGoogleLogin}>
          {isLoginMode ? "Sign in with Google" : "Sign Up with Google"}
        </Button>

        <p className="text-center mt-2 text-sm">
          {isLoginMode ? "New user?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "Create Account" : "Login"}
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
}

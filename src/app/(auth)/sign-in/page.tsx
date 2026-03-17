"use client";

import React, { useState } from "react";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function SignInPageContent() {
  const { 
    panelBg, 
    borderColor, 
    textColor, 
    hoverBg, 
    mutedTextColor, 
  } = useChatTheme();

  const [isLoading, setIsLoading] = useState<string | false>(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('credentials');
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully signed in!");
      router.push("/desktop");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(provider);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Successfully signed in with ${provider}!`);
      router.push("/desktop");
    }, 1500);
  };

  return (
    <div className="relative z-10 w-full max-w-md px-4 mt-8 mx-auto self-center">
      <Card className={`border ${borderColor} ${panelBg} shadow-2xl rounded-[2rem] overflow-hidden backdrop-blur-3xl`}>
        <CardHeader className="space-y-1 mt-4 px-8 pt-8">
          <CardTitle className={`text-3xl font-bold text-center tracking-tight ${textColor}`}>Welcome back</CardTitle>
          <CardDescription className={`text-center ${mutedTextColor} text-sm`}>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button disabled={!!isLoading} variant="outline" className={`w-full ${hoverBg} ${textColor} border-${borderColor} rounded-xl h-11 bg-transparent hover:border-emerald-500/50 transition-all shadow-sm`} onClick={() => handleSocialLogin('Google')}>
              {isLoading === 'Google' ? <Spinner className="mr-2" /> : <FcGoogle className="mr-2 h-5 w-5" />}
              Google
            </Button>
            <Button disabled={!!isLoading} variant="outline" className={`w-full ${hoverBg} ${textColor} border-${borderColor} rounded-xl h-11 bg-transparent hover:border-emerald-500/50 transition-all shadow-sm`} onClick={() => handleSocialLogin('GitHub')}>
                {isLoading === 'GitHub' ? <Spinner className="mr-2" /> : (
                  <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                )}
              Github
            </Button>
          </div>
          
          <div className={`relative ${mutedTextColor}`}>
            <div className="absolute inset-0 flex items-center">
              <span className={`w-full border-t ${borderColor}`} />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className={`${panelBg} px-2 py-0.5 rounded-full`}>Or continue with</span>
            </div>
          </div>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email" className={`text-sm font-semibold ${textColor} ml-1`}>Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className={`h-12 rounded-xl bg-black/5 dark:bg-black/20 border-${borderColor} ${textColor} px-4 focus-visible:ring-emerald-500/50 transition-shadow`} 
                required 
                disabled={!!isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className={`text-sm font-semibold ${textColor}`}>Password</Label>
                  <Link href="/forgot-password" className={`text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors`}>Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                className={`h-12 rounded-xl bg-black/5 dark:bg-black/20 border-${borderColor} ${textColor} px-4 focus-visible:ring-emerald-500/50 transition-shadow`} 
                required 
                disabled={!!isLoading}
              />
            </div>
            
            <Button type="submit" disabled={!!isLoading} className={`w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[15px] shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] mt-2 flex items-center justify-center`}>
              {isLoading === 'credentials' ? <Spinner className="text-white" /> : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="px-8 pb-8 pt-2 flex flex-col">
            <div className={`text-sm text-center font-medium ${mutedTextColor}`}>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-emerald-500 font-bold hover:text-emerald-400 hover:underline transition-colors">
                Sign up
              </Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}

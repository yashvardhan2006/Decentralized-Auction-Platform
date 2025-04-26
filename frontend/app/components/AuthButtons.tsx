// app/components/AuthButtons.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";

export function AuthButtons() {
  const { user } = useAuth();

  // not logged in → show both “Create Account” variants
  if (!user) {
    return (
      <div className="flex space-x-4">
        <Link href="/auth/register" passHref>
          <Button className="bg-white text-rose-600 hover:bg-gray-100 dark:bg-white dark:text-rose-600 dark:hover:bg-gray-100">
            Create Account
          </Button>
        </Link>
        <Link href="/auth/register" passHref>
          <Button variant="outline">Create Account</Button>
        </Link>
      </div>
    );
  }

  // logged in → replace this with whatever you need (e.g. a Profile menu or Logout)
  return (
    <div>
      <p className="text-sm">Welcome back!</p>
      {/* <Button onClick={logout}>Logout</Button> */}
    </div>
  );
}

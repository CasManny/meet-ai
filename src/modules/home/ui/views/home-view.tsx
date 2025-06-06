"use client";
import { authClient } from "@/lib/auth-client";

export default function HomeView() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <div className="">loading...</div>;
  }
  return <div className=""></div>;
}

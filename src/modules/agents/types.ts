import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

// export type AgentGetOne = inferRouterOutputs<AppRouter>['agents']['getOne']
export type many = inferRouterOutputs<AppRouter>["agents"]["getMany"]['items'];

export type AgentGetOne = {
  meetingCount: number;
  id: string;
  name: string;
  userId: string;
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum MeetingStatus {
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
  Processing = "processing",
  Cancelled = "cancelled"
}

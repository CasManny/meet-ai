import { agentsRouter } from "@/modules/agents/server/procedures";
import { createTRPCRouter } from "../init";
import { meetingRouters } from "@/modules/meetings/server/procedures";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingRouters,
});
// export type definition of API
export type AppRouter = typeof appRouter;

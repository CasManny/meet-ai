import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const meetingRouters = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        return {
            greeting: "hello world"
        }
    })
})
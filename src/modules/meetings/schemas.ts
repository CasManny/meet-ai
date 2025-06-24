import { z } from "zod";

export const MeetingsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    agentId: z.string().min(1, { message: "AgentId is required" })
})

export const MeetingsUpdateSchema = MeetingsInsertSchema.extend({
    id: z.string().min(1, { message: "Id is required" }),
})


export const  MeetingSchema = z.object({
  id: z.string(), // assuming generated with nanoid on backend
  name: z.string(),
  userId: z.string(),
  agentId: z.string(),
  status: z.enum(["upcoming", "ongoing", "completed", "active", "processing"]), 
  startedAt: z.date().optional().nullable(),
  transcriptUrl: z.string().url().optional().nullable(),
  recordingUrl: z.string().url().optional().nullable(),
  summary: z.string().optional().nullable(),
  endedAt: z.date().optional().nullable(),
  createdAt: z.date().optional(), // usually auto-set by backend
  updatedAt: z.date().optional(),
});

//   "upcoming", "active", "completed", "processing", "cancelled";

export type MeetingSchemaType = z.infer<typeof MeetingSchema>

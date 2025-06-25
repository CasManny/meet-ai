"use client"
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data)}</div>;
};

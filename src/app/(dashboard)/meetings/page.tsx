import { MeetingView } from "@/components/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import React from "react";

const MeetingsPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions());

  return <MeetingView />;
};

export default MeetingsPage;

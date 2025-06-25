"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdHeader } from "./meeing-id-header";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";

interface Props {
  id: string;
}

export const MeetingIdView = ({ id }: Props) => {
  const trpc = useTRPC();
  const [editMeeting, setEditMeeting] = useState(false);
  const router = useRouter();
  const [RemoveConfirmation, confirmRemove] = useConfirm({
    title: "Are you sure",
    description: "The following action will remove this meeting",
  });
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id }));

  const deleteMeeting = useMutation(
    trpc.meetings.removeMeeting.mutationOptions({
      onSuccess: async () => {
        toast.success("Meetings deleted successfully");
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message || "Internal server error");
      },
    })
  );

  const handleRemove = async () => {
    const success = await confirmRemove();
    if (!success) return;
    deleteMeeting.mutate({ id });
  };
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={editMeeting}
        onOpenChange={setEditMeeting}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdHeader
          meetingId={id}
          meetingName={data.name}
          onEdit={() => setEditMeeting(true)}
          onRemove={handleRemove}
        />
      </div>
    </>
  );
};

export const MeetingsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong"
    />
  );
};

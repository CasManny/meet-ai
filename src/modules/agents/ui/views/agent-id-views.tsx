"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdHeader } from "./agent-id-header";
import { GeneratedAvatar } from "@/components/generated-avatars";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentDialog } from "../components/updata-agent-dialog";
import { useState } from "react";

interface Props {
  agentId: string;
}

export const AgentIdViews = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm({
    title: "Are you sure?",
    description: `The following action will remove ${data.meetingCount} associated meetings`,
  });

  const deleteAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

         await queryClient.invalidateQueries(
           trpc.premium.getFreeUsage.queryOptions()
         );
        router.replace("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemove = async () => {
    const success = await confirmRemove();
    if (!success) return;
    await deleteAgent.mutate({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        initailValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-4 flex flex-col gap-y-4">
        <AgentIdHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateDialogOpen(true)}
          onRemove={handleRemove}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                seed={data.name}
                variant="botttsNeutral"
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant={"outline"}
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading agent"
      description="This may take a few seconds"
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something went wrong"
    />
  );
};

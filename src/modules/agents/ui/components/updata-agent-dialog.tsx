import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentGetOne } from "../../types";
import { AgentForm } from "./agent-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initailValues: AgentGetOne;
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initailValues,
}: Props) => {
  return (
    <ResponsiveDialog
      title="Edit AGent"
      description="Edit the agent details"
      onOpenChange={onOpenChange}
      open={open}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initailValues}
      />
    </ResponsiveDialog>
  );
};

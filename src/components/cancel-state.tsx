import { EmptyState } from "./empty-state";

export const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
      <EmptyState
        title="Meeting is active"
        description="Meeting will end once all participants have left"
        image="/cancelled.svg"
      />
    </div>
  );
};

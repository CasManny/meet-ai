import React, { Dispatch, SetStateAction } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
 
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Find a meeting or agent" />
          <CommandList>
              <CommandItem>item</CommandItem>
          </CommandList>
    </CommandDialog>
  );
};

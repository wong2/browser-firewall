import { cn } from "@/lib/utils";
import { Extension } from "@/types";
import { useSignal } from "@preact/signals";
import { Check, ChevronsUpDown } from "lucide-react";
import { FC, useState } from "preact/compat";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  extensions: Extension[];
  onSelected: (id: string) => void;
}

const ExtensionSelect: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const selected = useSignal(""); // selected extension id
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between">
          <span className="truncate">
            {props.extensions.find((ext) => ext.id === selected.value)?.name ||
              "Select extension..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search extension..." />
          <CommandEmpty>No extension found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[300px]">
              {props.extensions.map((ext) => (
                <CommandItem
                  value={ext.name}
                  key={ext.id}
                  onSelect={() => {
                    selected.value = ext.id;
                    props.onSelected(ext.id);
                    setOpen(false);
                  }}
                  className="flex flex-row items-center gap-1"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0",
                      selected.value === ext.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{ext.name}</span>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ExtensionSelect;

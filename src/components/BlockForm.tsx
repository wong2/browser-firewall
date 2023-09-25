import { block } from "@/lib/rules";
import { Extension } from "@/types";
import { useSignal } from "@preact/signals";
import { FC, useEffect } from "preact/compat";
import ExtensionSelect from "./ExtensionSelect";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
  extensions: Extension[];
}

const BlockForm: FC<Props> = (props) => {
  const itemType = useSignal("extension");
  const itemValue = useSignal("");
  const blocking = useSignal(false);

  useEffect(() => {
    itemValue.value = "";
  }, [itemType.value]);

  const submit = async () => {
    console.log(itemType.value, itemValue.value);
    if (!itemValue.value) {
      return;
    }
    // check format
    blocking.value = true;
    await block(itemValue.value);
    blocking.value = false;
    location.reload();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-7 gap-3">
        <Select
          defaultValue="extension"
          value={itemType.value}
          onValueChange={(v) => (itemType.value = v)}
        >
          <SelectTrigger className="col-span-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="extension">Extension</SelectItem>
            <SelectItem value="domain">Domain</SelectItem>
          </SelectContent>
        </Select>
        <div className="col-span-5">
          {itemType.value === "extension" ? (
            <ExtensionSelect
              extensions={props.extensions}
              onSelected={(id) => (itemValue.value = id)}
            />
          ) : (
            <Input placeholder="twitter.com" onChange={(e) => (itemValue.value = e.target.value)} />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Button size="sm" className="w-fit px-5" onClick={submit}>
          Block
        </Button>
      </div>
    </div>
  );
};

export default BlockForm;

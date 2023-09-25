import { BlockedItem, unblock } from "@/lib/rules";
import { getFaviconUrl } from "@/lib/utils";
import { Unlock } from "lucide-react";
import { useMemo } from "preact/hooks";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const BlockedItemCard = ({ item }: { item: BlockedItem }) => {
  const [name, icon] = useMemo(() => {
    if (item.type === "domain") {
      return [item.value, getFaviconUrl(item.value)];
    }
    return [item.name, item.icon];
  }, [item]);

  const unblockItem = () => {
    unblock(item.value);
    location.reload();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex flex-row justify-between items-center w-full">
          <Badge variant="secondary">{item.type}</Badge>
          <Unlock size={13} className="cursor-pointer" title="Unblock" onClick={unblockItem} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <div className="border border-solid border-gray-200 rounded-sm p-1">
            <img className="w-6 h-6" src={icon} />
          </div>
          <span className="text-xl font-bold leading-none">{name}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockedItemCard;

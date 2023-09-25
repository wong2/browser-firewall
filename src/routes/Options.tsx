import BlockForm from "@/components/BlockForm";
import icon from "@/assets/icon.png";
import BlockedItemCard from "@/components/BlockedItemCard";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BlockedItem, getBlockedItems } from "@/lib/rules";
import { useLoaderData } from "react-router-dom";
import Browser from "webextension-polyfill";
import { Extension } from "../types";

type LoaderData = {
  extensions: Extension[];
  blockedItems: BlockedItem[];
};

export async function loadAll(): Promise<LoaderData> {
  const [exts, blockedItems] = await Promise.all([Browser.management.getAll(), getBlockedItems()]);
  return {
    extensions: exts.filter((ext) => ext.installType === "normal" && ext.enabled),
    blockedItems,
  };
}

function OptionsPage() {
  const { extensions, blockedItems } = useLoaderData() as LoaderData;
  return (
    <div className="px-10 py-5 container">
      <div className="flex flex-row items-center gap-4 pb-8">
        <img src={icon} className="w-6 h-6 rounded" />
        <h1 className="font-black text-2xl">Browser Firewall</h1>
      </div>
      {blockedItems.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blockedItems.map((item) => (
              <BlockedItemCard item={item} key={item.value} />
            ))}
          </div>
          <Separator className="my-8" />
        </>
      )}
      <Card className="max-w-[500px] pt-8">
        <CardContent>
          <BlockForm extensions={extensions} />
        </CardContent>
      </Card>
    </div>
  );
}

export default OptionsPage;

import Browser from "webextension-polyfill";
import { last } from "remeda";

const RULE_ID = 1;
const EXT_ID_REGEX = /[a-p0-9]{32}/;

async function getBlockedDomains() {
  const rules = await Browser.declarativeNetRequest.getDynamicRules();
  return rules.flatMap((rule) => {
    return rule.condition.initiatorDomains || [];
  });
}

async function updateRules(blockedDomains: string[]) {
  if (blockedDomains.length === 0) {
    return Browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
    });
  }
  return Browser.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID],
    addRules: [
      {
        id: RULE_ID,
        action: { type: "block" },
        condition: {
          initiatorDomains: blockedDomains,
          resourceTypes: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "object",
            "xmlhttprequest",
            "font",
            "media",
            "websocket",
            "csp_report",
            "other",
          ],
        },
      },
    ],
  });
}

export async function block(domain: string) {
  const blockedDomains = new Set(await getBlockedDomains());
  blockedDomains.add(domain);
  await updateRules(Array.from(blockedDomains));
}

export async function unblock(domain: string) {
  const blockedDomains = new Set(await getBlockedDomains());
  blockedDomains.delete(domain);
  await updateRules(Array.from(blockedDomains));
}

export type BlockedItem =
  | {
      type: "domain";
      value: string;
    }
  | {
      type: "extension";
      value: string;
      name: string;
      icon?: string;
    };

export async function getBlockedItems(): Promise<BlockedItem[]> {
  const rules = await Browser.declarativeNetRequest.getDynamicRules();
  const rawsItems = rules.flatMap((rule) => {
    const initiatorDomains = rule.condition.initiatorDomains || [];
    return initiatorDomains.map((domain) => ({
      type: EXT_ID_REGEX.test(domain) ? "extension" : "domain",
      value: domain,
    }));
  });
  return Promise.all(
    rawsItems.map(async (item) => {
      if (item.type === "domain") {
        return { type: "domain", value: item.value };
      }
      const ext = await Browser.management.get(item.value);
      return {
        type: "extension",
        value: ext.id,
        name: ext.name,
        icon: ext.icons && last(ext.icons)?.url,
      };
    })
  );
}

import { client } from "@/lib/client";
import { draftMode } from "next/headers";

async function getFooterItems() {
  const { isEnabled } = draftMode();
  const entries = await client.footerItemGroup({
    preview: isEnabled,
  });

  return extractFooterItemEntries(entries) || [];
}

function extractFooterItemEntries(fetchResponse: any) {
  return fetchResponse?.footerItemGroupCollection?.items?.[0];
}

export default async function getAllFooteritemsForHome() {
  const footeritems = await getFooterItems();

  return footeritems || [];
}

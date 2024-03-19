import { client } from "@/lib/client";
import { draftMode } from "next/headers";

async function getMenuItems() {
  const { isEnabled } = draftMode();
  const entries = await client.navItemGroup({
    preview: isEnabled,
  });

  return extractNavItemEntries(entries) || [];
}

function extractNavItemEntries(fetchResponse: any) {
  return fetchResponse?.navItemGroupCollection?.items?.[0].navItemsCollection
    ?.items;
}

export default async function getAllNavitemsForHome() {
  const navitems = await getMenuItems();

  return navitems || [];
}

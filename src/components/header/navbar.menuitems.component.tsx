import { client } from "@/lib/client";
import { draftMode } from "next/headers";

async function getMenuItems(locale: string) {
  const { isEnabled } = draftMode();
  const entries = await client.navItemGroup({
    locale: locale,
    preview: isEnabled,
  });

  return extractNavItemEntries(entries) || [];
}

function extractNavItemEntries(fetchResponse: any) {
  return fetchResponse?.navItemGroupCollection?.items?.[0].navItemsCollection
    ?.items;
}

export default async function getAllNavitemsForHome(locale: string) {
  const navitems = await getMenuItems(locale);

  return navitems || [];
}

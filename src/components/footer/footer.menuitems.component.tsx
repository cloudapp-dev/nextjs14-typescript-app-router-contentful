import { client } from "@/lib/client";
import { draftMode } from "next/headers";

async function getFooterItems(locale: string) {
  const { isEnabled } = draftMode();
  const entries = await client.footerItemGroup({
    locale: locale,
    preview: isEnabled,
  });

  return extractFooterItemEntries(entries) || [];
}

function extractFooterItemEntries(fetchResponse: any) {
  return fetchResponse?.footerItemGroupCollection?.items?.[0];
}

export default async function getAllFooteritemsForHome(locale: string) {
  const footeritems = await getFooterItems(locale);

  return footeritems || [];
}

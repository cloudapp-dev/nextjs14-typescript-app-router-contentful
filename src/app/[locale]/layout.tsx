import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { draftMode } from "next/headers";
import "@/app/globals.css";
import Header from "@/components/header/header.component";
import Footer from "@/components/footer/footer.component";
import { Providers } from "@/components/header/providers";
import getAllNavitemsForHome from "@/components/header/navbar.menuitems.component";
import getAllFooteritemsForHome from "@/components/footer/footer.menuitems.component";
import ExitDraftModeLink from "@/components/header/draftmode/ExitDraftModeLink.component";
import { locales } from "@/app/i18n/settings";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Example Blog",
  description: "Your Example Blog Description",
};

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function Layout({ children, params }: LayoutProps) {
  const locale = params.locale;
  const headerdata = await getAllNavitemsForHome(locale);
  const footerdata = await getAllFooteritemsForHome(locale);

  return (
    <main className={`${urbanist.variable} font-sans dark:bg-gray900`}>
      <Providers>
        <Header menuItems={headerdata} />
        {draftMode().isEnabled && (
          <p className="bg-emerald-400 py-4 px-[6vw]">
            Draft mode is on! <ExitDraftModeLink className="underline" />
          </p>
        )}
        {children}
        <Footer footerItems={footerdata} />
      </Providers>
    </main>
  );
}

import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import Header from "@/components/header/header.component";
import Footer from "@/components/footer/footer.component";
import { Providers } from "@/components/header/providers";
import getAllNavitemsForHome from "@/components/header/navbar.menuitems.component";
import getAllFooteritemsForHome from "@/components/footer/footer.menuitems.component";
import ExitDraftModeLink from "@/components/header/draftmode/ExitDraftModeLink.component";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

export const metadata: Metadata = {
  title: "Create Cloudapp.dev Example App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerdata = await getAllNavitemsForHome();
  const footerdata = await getAllFooteritemsForHome();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className={`${urbanist.variable} font-sans dark:bg-gray-900`}>
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
      </body>
    </html>
  );
}

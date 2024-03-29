import "./globals.css";

export const metadata = {
  title: "Example Blog",
  description: "Your Example Blog Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>{children}</body>
    </html>
  );
}

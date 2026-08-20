import "./globals.css";

export const metadata = {
  title: "PetCare",
  description: "PetCare Website"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
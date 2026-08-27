import "./globals.css";

export const metadata = {
  title: "Portofolio Website",
  description: "Website portofolio interaktif bertema Space/Cosmic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}

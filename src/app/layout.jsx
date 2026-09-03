import "./globals.css";

export const metadata = {
  title: "Rifqi Muhammad Aliya",
  description: "Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

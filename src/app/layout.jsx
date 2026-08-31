import "./globals.css";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";

export const metadata = {
  title: "Portofolio Website",
  description: "Website portofolio interaktif bertema Space/Cosmic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-black text-white antialiased">
        <AnimatedBackground className="fixed inset-0 -z-10" starCount={180} />
        {children}
      </body>
    </html>
  );
}

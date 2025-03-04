// app/layout.tsx
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen h-screen bg-gradient-to-b from-blue-300 to-blue-500 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center text-inherit">
          {children}
        </div>
      </body>
    </html>
  );
}
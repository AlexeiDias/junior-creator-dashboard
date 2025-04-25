export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-white text-gray-800">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">👨‍🎓 Student Portal</h1>
          </div>
          <main className="p-6">{children}</main>
        </body>
      </html>
    );
  }
  
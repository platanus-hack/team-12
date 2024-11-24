import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ParentDashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Control Parental</h1>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

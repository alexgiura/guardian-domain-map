import { useState } from "react";
import TopBar from "@/components/TopBar";
import DomainTable from "@/components/DomainTable";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "domains">("domains");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === "dashboard" ? <Dashboard /> : <DomainTable />}
      </main>
    </div>
  );
};

export default Index;

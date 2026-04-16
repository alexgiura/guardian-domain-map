import { useState } from "react";
import TopBar from "@/components/TopBar";
import DomainTable from "@/components/DomainTable";
import Dashboard from "@/components/Dashboard";
import ImportPage from "@/components/ImportPage";
import TrafficTable from "@/components/TrafficTable";
import LoginPage from "@/components/LoginPage";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "domains" | "import" | "traffic">("domains");

  if (!isLoggedIn) {
    return <LoginPage onLogin={(user) => { setUsername(user); setIsLoggedIn(true); }} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} username={username} onLogout={() => { setIsLoggedIn(false); setUsername(""); }} />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "domains" && <DomainTable />}
        {activeTab === "import" && <ImportPage />}
        {activeTab === "traffic" && <TrafficTable />}
      </main>
    </div>
  );
};

export default Index;

import { TopBar } from "@/components/top-bar";
import { DashboardTools } from "@/components/dashboard-tools";

export default function DashboardPage() {
  return (
    <>
      <TopBar
        title="Dashboard"
        description="Select a tool to get started with media processing."
      />
      <div className="flex-1 p-6 lg:p-8">
        <DashboardTools />
      </div>
    </>
  );
}

import { TopBar } from "@/components/top-bar";
import { DashboardTools } from "@/components/dashboard-tools";

export default function DashboardPage() {
  return (
    <>
      <TopBar
        title="Panel Principal"
        description="Selecciona una herramienta para comenzar con el procesamiento de medios."
      />
      <div className="flex-1 p-6 lg:p-8">
        <DashboardTools />
      </div>
    </>
  );
}

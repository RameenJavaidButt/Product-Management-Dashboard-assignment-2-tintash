import { useState } from "react";
import Navbar from "../components/Navbar";
import MainGrid from "../components/MainGrid";
import SidePanel from "../components/SidePanel";
import { useProducts } from "../hooks/useProducts";
 
export default function HomePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { data, isLoading, error, refetch } = useProducts();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onAddClick={() => setIsPanelOpen(true)} onRefetch={refetch} />

      <MainGrid />

      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
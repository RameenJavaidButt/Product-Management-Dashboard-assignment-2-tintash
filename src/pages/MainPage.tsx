import { useState } from 'react';
import Navbar from '../components/Navbar';
import MainGrid from '../components/MainGrid';
import SidePanel from '../components/SidePanel';
import { useDispatch } from 'react-redux';
import {
  restoreStateFromLocalStorage,
  restoreApiProducts,
} from '../store/productsSlice';
import { toast } from 'sonner';

export default function HomePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRefetch = () => {
    dispatch(restoreStateFromLocalStorage());
    toast.success('Products reloaded from localStorage');
  };

  const handleRestore = () => {
    dispatch(restoreApiProducts());
    toast.success('API products restored');
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        onAddClick={() => setIsPanelOpen(true)}
        onRefresh={handleRefetch}
        onRefetch={handleRestore}
      />

      <MainGrid />

      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </div>
  );
}

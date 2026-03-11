interface NavbarProps {
  onAddClick: () => void;
  onRefresh: () => void;
  onRefetch: () => void;
}

export default function Navbar({
  onAddClick,
  onRefresh,
  onRefetch,
}: NavbarProps) {
  return (
    <div className="w-full h-25 bg-gray-900 text-white flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Product Management Dashboard</h1>
      <div className="flex gap-3">
        <button
          onClick={onAddClick}
          className="bg-blue-800 hover:bg-blue-900 px-4 py-1 rounded"
        >
          Add Product
        </button>
        <button
          onClick={() => onRefresh()}
          className="bg-blue-800 hover:bg-blue-900 px-4 py-1 rounded"
        >
          Refresh Products
        </button>
        <button
          onClick={() => onRefetch()}
          className="bg-green-700 hover:bg-green-800 px-4 py-1 rounded"
        >
          Restore API Products
        </button>
      </div>
    </div>
  );
}

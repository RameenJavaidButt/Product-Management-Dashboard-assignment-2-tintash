interface NavbarProps {
    onAddClick: () => void;
    onRefetch: () => void;
}

export default function Navbar({ onAddClick, onRefetch }: NavbarProps) {
    return (
        <div className="w-full h-20 bg-gray-900 text-white flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold">Product Management Dashboard</h1>
            <div className="flex gap-3">
                <button
                    onClick={onAddClick}
                    className="bg-blue-800 hover:bg-blue-900 px-4 py-1 rounded"
                >
                    Add Product
                </button>
                <button onClick={() => onRefetch()}
                    className="bg-blue-800 hover:bg-blue-900 px-4 py-1 rounded">
                    Refetch Products
                </button>
            </div>
        </div>
    );
}
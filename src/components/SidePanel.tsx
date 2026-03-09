import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useState } from "react";
interface SidePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SidePanel({ isOpen, onClose }: SidePanelProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const products = useSelector((state: RootState) => state.products.items);

    const uniqueCategories = [
        ...new Set(products.map((product) => product.category.toLowerCase()))
    ].sort();
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40"
                    onClick={onClose}
                >

                </div>
            )}

            {/* Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-gray-800 shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-6">
                    <div className="flex justify-between gap-4 ">
                        <h2 className="text-xl text-white font-semibold mb-4">Add Details for the Product</h2>


                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-600"
                        >
                            x
                        </button>
                    </div>
                    <p className="text-gray-300">All the fields are required. </p>
                    <form >
                        <div className="text-gray-300 flex flex-col justify-between gap-3 p-2 mt-8">
                            <label > Title</label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="p-2 rounded border border-gray-300 maxlength-10 minlength-5"
                                type='text'
                                required
                                placeholder='Enter' />

                            <label > Price</label>
                            <input
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className="p-2 rounded border border-gray-300" type='text' required placeholder='Enter Price' />


                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required
                            >
                            <label>Category</label>
                            
                                <option className="text-gray-900 bg-gray-400" value="">Select Category</option>

                                {/*mapping through unique categories */}
                                {uniqueCategories.map((category, index) => (
                                    <option key={index} value={category} className="capitalize text-gray-900 bg-gray-400">
                                        {category}
                                    </option>
                                ))}
                                
                            </select>

                            <label >Description</label>
                            <textarea

                                id="description"
                                name="description"
                                rows={4} //set the initial visible height
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Write your decription here..."
                                className="p-2 rounded border border-gray-300"
                                required
                            />


                            <label >Image URL</label>
                            <input
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                className="p-2 rounded border border-gray-300"
                                type='url'
                                required />


                            <button
                                //onClick={onClose}
                                type="submit"
                                className="px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-600 mt-"
                            >
                                Done
                            </button>
                        </div>
                    </form>



                </div >
            </div >
        </>
    );
}
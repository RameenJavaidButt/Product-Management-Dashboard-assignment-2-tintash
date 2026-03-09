import { useProducts } from "../hooks/useProducts";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/productsSlice";
import { useState } from "react";

/*
First fetch data from API
  ↓
React Query (useProducts)
  ↓
useEffect (used to store data in store)
  ↓
Redux store (setProduct susing dispatch)
  ↓
useSelector
*/

export default function MainGrid() {



    const { data, isLoading, isError } = useProducts();
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [price, setPrice] = useState("");


    const products = useSelector((state: RootState) => state.products.items);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) dispatch(setProducts(data));
    }, [data, dispatch]);
    {/*get unique categories and sort them */ }

    const uniqueCategories = [
        ...new Set(products.map((product) => product.category.toLowerCase()))
    ].sort();


    {/*get unique price and sort them */ }

    const uniquePrice = [
        ...new Set(products.map((product) => product.price))
    ].sort((a, b) => a - b);

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error fetching products.</p>;

const filteredProducts = products
  ?.filter((p) =>
    category ? p.category === category : true
  )
  .filter((p) =>
    search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
  )
  .sort((a, b) => {
    if (price === "low-to-high") return a.price - b.price;
    if (price === "high-to-low") return b.price - a.price;
    return 0;
  });


    return (
        <>
            <div className="bg-gray-300 p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 ">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className=" bg-gray-100 flex-1 p-2  rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"

                        placeholder="Search Products..." />


                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}

                        className="bg-gray-100 flex-1 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All Categories</option>

                        {/* mapping through unique categories */}
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category} className="capitalize">
                                {category}
                            </option>
                        ))}
                    </select>



                    <select
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-gray-100 flex-1 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Sort By Price</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>

                        {/* mapping through unique price */}
                        {uniquePrice.map((price, index) => (
                            <option key={index} value={price}>
                                ${price.toFixed(2)}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts?.map((product) => (
                        <div key={product.id} className="bg-gray-100 border rounded p-6 text-center text-gray-500">
                            <img src={product.image} alt={product.title} className="h-40 mx-auto mb-6" />
                            <h3 className="font-bold text-black">{product.title}</h3>
                            <p className="font-bold text-gray-700">${product.price}</p>
                            <p className="text-gray-700 capitalize">{product.category}</p>
                            <p className="text-gray-700 ">Rating {product.rating.rate} </p>

                            <button
                                //onClick={() => refetch()}
                                className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
                            >
                                Delete Product
                            </button>

                        </div>
                    ))}

                </div>










            </div>



        </>





    );

}

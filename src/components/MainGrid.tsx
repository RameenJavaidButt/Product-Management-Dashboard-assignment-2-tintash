import { useProducts } from "../hooks/useProducts";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, setProducts } from "../store/productsSlice";
import { useState } from "react";
import { uniqueCategories } from "../utils/uniqueCategories";
import { filteredProducts } from "../utils/filteredProducts";
import { sortByPrice } from "../utils/sortByPrice";
import { formattedCategory } from '../utils/formattedCategory'
import { toast } from 'sonner';
import { Link } from "react-router-dom";

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

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error fetching products.</p>;
    {/**ask abt this placing */ }

    const products = useSelector((state: RootState) => state.products.items);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) dispatch(setProducts(data));
    }, [data, dispatch]);


    {/*get unique categories and sort them */ }

    const uniqueCategory = uniqueCategories(products);


    {/*get unique price and sort them */ }





    const filteredProduct = filteredProducts(products, category, search)
    const sortedProducts = sortByPrice(filteredProduct, price)

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
                        {uniqueCategory.map((category, index) => (



                            <option key={index} value={category}>

                                {formattedCategory(category)}
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

                        { /*
                        uniquePrice.map((price, index) => (
                            <option key={index} value={price}>
                                ${price.toFixed(2)}
                            </option>
                        ))*/}
                    </select>

                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
                    {sortedProducts?.map((product) => (
                        <Link to={`/project/${product.id}`} key={product.id}>
                            <div className="bg-gray-100 border rounded p-6 text-center text-gray-500 flex flex-col justify-between h-full">
                                {/*flex flex-col justify-between → lays out the card content vertically and pushes the first item 
                                to the top and the last item (button) to the bottom. h-full → makes this card div stretch to the full 
                                height of its grid cell */}
                                <img src={product.image} alt={product.title} className="h-40 mx-auto mb-6" />
                                <h3 className="font-bold text-black">{product.title}</h3>
                                <p className="font-bold text-gray-700">${product.price}</p>
                                <p className="text-gray-700 capitalize">{product.category}</p>
                                <p className="text-gray-700 ">Rating {product.rating.rate} ({product.rating.count} reviews) </p>

                                <button
                                    /*button clicked, action dispatched,remove from store,mainGrid rerenders, automatic refetch*/
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
                                            dispatch(deleteProduct(product.id))
                                            toast.error('Product removed', {
                                                description: 'The item is now removed from your store.',
                                                //className: 'bg-white border-green-500 text-green-700',
                                            });
                                        }

                                    }

                                    }
                                    className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
                                >
                                    Delete Product
                                </button>

                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </>

    );

}

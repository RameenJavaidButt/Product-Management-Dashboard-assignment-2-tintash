import { useProducts } from '../hooks/useProducts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteProduct,
  filterCategory,
  searchProduct,
  setProducts,
  sortbyPrice,
} from '../store/productsSlice';
import { uniqueCategories } from '../utils/uniqueCategories';
import { formattedCategory } from '../utils/formattedCategory';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { selectVisibleProducts,selectAllProducts } from '../store/selector';
import {restoreStateFromLocalStorage} from '../store/productsSlice'

export default function MainGrid() {
  const { data, isLoading, isError } = useProducts();
  const dispatch = useDispatch();
 
const visibleProducts = useSelector(selectVisibleProducts);
useEffect(() => {
  if (!data) return;
  dispatch(setProducts(data));
  dispatch(restoreStateFromLocalStorage());
  dispatch(searchProduct(""));
  dispatch(filterCategory(""));
  dispatch(sortbyPrice(""));

}, [data, dispatch]);
const allProducts = useSelector(selectAllProducts);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching products.</p>;

  const uniqueCategory = uniqueCategories(allProducts);

  return (
    <>
      <div className="bg-gray-300 p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 ">
          <input
            onChange={(e) => dispatch(searchProduct(e.target.value))}
            className=" bg-gray-100 flex-1 p-2  rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search Products..."
          />

          <select
            onChange={(e) => dispatch(filterCategory(e.target.value))}
            className="bg-gray-100 flex-1 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>

            {uniqueCategory.map((cat) => (
              <option key={cat} value={cat}>
                {formattedCategory(cat)}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => dispatch(sortbyPrice(e.target.value))}
            className="bg-gray-100 flex-1 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort By Price</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
          {visibleProducts?.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="bg-gray-100 border rounded p-6 text-center text-gray-500 flex flex-col justify-between h-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 mx-auto mb-6"
                />
                <h3 className="font-bold text-black">{product.title}</h3>
                <p className="font-bold text-gray-700">${product.price}</p>
                <p className="text-gray-700 capitalize">{product.category}</p>
                <p className="text-gray-700 ">
                  Rating {product.rating.rate} ({product.rating.count}{' '}
                  reviews){' '}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (
                      confirm(
                        `Are you sure you want to delete "${product.title}"?`
                      )
                    ) {
                      dispatch(deleteProduct(product.id));
                      toast.error('Product removed', {
                        description: 'The item is now removed from your store.',
                      });
                    }
                  }}
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

import type { Product } from "../types/product";
import { formattedCategory } from "../utils/formattedCategory";

interface ProductCardProps {
  product: Product;
  showBackButton?: boolean;
  onBackClick?: () => void;
}
export function ProductCardDetails({showBackButton,product,onBackClick}:ProductCardProps){
    return (
     <div className="p-6 max-w-4xl w-full mx-3 bg-white rounded shadow">
      {showBackButton && (
      <button
        onClick={onBackClick}
        className="mb-4 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded"
      >
        Back
      </button>
      )}

      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <img src={product.image} alt={product.title} className="h-60 mx-auto mb-4" />
      <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
      <p className="text-gray-700 mb-2"><strong>Category:</strong> {formattedCategory(product.category)}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {product.description}</p>
      <p className="text-gray-700 mb-2"><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
    </div>
    );
    

}
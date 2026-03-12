import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProductCardDetails } from '../components/ProductCardDetails';
import { selectAllProducts } from '../store/selector';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


const products = useSelector(selectAllProducts);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-6">
        <p>Product not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 text-white rounded bg-blue-800 hover:bg-blue-900"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ProductCardDetails
        product={product}
        showBackButton={true}
        onBackClick={() => navigate('/')}
      />
    </div>
  );
}

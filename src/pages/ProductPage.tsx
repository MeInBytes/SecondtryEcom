import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { RootState } from "../store";
import { addToCart } from "../store/reducers/cartSlice";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Product not found</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-96 p-8">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
              {product.category}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="ml-2 text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="mt-4 text-3xl font-bold text-gray-900">
              ${product.price}
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

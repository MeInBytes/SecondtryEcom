// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ShoppingCart, Plus, Minus } from "lucide-react";
// import { Product } from "../types";
// import { addToCart, removeFromCart } from "../store/reducers/cartSlice";
// import { RootState } from "../store/index"; // Ensure you import RootState

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const dispatch = useDispatch();

//   // Get the cart quantity for this product
//   const cartItem = useSelector((state: RootState) =>
//     state.cart.items.find((item) => item.id === product.id)
//   );

//   const quantity = cartItem ? cartItem.quantity : 0;

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   const increaseQuantity = () => {
//     dispatch(addToCart(product)); // Increase quantity in Redux store
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       dispatch(removeFromCart(product.id)); // Reduce quantity
//     } else if (quantity === 1) {
//       dispatch(removeFromCart(product.id)); // If quantity is 1, remove the item from the cart
//     }
//   };

//   // Calculate the total price based on quantity
//   const totalPrice = (product.price * quantity).toFixed(2);

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <Link to={`/product/${product.id}`}>
//         <div className="h-48 overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-full object-contain"
//           />
//         </div>
//       </Link>

//       <div className="p-4">
//         <Link to={`/product/${product.id}`}>
//           <h3 className="text-lg font-semibold mb-2 line-clamp-2">
//             {product.title}
//           </h3>
//         </Link>

//         <div className="flex items-center justify-between mb-2">
//           <span className="text-xl font-bold">
//             ${quantity > 0 ? totalPrice : product.price.toFixed(2)}{" "}
//             {/* Display total price if quantity > 0, else display base price */}
//           </span>
//           <div className="flex items-center">
//             <span className="text-yellow-400">★</span>
//             <span className="ml-1">{product.rating.rate}</span>
//           </div>
//         </div>

//         {quantity < 1 ? (
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-blue-600 text-white h-10 px-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
//           >
//             <ShoppingCart className="h-5 w-5 flex-shrink-0" />
//             <span className="text-sm font-medium whitespace-nowrap">
//               Add to Cart
//             </span>
//           </button>
//         ) : (
//           <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
//             <button
//               onClick={decreaseQuantity}
//               className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
//             >
//               <Minus className="h-5 w-5" />
//             </button>
//             <span className="text-sm font-medium">{quantity}</span>
//             <button
//               onClick={increaseQuantity}
//               className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
//             >
//               <Plus className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Product } from "../types";
import { addToCart, removeFromCart } from "../store/reducers/cartSlice";
import { RootState } from "../store/index"; // Ensure you import RootState

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  // Get the cart quantity for this product
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const increaseQuantity = () => {
    dispatch(addToCart(product)); // Increase quantity in Redux store
  };

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     dispatch(removeFromCart(product.id)); // Reduce quantity
  //   } else if (quantity === 1) {
  //     dispatch(removeFromCart(product.id)); // If quantity is 1, remove the item from the cart
  //   }
  // };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(removeFromCart(product.id)); // Decrease quantity by 1
    } else if (quantity === 1) {
      dispatch(removeFromCart(product.id)); // Remove the item if quantity is 1
    }
  };

  // Calculate the total price based on quantity
  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">
            ${quantity > 0 ? totalPrice : product.price.toFixed(2)}{" "}
            {/* Display total price if quantity > 0, else display base price */}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{product.rating.rate}</span>
          </div>
        </div>

        {/* Button Container */}
        <div className="mt-auto">
          {quantity < 1 ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white h-10 px-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              <ShoppingCart className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">
                Add to Cart
              </span>
            </button>
          ) : (
            <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
              <button
                onClick={decreaseQuantity}
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

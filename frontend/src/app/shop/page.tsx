"use client";

import Navigation from "@/components/Navigation";
import Image from "next/image";
import toast from "react-hot-toast";

// Mock products data
const mockProducts = [
  {
    _id: "1",
    name: "Coconut Bowl Set",
    price: 29.99,
    image: "/images/co-bowl.png",
    description: "Beautiful handcrafted coconut bowls",
  },
  {
    _id: "2",
    name: "Coconut Candle",
    price: 19.99,
    image: "/images/co-candle.png",
    description: "Eco-friendly coconut shell candles",
  },
  {
    _id: "3",
    name: "Coconut Spoon Set",
    price: 15.99,
    image: "/images/co-bowl-spoone.webp",
    description: "Natural coconut shell spoons",
  },
  {
    _id: "4",
    name: "Coconut Planter",
    price: 24.99,
    image: "/images/zigzag-planter-shop.svg",
    description: "Decorative coconut planters",
  },
];

export default function Shop() {
  const addToCart = (productId: string) => {
    toast.success(`Product ${productId} added to cart!`);
  };

  return (
    <div>
      <Navigation title={"Shop"} description="" tagline={""} description2="" />

      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-5">
              <h2 className="section-title">Our Products</h2>
            </div>
          </div>

          <div className="row">
            {mockProducts.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-6 mb-4 mb-lg-0"
              >
                <div className="product-item">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{product.name}</h3>
                  <strong className="product-price">${product.price}</strong>
                  <span
                    className="icon-cross"
                    onClick={() => addToCart(product._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      src="/images/cross.svg"
                      alt="Add to cart"
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

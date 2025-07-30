"use client";

import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Image from "next/image";

// Mock cart data
const mockCartItems = [
  {
    _id: "1",
    product: {
      _id: "1",
      name: "Coconut Bowl Set",
      price: 29.99,
      image: "/images/co-bowl.png",
    },
    quantity: 2,
  },
  {
    _id: "2",
    product: {
      _id: "2",
      name: "Coconut Candle",
      price: 19.99,
      image: "/images/co-candle.png",
    },
    quantity: 1,
  },
];

export default function Cart() {
  const router = useRouter();

  const calculateTotal = () => {
    return mockCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <Navigation title={"Cart"} tagline="" description="" description2="" />

      <div className="untree_co-section">
        <div className="container">
          <h2 className="section-title mb-4">Shopping Cart</h2>

          {mockCartItems.length === 0 ? (
            <div className="text-center">
              <h3>Your cart is empty</h3>
              <p>Add some products to your cart to get started!</p>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/shop")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                {mockCartItems.map((item) => (
                  <div key={item._id} className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-6">
                          <h5 className="card-title">{item.product.name}</h5>
                          <p className="card-text">${item.product.price}</p>
                        </div>
                        <div className="col-md-3">
                          <div className="d-flex align-items-center">
                            <span className="mx-2">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Total:</span>
                      <strong>${calculateTotal()}</strong>
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

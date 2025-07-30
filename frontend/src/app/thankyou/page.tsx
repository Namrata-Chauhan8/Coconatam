import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div>
      <Navigation
        title={"Thank You"}
        tagline=""
        description=""
        description2=""
      />

      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="bg-white p-5 rounded shadow">
                <div className="mb-4">
                  <i
                    className="fas fa-check-circle text-success"
                    style={{ fontSize: "4rem" }}
                  ></i>
                </div>

                <h2 className="mb-4">Thank You for Your Order!</h2>

                <p className="lead mb-4">
                  Your order has been successfully placed. We're excited to
                  prepare your eco-friendly coconut products for shipping.
                </p>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h5>Order Details</h5>
                    <p>Order #: COCO-2024-001</p>
                    <p>Total: $85.96</p>
                    <p>Estimated Delivery: 5-7 business days</p>
                  </div>
                  <div className="col-md-6">
                    <h5>What's Next?</h5>
                    <ul className="list-unstyled">
                      <li>✓ Order confirmed</li>
                      <li>⏳ Processing your items</li>
                      <li>📦 Shipping notification</li>
                      <li>🚚 Delivery to your door</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <p>
                    You'll receive an email confirmation with your order details
                    and tracking information.
                  </p>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link href="/shop" className="btn btn-primary me-md-2">
                    Continue Shopping
                  </Link>
                  <Link href="/" className="btn btn-outline-secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navigation
        title={"COCOनटम्"}
        description={
          "At COCOnutam, we turn humble coconut shells into premium,eco-friendly products that don't compromise on style or sustainability. From elegant bowls to handcrafted décor, every piece reflects our commitment to the planet and ethical craftsmanship."
        }
        tagline={"From Nature, For Nature - Welcome to Coconutam"}
      />

      {/* Product Categories Section */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-5">
              <h2 className="section-title">Our Products</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 mb-4 mb-lg-0">
              <div className="product-item">
                <Image
                  src="/images/co-bowl.png"
                  alt="Coconut Bowls"
                  width={300}
                  height={200}
                  className="img-fluid product-thumbnail"
                />
                <h3 className="product-title">Coconut Bowls</h3>
                <strong className="product-price">$29.00</strong>
                <span className="icon-cross">
                  <Image
                    src="/images/cross.svg"
                    alt="Add to cart"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 mb-4 mb-lg-0">
              <div className="product-item">
                <Image
                  src="/images/co-candle.png"
                  alt="Coconut Candles"
                  width={300}
                  height={200}
                  className="img-fluid product-thumbnail"
                />
                <h3 className="product-title">Coconut Candles</h3>
                <strong className="product-price">$19.00</strong>
                <span className="icon-cross">
                  <Image
                    src="/images/cross.svg"
                    alt="Add to cart"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

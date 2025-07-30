import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function About() {
  return (
    <div>
      <Navigation
        title={"About Us"}
        tagline=""
        description={
          "At Coconutam, we believe in turning waste into wonder. Founded with a deep respect for nature and a passion for sustainability, Coconutam is an eco-conscious brand committed to recycling coconut waste into beautiful, functional, and eco-friendly products."
        }
        description2={
          "Our mission is to create a greener world by transforming discarded coconut shells and husks into premium home, lifestyle, and personal care items. From handcrafted coconut bowls and eco-brushes to biodegradable planters and skincare products, every item we make tells a story of renewal, responsibility, and respect for the planet."
        }
      />

      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-title">About COCOनटम्</h2>
              <p>
                At COCOnutam, we believe in the power of nature and sustainable
                living. Our journey began with a simple idea: to transform
                humble coconut shells into beautiful, functional products that
                don't compromise on style or sustainability.
              </p>
              <p>
                Every piece in our collection is handcrafted with care,
                reflecting our commitment to the planet and ethical
                craftsmanship. From elegant bowls to handcrafted décor, each
                product tells a story of sustainability and beauty.
              </p>
              <p>
                We source our materials responsibly and work with local artisans
                to create products that are not only beautiful but also
                environmentally conscious. Our mission is to provide
                eco-friendly alternatives to everyday items while supporting
                sustainable practices.
              </p>
            </div>
            <div className="col-lg-5">
              <Image
                src="/images/about-work-image.svg"
                alt="About Us"
                width={400}
                height={300}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

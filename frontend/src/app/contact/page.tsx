"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Navigation
        title={"Contact Us"}
        description={
          "At Coconutam, we value connection as much as craftsmanship. Reach out to us for any inquiries—we’re always happy to help you live more sustainably."
        }
      />

      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="section-title">Contact Us</h2>
              <p>
                Have questions about our products or want to learn more about
                our sustainable practices? We'd love to hear from you!
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <h5>Address</h5>
                  <p>
                    123 Coconut Street
                    <br />
                    Eco City, EC 12345
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>Contact Info</h5>
                  <p>
                    Email: info@coconutam.com
                    <br />
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="mb-4">Send us a message</h4>

                {success && (
                  <div className="alert alert-success" role="alert">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

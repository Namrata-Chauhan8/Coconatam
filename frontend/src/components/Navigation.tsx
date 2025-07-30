"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { messages } from "@/constants/messages";
import { useRouter } from "next/navigation";

export default function Navigation({
  title,
  description,
  tagline = "",
  description2 = "",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check localStorage for token/user on mount
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success(messages?.logoutSuccess);
    router.replace("/login");
  };

  return (
    <>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          {/* <Link className="navbar-brand" href="/">
            <Image
              src="/images/white-transparent-logo.svg"
              alt="main-logo"
              width={120}
              height={40}
            />
          </Link> */}

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarsFurni"
          >
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item active">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" href="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="nav-link" href="/about">
                  About us
                </Link>
              </li>
              <li>
                <Link className="nav-link" href="/contact">
                  Contact us
                </Link>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              {isLoggedIn ? (
                <li
                  className={`nav-item dropdown${
                    userDropdownOpen ? " show" : ""
                  }`}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    aria-expanded={userDropdownOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      setUserDropdownOpen(!userDropdownOpen);
                    }}
                  >
                    <i className="fas fa-user me-2"></i>
                    <span>User</span>
                  </a>
                  <ul
                    className={`dropdown-menu${
                      userDropdownOpen ? " show" : ""
                    }`}
                  >
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link className="nav-link" href="/login">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                  </Link>
                </li>
              )}
              <li>
                <Link className="nav-link" href="/cart">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="intro-excerpt">
                <h1>{title}</h1>
                <p className="mb-2 tag-line">{tagline}</p>
                <p className="mb-4">{description}</p>
                <p>{description2}</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-12">
              <div className="hero-img-wrap">
                <Image
                  src="/images/hero-main-img.png"
                  alt="hero"
                  width={500}
                  height={500}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

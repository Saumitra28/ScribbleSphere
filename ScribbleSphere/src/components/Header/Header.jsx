import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData ? userData.name : null;
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : null;
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
  }, [authStatus, userData]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header
      className="py-3 shadow text-white"
      style={{
        background:
          "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
      }}
    >
      <Container>
        <nav className="flex align-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="140px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`border mx-2 inline-block px-8 py-2 duration-200 rounded-full ${
                      location.pathname === item.slug
                        ? "bg-blue-100 text-gray-800"
                        : "hover:bg-blue-100 hover:text-gray-800"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <>
                <li>
                  <LogoutBtn />
                </li>
                {firstLetter && (
                  <li
                    className="mx-2 relative" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="text-lg font-semibold bg-blue-900 rounded-2xl w-10 h-10 flex items-center justify-center">
                      {firstLetter}
                    </span>
                    {isHovered && (
                      <div
                        className="absolute top-12 left-0 text-white p-2 rounded-md shadow-lg"
                        style={{ backgroundColor: "rgb(36, 45, 57)" }}
                      >
                        Welcome, {userName}!
                      </div>
                    )}
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";

export default function Navbar({ user, logout }) {
  const [isHidden, setIsHidden] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Travels", path: "/travels" },
    { id: 4, name: "Contact", path: "/contact" },
  ];

  const handleNavClick = (to) => {
    navigate(to);
    setIsHidden(true);
    setShowProfile(false);
  };

  const handleLogout = async () => {
    await logout();

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-gray-100 font-sans w-full m-0">
      <div className="bg-slate-50 shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-2xl font-medium cursor-pointer ">
              <Link to={"/"}>
                <img src={logo} className="w-28" alt={"MyNextTrip"} />
              </Link>
            </h2>

            <div className="hidden sm:flex sm:items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={link.path}
                  className={`font-medium ${
                    link.path === location.pathname
                      ? "text-green-500"
                      : "text-green-800"
                  } `}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {!user ? (
              <div className="hidden sm:flex sm:items-center gap-2">
                <button
                  onClick={() => handleNavClick("/login")}
                  className={`text-sm font-semibold border px-4 py-2 rounded-lg ${
                    location.pathname === "/login"
                      ? "text-green-600 border-purple-600"
                      : "text-gray-800 hover:text-green-600 hover:border-purple-600"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick("/signup")}
                  className={`text-sm font-semibold border px-4 py-2 rounded-lg ${
                    location.pathname === "/signup"
                      ? "text-green-600 border-purple-600"
                      : "text-gray-800 hover:text-green-600 hover:border-purple-600"
                  }`}
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div
                className="relative cursor-pointer "
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="w-9 h-8 rounded-full overflow-hidden">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-full h-full"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl text-gray-700"
                    />
                  )}
                </div>
                {showProfile && (
                  <div className="absolute w-60 right-0 text-center top-8 bg-green-500 backdrop-blur-3xl py-4 px-2 text-white rounded-l-2xl rounded-br-2xl flex justify-center items-center flex-col z-50">
                    <div
                      onClick={() => handleNavClick("/profile")}
                      className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mb-5 flex justify-center items-center"
                    >
                      {user.profilePic ? (
                        <img
                          className="w-full h-full"
                          src={user.profilePic}
                          alt={user.name}
                        />
                      ) : (
                        <FontAwesomeIcon className="text-6xl" icon={faUser} />
                      )}
                    </div>
                    <ul className="flex flex-col gap-3">
                      <li>
                        <button
                          onClick={() => handleNavClick("/profile")}
                          className="bg-green-800 py-1 px-4"
                        >
                          {user.name}
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout &nbsp;
                          <FontAwesomeIcon icon={faSignOut} />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div
              className="sm:hidden cursor-pointer"
              onClick={() => setIsHidden(!isHidden)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-600"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.95 17c-.23 1.14-1.24 2-2.45 2s-2.22-.86-2.45-2H3.5a.5.5 0 0 1 0-1h4.55c.23-1.14 1.24-2 2.45-2s2.22.86 2.45 2h7.55a.5.5 0 0 1 0 1h-7.55ZM18.95 12c-.23 1.14-1.24 2-2.45 2s-2.22-.86-2.45-2H3.5a.5.5 0 0 1 0-1h10.55c.23-1.14 1.24-2 2.45-2s2.22.86 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55ZM9.95 7C9.72 8.14 8.71 9 7.5 9S5.28 8.14 5.05 7H3.5a.5.5 0 0 1 0-1h1.55c.23-1.14 1.24-2 2.45-2s2.22.86 2.45 2h11.05a.5.5 0 0 1 0 1H9.95Z"
                />
              </svg>
            </div>
          </div>

          {!isHidden && (
            <div className="block sm:hidden bg-white border-t-2 py-2">
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    to={link.path}
                    className={`font-medium ${
                      link.path === location.pathname
                        ? "text-green-500"
                        : "text-green-800"
                    } `}
                  >
                    {link.name}
                  </Link>
                ))}
                {!user ? (
                  <div className="flex justify-between items-center border-t-2 pt-2">
                    <button
                      onClick={() => handleNavClick("/")}
                      className="text-sm font-semibold mr-4 text-gray-800 hover:text-orange-600"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => handleNavClick("/signup")}
                      className="text-sm font-semibold border px-4 py-1 rounded-lg text-gray-800 hover:text-green-600 hover:border-purple-600"
                    >
                      Sign up
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={() => handleNavClick("/profile")}
                      className="w-full py-2 text-sm font-medium text-white bg-green-500 rounded-lg mb-2"
                    >
                      {user.name}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

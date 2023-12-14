import { Link } from "react-router-dom";
import { SignInForm } from "./modals/SignInForm";
import { RegisterForm } from "./modals/RegisterForm";
import { useModal } from "../context/ModalContext";
import { useGlobal } from "../context/GlobalContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export function Navbar() {
  const { openModal } = useModal();
  const { isMenuOpen, toggleMenuOpen, isDarkMode } = useGlobal();
  return (
    <>
      <nav
        className={`hidden md:flex justify-around border-b ${
          !isDarkMode ? "border-b-primary" : "border-b-primary-dark"
        } p-5`}
      >
        <div className="flex gap-3">
          <Link className="navbarButton" to={"/"}>
            אזור אישי
          </Link>
          <Link className="navbarButton" to={"/blogs"}>
            בלוגים
          </Link>
          <Link className="navbarButton" to={"/contact"}>
            צור קשר
          </Link>
        </div>
        <Link className="title navbarButton flex justify-center" to={"/"}>
          Rozi Blogi
        </Link>
        <div className="flex gap-3">
          <button
            onClick={() => openModal(<SignInForm />)}
            className="navbarButton"
          >
            התחבר
          </button>
          <button
            onClick={() => openModal(<RegisterForm />)}
            className="navbarButton"
          >
            הרשם
          </button>
        </div>
      </nav>
      <div
        className={
          isMenuOpen
            ? `fixed md:hidden  ${
                !isDarkMode
                  ? "bg-[rgba(0,0,0,0.5)]"
                  : "bg-[rgba(255,255,255,0.2)]"
              } top-0 bottom-0 right-0 transition-all ${
                !isMenuOpen ? "left-auto" : "left-0"
              }`
            : ""
        }
      >
        <div className="p-2">
          <nav
            className={`md:hidden flex justify-between border-b transition-all ${
              !isDarkMode ? "border-b-primary" : "border-b-primary-dark"
            } p-5`}
          >
            <div className="flex gap-3">
              <button className="z-40" onClick={toggleMenuOpen}>
                {!isMenuOpen ? <RxHamburgerMenu /> : <IoMdClose />}{" "}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(<SignInForm />)}
                  className="navbarButton"
                >
                  התחבר
                </button>
                <button
                  onClick={() => openModal(<RegisterForm />)}
                  className="navbarButton"
                >
                  הרשם
                </button>
              </div>
            </div>
            <Link className="title navbarButton " to={"/"}>
              Rozi Blogi
            </Link>
          </nav>
          {isMenuOpen && (
            <div
              className={`flex md:hidden h-screen w-screen justify-center items-center top-0 right-0 transition-all  ${
                isMenuOpen ? "left-auto" : "left-0"
              }`}
            >
              <div className="flex flex-col gap-3">
                <Link className="navbarButton" to={"/"}>
                  אזור אישי
                </Link>
                <Link className="navbarButton" to={"/blogs"}>
                  בלוגים
                </Link>
                <Link className="navbarButton" to={"/contact"}>
                  צור קשר
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// <div className="fixed bg-[rgba(0,0,0,0.5)] top-0 bottom-0 left-0 right-0 z-30 flex justify-center items-center ">

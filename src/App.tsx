import { Routes, Route } from "react-router-dom";
import { PrivateArea } from "./Pages/PrivateArea";
import { BlogsPage } from "./Pages/BlogsPage";
import { Navbar } from "./components/Navbar";
import { ContactUsPage } from "./Pages/ContactUsPage";
import { CustomModal, useModal } from "./context/ModalContext";
import { useGlobal } from "./context/GlobalContext";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

function App() {
  const { closeModal, childrenModal } = useModal();
  const { toggleDarkMode, isDarkMode } = useGlobal();

  return (
    <div className="h-screen w-screen bg text">
      <button className="absolute top-1 right-2 z-50" onClick={toggleDarkMode}>
        {!isDarkMode ? (
          <IoSunnyOutline size={22} />
        ) : (
          <FaMoon size={22} color={"white"} />
        )}
      </button>
      {childrenModal && (
        <CustomModal childrenModal={childrenModal} closeModal={closeModal} />
      )}
      <header>
        <Navbar />
      </header>
      <div className="max-w-5xl m-auto">
        <Routes>
          <Route path="/" element={<PrivateArea />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

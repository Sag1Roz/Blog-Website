import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { TbWriting } from "react-icons/tb";
import { GoProjectRoadmap } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { HiLogout } from "react-icons/hi";
import { useModal } from "../context/ModalContext";
import { Logout } from "../components/modals/Logout";

export function SettingPage() {
  const { openModal } = useModal();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-3  justify-center items-center gap-8">
        <Link className="settingBox" to={"/setting/editProfile"}>
          <div>
            <div className="flex justify-center">
              <FaUserEdit />
            </div>
            <p>עריכת פרופיל</p>
          </div>
        </Link>

        <Link className="settingBox" to={"/setting/writeArticle"}>
          <div>
            <div className="flex justify-center">
              <TbWriting />
            </div>
            <p>כתיבת מאמר</p>
          </div>
        </Link>
        <Link className="settingBox" to={"/setting/yourArticles"}>
          <div>
            <div className="flex justify-center">
              <GoProjectRoadmap />
            </div>
            <p>העבודות שלך</p>
          </div>
        </Link>
        <Link className="settingBox" to={"/setting/yourBookmarks"}>
          <div>
            <div className="flex justify-center">
              <CiBookmark />
            </div>
            <p>העבודות המועדפות עלייך </p>
          </div>
        </Link>
        <button onClick={() => openModal(<Logout />)} className="settingBox">
          <div>
            <div className="flex justify-center">
              <HiLogout />
            </div>
            <p>התנתקות</p>
          </div>
        </button>
      </div>
    </div>
  );
}

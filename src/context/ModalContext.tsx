import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useGlobal } from "./GlobalContext";
import { IoMdClose } from "react-icons/io";

type modalType = {
  openModal: (newChildren: ReactNode) => void;
  closeModal: () => void;
  childrenModal?: ReactNode;
};

type customModalProps = {
  closeModal: () => void;
  childrenModal: ReactNode;
};

const ModalContext = createContext({} as modalType);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [childrenModal, setChildrenModal] = useState<ReactNode | null>(null);

  function openModal(newChildren: ReactNode) {
    setChildrenModal(newChildren);
  }

  function closeModal() {
    setChildrenModal(null);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, childrenModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function CustomModal({ childrenModal, closeModal }: customModalProps) {
  const { isDarkMode } = useGlobal();
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Enter") closeModal();
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [closeModal]);
  return createPortal(
    <div className="fixed bg-[rgba(0,0,0,0.5)] top-0 bottom-0 left-0 right-0 z-30 flex justify-center items-center ">
      <div className="relative">
        <button
          className={`absolute left-2 top-1 `}
          onClick={() => closeModal()}
        >
          <IoMdClose color={`${isDarkMode ? "white" : ""}`} />
        </button>
        {childrenModal}
      </div>
    </div>,
    document.getElementById("modal-container")!
  );
}

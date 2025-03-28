import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //  close modal on outside window click
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleOverlayClick}
    >
      <div className="w-86 rounded-lg bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between pb-0">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-gray-100 font-extrabold hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

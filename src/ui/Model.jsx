// components/ui/Modal.jsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useClickOutside from '../hooks/useClickOutside'; // Import custom hook

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null); // Ref cho container modal

  // Đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Ngăn cuộn trang khi modal mở
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto'; // Khôi phục cuộn trang
    };
  }, [isOpen, onClose]);

  // Sử dụng custom hook để xử lý nhấp bên ngoài
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <div
        ref={modalRef}
        className="relative max-h-[100vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

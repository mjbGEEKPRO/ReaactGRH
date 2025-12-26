import React, { useState, useEffect } from "react";
import Modal from "../utils/modal";
import { authUtils } from "../utils/redirectionForm";

export default function LogoutManager() {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    // on attache un callback dans authUtils
    authUtils.showLogoutModal = (title, message, onConfirm) => {
      setModal({
        isOpen: true,
        title,
        message,
        onConfirm,
      });
    };
  }, []);

  const handleConfirm = () => {
    modal.onConfirm?.();
    setModal({ ...modal, isOpen: false });
window.location.href = "/";  };

  return (
    <Modal
      isOpen={modal.isOpen}
      title={modal.title}
      message={modal.message}
      onConfirm={handleConfirm}
      onClose={() => setModal({ ...modal, isOpen: false })}
    />
  );
}
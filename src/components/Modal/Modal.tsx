import React, { ReactNode, useEffect } from "react";
import cls from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Блокируем скролл страницы
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`${cls.modalOverlay}`} onClick={onClose}>
            <div className={`${cls.modalContent}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${cls.modalHeader}`}>
                    {title && <h3>{title}</h3>}
                    <button className={`${cls.modalClose}`} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={`${cls.modalBody}`}>{children}</div>
            </div>
        </div>
    );
};
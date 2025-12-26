import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles/Modal.module.scss';
import { motion } from 'framer-motion';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  beforeClose?: () => boolean | Promise<boolean>;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
};

function Header({ children }: { children: ReactNode }) {
  return <div className={styles.header}>{children}</div>;
}

function Body({ children }: { children: ReactNode }) {
  return <div className={styles.body}>{children}</div>;
}

function Footer({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

function Modal({ open, onClose, beforeClose, children, closeOnOverlayClick = true, }:ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const requestClose = useCallback(
    async () => {
    if (beforeClose) {
      const allowed = await beforeClose();
      if (!allowed) return;
    }
    onClose();
  },[beforeClose, onClose]);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;

    const appRoot = document.getElementById('root');
    const modal = contentRef.current;

    // === 背景锁定 ===
    document.body.style.overflow = 'hidden';
    appRoot?.setAttribute('inert', '');

    // === 记录焦点 ===
    const previouslyFocused = document.activeElement as HTMLElement | null;

    if (!modal) return () => {
      document.body.style.overflow = '';
      appRoot?.removeAttribute('inert');
    };

    // === Focus Trap ===
    const focusableSelectors = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ];

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      focusableSelectors.join(',')
    );

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        requestClose();
        return;
      }

      if (e.key !== 'Tab' || !first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
      document.body.style.overflow = '';
      appRoot?.removeAttribute('inert');
    };
  }, [open, onClose, requestClose]);

  // TODO:
  // - Support close guard (confirm / async validation before closing)
  // - Coordinate exit animation lifecycle with AnimatePresence
  // - Add size / variant support for design system usage
  // - Extract header / footer slots for structural consistency
  // - Consider modal stacking and SSR safety if scaling up

  // TODO:
  // - 支持关闭拦截（在关闭前进行确认或异步校验）
  // - 与 AnimatePresence 协调退出动画的生命周期，避免组件被直接卸载
  // - 添加尺寸 / 变体支持，方便作为设计系统组件复用
  // - 抽离 Header / Footer 插槽，保证结构和样式一致性
  // - 如果后续规模变大，考虑多层 Modal 管理和 SSR 安全性

  return createPortal(
      <motion.div 
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        onClick={closeOnOverlayClick ? requestClose : undefined}
      >
        <motion.div
          className={styles.modalContent}
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={(e) => e.stopPropagation()} // 防止点内容时关闭
        >
          <button
            className={styles.modalClose}
            aria-label="Close dialog"
            onClick={requestClose}
          >
            X
          </button>
          {children}
        </motion.div>
      </motion.div>,
      document.getElementById('modal-root') as HTMLElement
  );
}

export default Modal;
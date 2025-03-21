import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function BaseModal({ 
  children,
  elementName
}: {
  children: React.ReactNode,
  elementName: string
}) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  const className = elementName === "user-login-modal" ?  "user-login-modal p-10" : "modal p-10";

  if (typeof window !== "object") {
    return null;
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className={className} onClose={onDismiss}>
        {children}
      </dialog>
    </div>,
    document.getElementById(elementName)!
  );
}
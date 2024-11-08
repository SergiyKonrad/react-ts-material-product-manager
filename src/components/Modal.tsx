import React, { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
}

export function Modal({ children }: ModalProps) {
  return (
    <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        {children} {/* Renders inner elements passed as children */}
      </div>
    </div>
  )
}

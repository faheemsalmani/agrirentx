'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                )}
                {!title && (
                    <button onClick={onClose} className="absolute right-4 top-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10">
                        <X size={18} />
                    </button>
                )}
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
}

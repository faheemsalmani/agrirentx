'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border transition-all animate-in slide-in-from-right-10 fade-in duration-300 ${type === 'success'
                ? 'bg-white border-green-100 text-green-800 shadow-green-100/50'
                : 'bg-white border-red-100 text-red-800 shadow-red-100/50'
            }`}>
            {type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
                <XCircle className="w-5 h-5 text-red-500" />
            )}
            <p className="font-medium text-sm">{message}</p>
            <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

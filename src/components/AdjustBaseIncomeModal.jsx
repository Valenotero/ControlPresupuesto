// src/components/AdjustBaseIncomeModal.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

export default function AdjustBaseIncomeModal({ isOpen, onClose }) {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className={
                `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50
                transition-opacity duration-300 ease-out
                ${visible ? 'opacity-100' : 'opacity-0'}`
            }
            onClick={onClose}
        >
            <div
                className={
                    `bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto
            transform transition-transform duration-300 ease-out
            ${visible ? 'scale-100' : 'scale-95'}`
                }
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {t('adjustBudgetTitle')}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Aquí tu contenido para ajustar ingreso */}
                <div className="p-6">
                    {/* …inputs, botones… */}
                </div>
            </div>
        </div>
    );
}

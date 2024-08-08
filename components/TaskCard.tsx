import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export function TaskCard({ title, description, status, deadline, onEdit, onDelete }: any) {
    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 mb-3">{description}</p>
            <div className="flex justify-between items-center mb-3">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    {status}
                </span>
                <span className="text-gray-300">{deadline}</span>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={onEdit}
                    className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                >
                    <Pencil size={16} className="text-white" />
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                    <Trash2 size={16} className="text-white" />
                </button>
            </div>
        </div>
    );
};
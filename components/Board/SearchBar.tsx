"use client"

import { Search, Calendar, Zap, Filter, Share, Plus } from 'lucide-react';
import AddTaskButton from './AddTaskButton';

export default function SearchBar() {
    return (
        <header className="shadow-sm p-2">
            <div className="mx-auto flex flex-col sm:flex-row items-center justify-between sm:space-y-0">
                <div className="relative w-full sm:w-64 flex-shrink-0">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 my-2 md:my-0 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                        <Calendar size={20} />
                        <span className="sr-only">Calendar view</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                        <Zap size={20} />
                        <span className="sr-only">Automation</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                        <Filter size={20} />
                        <span className="sr-only">Filter</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                        <Share size={20} />
                        <span className="sr-only">Share</span>
                    </button>
                    <AddTaskButton />
                </div>
            </div>
        </header>
    )
}
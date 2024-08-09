"use client"

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sunrise } from 'lucide-react';
import { ModeToggle } from './themeToggler';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: Sunrise };
    if (hour < 18) return { text: 'Good Afternoon', icon: Sun };
    return { text: 'Good Evening', icon: Moon };
};

const motivationalQuotes = [
    "Embrace the challenge!",
    "You've got this!",
    "Make today amazing!",
    "Believe in yourself!",
    "Small steps, big impact!"
];

export function DynamicGreeting({ userName }) {
    const [greeting, setGreeting] = useState(getGreeting());
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const timer = setInterval(() => setGreeting(getGreeting()), 60000); // Update every minute
        setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
        return () => clearInterval(timer);
    }, []);

    const Icon = greeting.icon;

    return (
        <section className="p-2 rounded-lg shadow-lg">
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col sm:flex-row gap-2 items-center'>
                    <Icon className="w-12 h-12" />
                    <div className="flex text-xl sm:text-2xl font-bold">{greeting.text}, {userName}</div>
                </div>

                <p className="text-lg sm:text-xl opacity-90">{quote}</p>
            </div>
            {/* <div>
                <ModeToggle />
            </div> */}
        </section>
    );
}
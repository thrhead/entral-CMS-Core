'use client';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';

export const Header: React.FC = () => {
    const { theme } = useTheme();
    const { header } = theme.layout;

    return (
        <header className="border-b" style={{ backgroundColor: 'var(--c3-color-background)', borderColor: 'var(--c3-color-surface)' }}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="font-bold text-xl" style={{ color: 'var(--c3-color-primary)' }}>
                    {header.logoText}
                </Link>

                {/* Navigation (Placeholder for now) */}
                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-[color:var(--c3-color-primary)] transition-colors" style={{ color: 'var(--c3-color-text)' }}>
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-[color:var(--c3-color-primary)] transition-colors" style={{ color: 'var(--c3-color-text)' }}>
                        About
                    </Link>
                </nav>

                {/* Mobile Menu Action (Placeholder) */}
                <button className="md:hidden p-2" style={{ color: 'var(--c3-color-text)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

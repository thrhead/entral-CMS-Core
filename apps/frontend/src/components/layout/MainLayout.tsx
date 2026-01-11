'use client';
import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ThemeProvider } from '../../context/ThemeContext';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col bg-[color:var(--c3-color-background)] transition-colors duration-200">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

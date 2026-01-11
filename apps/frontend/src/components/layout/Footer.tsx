'use client';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Footer: React.FC = () => {
    const { theme } = useTheme();
    const { footer } = theme.layout;

    return (
        <footer className="py-12 border-t" style={{ backgroundColor: 'var(--c3-color-surface)', borderColor: 'var(--c3-color-surface)' }}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm" style={{ color: 'var(--c3-color-text-secondary)' }}>
                        {footer.copyright}
                    </div>

                    {footer.showSocials && (
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                            <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                            <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

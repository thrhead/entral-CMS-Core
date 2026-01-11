import React from 'react';
import { HeroBlockProps } from '../../types/content';

export const Hero: React.FC<HeroBlockProps> = ({ title, subtitle, ctaText, ctaLink, backgroundImage, style, className }) => {
    return (
        <section
            className={`py-20 px-4 text-center relative overflow-hidden ${className || ''}`}
            style={{
                backgroundColor: 'var(--c3-color-surface)',
                // Preliminary support for background images
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...style
            }}
        >
            {/* Overlay if image exists */}
            {backgroundImage && <div className="absolute inset-0 bg-black/50 z-0"></div>}

            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--c3-color-text)' }}>
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: 'var(--c3-color-text-secondary)' }}>
                        {subtitle}
                    </p>
                )}
                {ctaText && (
                    <a
                        href={ctaLink || '#'}
                        className="inline-block px-8 py-4 rounded-lg font-medium transition-transform hover:-translate-y-1"
                        style={{
                            backgroundColor: 'var(--c3-color-primary)',
                            color: '#ffffff',
                            borderRadius: 'var(--c3-radius)'
                        }}
                    >
                        {ctaText}
                    </a>
                )}
            </div>
        </section>
    );
};

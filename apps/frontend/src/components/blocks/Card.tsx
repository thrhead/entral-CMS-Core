import React from 'react';
import { CardBlockProps } from '../../types/content';

export const Card: React.FC<CardBlockProps> = ({ title, text, image, link, style, className }) => {
    const CardWrapper = link ? 'a' : 'div';

    return (
        <CardWrapper
            href={link}
            className={`block p-6 h-full border hover:shadow-lg transition-all duration-200 ${className || ''}`}
            style={{
                backgroundColor: 'var(--c3-color-background)',
                borderColor: 'var(--c3-color-surface)',
                borderRadius: 'var(--c3-radius)',
                cursor: link ? 'pointer' : 'default',
                ...style
            }}
        >
            {image && (
                <div className="mb-4 overflow-hidden rounded-md aspect-video bg-gray-100">
                    <img src={image} alt={title || 'Card Image'} className="w-full h-full object-cover" />
                </div>
            )}

            {title && (
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--c3-color-text)' }}>
                    {title}
                </h3>
            )}

            {text && (
                <p style={{ color: 'var(--c3-color-text-secondary)' }}>
                    {text}
                </p>
            )}
        </CardWrapper>
    );
};

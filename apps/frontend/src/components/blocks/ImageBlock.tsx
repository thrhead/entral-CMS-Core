import React from 'react';
import { ImageBlockProps } from '../../types/content';

export const ImageBlock: React.FC<ImageBlockProps> = ({ src, alt, caption, width, height, style, className }) => {
    return (
        <figure
            className={`py-8 px-4 max-w-4xl mx-auto ${className || ''}`}
            style={style}
        >
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto rounded-lg shadow-sm"
            />
            {caption && (
                <figcaption className="mt-2 text-center text-sm" style={{ color: 'var(--c3-color-text-secondary)' }}>
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

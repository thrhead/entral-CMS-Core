import React from 'react';
import { RichTextBlockProps } from '../../types/content';

export const RichText: React.FC<RichTextBlockProps> = ({ html, text, style, className }) => {
    return (
        <div
            className={`prose max-w-4xl mx-auto py-8 px-4 ${className || ''}`}
            style={{
                color: 'var(--c3-color-text)',
                ...style
            }}
        >
            {html ? (
                <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
                <p>{text}</p>
            )}
        </div>
    );
};

import React, { ReactNode } from 'react';
import { GridBlockProps } from '../../types/content';

interface GridProps extends GridBlockProps {
    children?: ReactNode;
}

export const Grid: React.FC<GridProps> = ({ columns = 3, gap = 8, children, style, className }) => {
    // Tailwind dynamic classes don't work well with interpolation, so we map few common cases or use inline style for columns
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem`, // Assuming gap prop is tailwind-like (8 = 2rem)
        ...style
    };

    return (
        <div
            className={`py-12 px-4 container mx-auto ${className || ''}`}
            style={gridStyle}
        >
            {children}
        </div>
    );
};

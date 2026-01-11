import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

        const variants = {
            primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
            secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
            outline: "border border-gray-300 hover:bg-gray-50",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
        };

        const sizes = "h-10 py-2 px-4";

        return (
            <button
                className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 animate-spin">⚪</span>
                ) : null}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

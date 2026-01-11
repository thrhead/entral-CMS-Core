export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
}

export interface ThemeLayout {
    header: {
        logo?: string;
        logoText?: string;
        navType: 'simple' | 'mega'; // Future proofing
    };
    footer: {
        copyright: string;
        showSocials: boolean;
    };
}

export interface ThemeConfig {
    name: string;
    colors: ThemeColors;
    fonts: {
        body: string;
        heading: string;
    };
    borderRadius: string;
    layout: ThemeLayout;
}

export const defaultTheme: ThemeConfig = {
    name: 'Default',
    colors: {
        primary: '#3B82F6', // Blue-500
        secondary: '#10B981', // Emerald-500
        background: '#FFFFFF',
        surface: '#F3F4F6', // Gray-100
        text: '#1F2937', // Gray-800
        textSecondary: '#6B7280', // Gray-500
    },
    fonts: {
        body: 'Inter, sans-serif',
        heading: 'Inter, sans-serif',
    },
    borderRadius: '0.375rem', // rounded-md
    layout: {
        header: {
            logoText: 'C3 CMS',
            navType: 'simple'
        },
        footer: {
            copyright: '© 2026 C3 CMS. All rights reserved.',
            showSocials: true
        }
    }
};

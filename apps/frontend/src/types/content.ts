export interface BaseBlockProps {
    className?: string;
    style?: React.CSSProperties;
}

export interface HeroBlockProps extends BaseBlockProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
}

export interface RichTextBlockProps extends BaseBlockProps {
    html?: string;
    text?: string; // Fallback or Markdown
}

export interface ImageBlockProps extends BaseBlockProps {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface CardBlockProps extends BaseBlockProps {
    title?: string;
    text?: string;
    image?: string;
    link?: string;
}

export interface GridBlockProps extends BaseBlockProps {
    columns?: number;
    gap?: number;
}

// Union of all block props
export type BlockProps =
    | HeroBlockProps
    | RichTextBlockProps
    | ImageBlockProps
    | CardBlockProps
    | GridBlockProps;

export interface BlockData {
    id: string;
    type: 'hero' | 'text' | 'image' | 'card' | 'columns' | string;
    props: Record<string, any>; // Flexible props mainly, but typed above for specific components
    content?: string; // For simple text blocks
    children?: BlockData[];
}

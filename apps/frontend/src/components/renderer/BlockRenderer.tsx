import React from 'react';
import { Hero } from '../blocks/Hero';
import { RichText } from '../blocks/RichText';
import { Card } from '../blocks/Card';
import { Grid } from '../blocks/Grid';
import { ImageBlock } from '../blocks/ImageBlock';
import { BlockData } from '../../types/content';

interface BlockRendererProps {
    block: BlockData;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
    switch (block.type) {
        case 'hero':
            return <Hero {...block.props} title={block.props.title} />;

        case 'text':
            return <RichText {...block.props} text={block.content} html={block.props.html} />;

        case 'image':
            return <ImageBlock {...block.props} src={block.props.src || ''} alt={block.props.alt || 'Image'} />;

        case 'columns':
            return (
                <Grid {...block.props}>
                    {block.children?.map(child => (
                        <div key={child.id} className="h-full">
                            <BlockRenderer block={child} />
                        </div>
                    ))}
                </Grid>
            );

        case 'card':
            return <Card {...block.props} />;

        default:
            if (process.env.NODE_ENV === 'development') {
                return (
                    <div className="p-4 border border-dashed border-red-300 text-red-500 rounded my-4">
                        Unknown block type: {block.type}
                    </div>
                );
            }
            return null;
    }
};

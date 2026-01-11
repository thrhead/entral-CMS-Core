'use client';
import React from 'react';
import { BlockRenderer } from './BlockRenderer';
import { MainLayout } from '../layout/MainLayout';
import { BlockData } from '../../types/content';

interface PageData {
    id: string;
    title: string;
    blocks: BlockData[];
}

export default function PageRenderer({ page }: { page: PageData }) {
    if (!page) return null;

    return (
        <MainLayout>
            {page.blocks && page.blocks.length > 0 ? (
                page.blocks.map((block) => (
                    <BlockRenderer key={block.id} block={block} />
                ))
            ) : (
                // Fallback for empty or legacy content
                <div className="container mx-auto py-20 px-4">
                    <h1 className="text-4xl font-bold mb-4 text-[color:var(--c3-color-text)]">{page.title}</h1>
                    <p className="text-[color:var(--c3-color-text-secondary)]">This page has no content blocks yet.</p>
                </div>
            )}
        </MainLayout>
    );
}

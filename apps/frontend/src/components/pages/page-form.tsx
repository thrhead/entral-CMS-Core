'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/api';

interface PageData {
    id?: string;
    title: string;
    slug: string;
    content: Record<string, unknown>; // Using any for JSON content for now
    isPublished: boolean;
}

interface PageFormProps {
    initialData?: PageData;
    isCustomSlug?: boolean; // If true, slug is manually editable
}

export function PageForm({ initialData }: PageFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<PageData>({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        content: initialData?.content || {},
        isPublished: initialData?.isPublished || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };

            // Auto-generate slug from title if creating new page and slug field is empty/pristine
            if (name === 'title' && !initialData) {
                newData.slug = value.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }

            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (initialData?.id) {
                await apiFetch(`/pages/${initialData.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                });
            } else {
                await apiFetch('/pages', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
            }
            router.push('/dashboard/pages');
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to save page');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="space-y-4">
                <Input
                    label="Page Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. About Us"
                />

                <Input
                    label="Slug (URL Path)"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    placeholder="e.g. about-us"
                />

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isPublished"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isPublished" className="text-sm text-gray-700">Publish this page</label>
                </div>

                {/* Basic JSON Editor for Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content (JSON)
                    </label>
                    <textarea
                        className="w-full h-48 rounded-md border border-gray-300 p-3 font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={JSON.stringify(formData.content, null, 2)}
                        onChange={(e) => {
                            try {
                                const parsed = JSON.parse(e.target.value);
                                setFormData(prev => ({ ...prev, content: parsed }));
                            } catch {
                                // Don't update state on invalid JSON, or handle differently
                                // For simplicity in this POC, we allow raw text editing until blur or keep it simple
                            }
                        }}
                        placeholder='{"blocks": []}'
                    />
                    <p className="text-xs text-gray-500 mt-1">Simple JSON editor for now. Will be replaced with visual block editor.</p>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                    {error}
                </div>
            )}

            <div className="flex justify-end space-x-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button type="submit" isLoading={loading}>
                    {initialData ? 'Update Page' : 'Create Page'}
                </Button>
            </div>
        </form>
    );
}

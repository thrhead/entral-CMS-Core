'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageForm } from '@/components/pages/page-form';
import { apiFetch } from '@/lib/api';

export default function EditPage() {
    const params = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch<Record<string, unknown>>(`/pages/${params.id}`)
            .then((data: any) => setPage(data))
            .catch(() => { }) // Handle error or redirect
            .finally(() => setLoading(false));
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!page) return <div>Page not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Edit Page</h1>
            </div>

            <PageForm initialData={page} />
        </div>
    );
}

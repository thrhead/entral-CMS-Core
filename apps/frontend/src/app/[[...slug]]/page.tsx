import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import PageRenderer from '../../components/renderer/PageRenderer';

// This function communicates with the backend to get page data
async function getPage(slug: string[]) {
    const slugPath = slug ? slug.join('/') : '/';
    const normalizedSlug = slug ? slug.join('/') : 'home';

    try {
        // Force IPv4
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

        // Forward the host header so the backend can resolve the tenant
        // Await headers() as it is now async
        const headersList = await headers();
        const host = headersList.get('host') || 'localhost:3000'; // Default if missing

        const res = await fetch(`${baseUrl}/pages/slug/${normalizedSlug}`, {
            cache: 'no-store', // Disable cache for now to see updates immediately
            headers: {
                'Host': host,
            }
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            // Log other errors but return null to trigger 404 for visitor
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching page:', error);
        return null;
    }
}

// Params is now a Promise in Next.js 15
export default async function DynamicPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const resolvedParams = await params;
    const page = await getPage(resolvedParams.slug);

    if (!page) {
        notFound();
    }

    const blocks = page.content?.blocks || [];

    const pageData = {
        id: page.id,
        title: page.title,
        blocks: blocks
    };

    return <PageRenderer page={pageData} />;
}

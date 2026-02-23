import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://goldsilvernow.in'

    // Get all published blog posts
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    const blogUrls = posts.map((post: { slug: string; updatedAt: Date }) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const staticUrls = [
        { url: baseUrl, changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/blogs`, changeFrequency: 'daily', priority: 0.8 },
        { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/tools`, changeFrequency: 'weekly', priority: 0.8 },
    ];

    const calculators = [
        'emi-calculator',
        'sip-calculator',
        'gold-loan-calculator',
        'gst-calculator',
        'fd-calculator',
        'inflation-calculator',
        'mortgage-calculator',
        'retirement-calculator',
        'budget-planner'
    ];

    const calculatorUrls = calculators.map(calc => ({
        url: `${baseUrl}/tools/${calc}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        ...staticUrls.map(s => ({ ...s, lastModified: new Date(), changeFrequency: s.changeFrequency as any })),
        ...calculatorUrls,
        ...blogUrls,
    ]
}

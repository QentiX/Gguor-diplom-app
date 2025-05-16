'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NewsComponent from './NewsComponent'

interface NewsItem {
	id: number
	title: string
	content: string
	thumbnail: string
	createdAt: string
}

const NewsSectionContainerComponent = () => {
	const [news, setNews] = useState<NewsItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch('/api/news')
				if (!response.ok) throw new Error('Failed to fetch')
				const data = await response.json()
				setNews(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error')
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [])

	if (error) return <div className='text-red-500'>{error}</div>

	return (
		<div className='mb-[76px]'>
			<Link
				href='/news'
				className='flex items-center text-[#0A3470] font-bold text-3xl group w-fit mb-6'
			>
				<span>Новости</span>
				<ChevronRight
					color='#0A3470'
					size={24}
					className='ml-1 transition-transform duration-300 group-hover:translate-x-1 pt-1'
				/>
			</Link>

			{loading ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					{[1, 2, 3].map(i => (
						<div key={i} className='animate-pulse'>
							<div className='bg-gray-200 aspect-video rounded-lg' />
							<div className='h-4 bg-gray-200 mt-2 w-3/4 rounded' />
						</div>
					))}
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					{news.map(newsItem => (
						<NewsComponent
							key={newsItem.id}
							image={newsItem.thumbnail}
							title={newsItem.title}
							date={new Date(newsItem.createdAt).toLocaleDateString('ru-RU')}
							link={`/news/${newsItem.id}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default NewsSectionContainerComponent

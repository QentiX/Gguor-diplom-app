'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import VideoCard from './VideoCard'

interface VideoData {
	id: number
	title: string
	thumbnail: string
	videoUrl: string
	createdAt: string
}

export default function VideoSection() {
	const [videos, setVideos] = useState<VideoData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await fetch('/api/getVideos')
				if (!response.ok) throw new Error('Failed to fetch')
				const data = await response.json()
				setVideos(data)
			} catch (err) {
				setError('Ошибка загрузки видео')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		fetchVideos()
	}, [])

	if (error) return <div className='text-red-500'>{error}</div>

	return (
		<div className='mb-[76px]'>
			<Link
				href='/news'
				className='flex items-center text-[#0A3470] font-bold text-3xl group w-fit mb-6'
			>
				<span>Наш ютуб</span>
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
					{videos.map(vid => (
						<VideoCard
							key={vid.id}
							thumbnail={vid.thumbnail}
							title={vid.title}
							url={vid.videoUrl}
						/>
					))}
				</div>
			)}
		</div>
	)
}

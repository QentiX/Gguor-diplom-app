'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import VideoCard from './VideoCard'

const videos = [
	{
		thumbnail: '/imageNews.jpg',
		title: 'Гимн БГУИР в исполнении хора',
		url: 'https://www.youtube.com/live/cnNNqvscSzs?si=n0o_xqglRb8bhIlp',
	},
	{
		thumbnail: '/imageNews.jpg',
		title: 'Экскурсия по кампусу БГУИР',
		url: 'https://www.youtube.com/live/cnNNqvscSzs?si=n0o_xqglRb8bhIlp',
	},
	{
		thumbnail: '/imageNews.jpg',
		title: 'Лекция по машинному обучению',
		url: 'https://www.youtube.com/live/cnNNqvscSzs?si=n0o_xqglRb8bhIlp',
	},
]

export default function VideoSection() {
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

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{videos.map((vid, i) => (
					<VideoCard
						key={i}
						thumbnail={vid.thumbnail}
						title={vid.title}
						url={vid.url}
					/>
				))}
			</div>
		</div>
	)
}

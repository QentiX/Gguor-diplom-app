// components/VideoCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface VideoCardProps {
	thumbnail: string
	title: string
	url: string // может быть YouTube watch, live или embed
}

export default function VideoCard({ thumbnail, title, url }: VideoCardProps) {
	const [playing, setPlaying] = useState(false)
	const [iframeLoaded, setIframeLoaded] = useState(false)
	const iframeRef = useRef<HTMLIFrameElement>(null)

	// Универсальный парсер ID (watch, embed, live, youtu.be)
	let videoId: string | null = null
	if (url.includes('watch?v=')) {
		videoId = url.split('watch?v=')[1].split('&')[0]
	} else if (url.includes('/embed/')) {
		videoId = url.split('/embed/')[1].split('?')[0]
	} else if (url.includes('/live/')) {
		videoId = url.split('/live/')[1].split('?')[0]
	} else if (url.includes('youtu.be/')) {
		videoId = url.split('youtu.be/')[1].split('?')[0]
	}

	const embedSrc = videoId
		? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&fs=0&controls=1`
		: null

	return (
		<div className='relative overflow-hidden'>
			<div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
				{(!playing || (playing && !iframeLoaded)) && (
					<div
						onClick={() => setPlaying(true)}
						className='absolute inset-0 cursor-pointer'
					>
						<Image
							src={thumbnail}
							alt={title}
							fill
							sizes='(min-width: 768px) 33vw, 100vw'
							className='object-cover'
						/>
						<div className='absolute bottom-2 left-2 flex items-end justify-start'>
							<svg width='50' height='50' viewBox='0 0 60 60'>
								<circle cx='30' cy='30' r='30' fill='#0A3470' />
								<polygon points='24,20 24,40 42,30' fill='#FFF' />
							</svg>
						</div>
					</div>
				)}

				{playing && embedSrc && (
					<iframe
						ref={iframeRef}
						src={embedSrc}
						className='absolute top-0 left-0 w-full h-full transition-opacity duration-200'
						style={{ opacity: iframeLoaded ? 1 : 0 }}
						frameBorder='0'
						allow='autoplay; encrypted-media; fullscreen'
						allowFullScreen
						onLoad={() => setIframeLoaded(true)}
					/>
				)}
			</div>

			<div className='mt-2'>
				<Link
					href={url}
					target='_blank'
					rel='noopener noreferrer'
					className='text-[#0A3470] text-sm font-semibold hover:underline'
				>
					{title}
				</Link>
			</div>
		</div>
	)
}

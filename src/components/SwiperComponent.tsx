'use client'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import MaxWidthWrapper from './MaxWidthWrapper'

const slides = [
	{
		id: 1,
		title: 'ГГУОР - выбор первых!',
		description:
			'Специализированное учебное заведение, сочетающее общее среднее образование и среднее специальное образование с углубленной спортивной подготовкой.',
		image: '/slide1.jpg',
	},
	{
		id: 2,
		title: 'ГГУОР - выбор первых!',
		description:
			'Специализированное учебное заведение, сочетающее общее среднее образование и среднее специальное образование с углубленной спортивной подготовкой.',
		image: '/slide1.jpg',
	},
	{
		id: 3,
		title: 'ГГУОР - выбор первых!',
		description:
			'Специализированное учебное заведение, сочетающее общее среднее образование и среднее специальное образование с углубленной спортивной подготовкой.',
		image: '/slide1.jpg',
	},
]

export default function SwiperComponent() {
	return (
		<div className='relative h-[calc(100vh-103px)] w-full mb-[50px]'>
			<Swiper
				loop={true}
				spaceBetween={0}
				centeredSlides={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class="${className} !w-8 !h-1 !rounded-none !bg-white/50 !transition-all"></span>`
					},
				}}
				modules={[Autoplay, Pagination]}
				effect='fade'
				speed={2000}
				className='h-full w-full'
			>
				{slides.map(slide => (
					<SwiperSlide key={slide.id}>
						<div className='relative h-full w-full'>
							<Image
								src={slide.image}
								alt={slide.title}
								fill
								className='object-cover'
								quality={100}
								priority
							/>
							<div className='absolute inset-0 bg-black/45 flex items-end justify-center pb-16'>
								{' '}
								<MaxWidthWrapper className='relative'>
									<div className='text-white max-w-2xl px-4 space-y-4'>
										{' '}
										<h1 className='text-4xl md:text-4xl font-semibold tracking-wider'>
											{slide.title}
										</h1>
										<div className='h-[2px] w-16 bg-white' />
										<p className='text-base md:text-base font-medium text-left'>
											{slide.description}
										</p>
									</div>
								</MaxWidthWrapper>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

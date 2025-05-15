'use client'
import Link from 'next/link'
import 'swiper/css'
import { Autoplay, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import MaxWidthWrapper from './MaxWidthWrapper'

const InfoSliderContainer = () => {
	const slides = [
		{
			id: 1,
			image: '/gguorInfoSlide.png',
			link: 'https://gguor.by/',
		},
		{
			id: 2,
			image: '/pomogutInfoSlider.png',
			link: 'https://pomogut.by/',
		},
		{
			id: 3,
			image: '/belarusYoungInfoSlider.png',
			link: 'https://brsm.by/ru',
		},
		{
			id: 4,
			image: '/26-yanvaryaInfoSlider.png',
			link: 'https://gomel.gov.by/ru/content/vybory-prezidenta-respubliki-belarus2025/',
		},
		{
			id: 5,
			image: '/fkInfoSlider.png',
			link: 'https://gomel-region.gov.by/ru/edi-ru/',
		},
		{
			id: 6,
			image: '/80-let-1InfoSlider.png',
			link: 'https://edu.gov.by/',
		},
	]

	const extendedSlides = [...slides, ...slides, ...slides, ...slides]

	return (
		<MaxWidthWrapper className='pb-[64px]'>
			<Swiper
				modules={[Autoplay, FreeMode]}
				spaceBetween={20}
				slidesPerView={'auto'}
				autoplay={{
					delay: 1,
					disableOnInteraction: false,
					waitForTransition: true,
				}}
				speed={4000}
				loop={true}
				loopAdditionalSlides={slides.length * 2}
				freeMode={{
					enabled: true,
					momentum: true,
					momentumRatio: 0.5,
					momentumBounce: false,
				}}
				grabCursor={true}
				breakpoints={{
					320: { slidesPerView: 2 },
					480: { slidesPerView: 3 },
					768: { slidesPerView: 4 },
					1024: { slidesPerView: 5 },
					1280: { slidesPerView: 6 },
				}}
			>
				{extendedSlides.map((slide, index) => (
					<SwiperSlide
						key={`${slide.id}-${index}`}
						className='!w-[190px] group relative'
					>
						<Link
							href={slide.link}
							className='block relative h-[76px] w-full overflow-hidden'
							aria-label={`Ссылка на ${slide.image}`}
							target='_blank'
						>
							<div className='w-full h-full p-1'>
								<img
									src={slide.image}
									alt='Информационный слайд'
									className='w-full h-full object-contain 
                    transition-transform duration-300 
                    group-hover:scale-110 group-hover:z-20
                    transform origin-center'
								/>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</MaxWidthWrapper>
	)
}

export default InfoSliderContainer

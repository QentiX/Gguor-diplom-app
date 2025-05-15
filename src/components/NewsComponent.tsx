// components/NewsComponent.tsx

import Image from 'next/image'
import Link from 'next/link'

interface NewsProps {
	image: string
	title: string
	date: string
	link: string
}

const NewsComponent = ({ image, title, date, link }: NewsProps) => {
	return (
		<div className='group flex flex-col gap-[10px] w-full overflow-hidden'>
			{/* Внешний контейнер с overflow-hidden и group */}
			<Link href={link} className='relative block'>
				<div className='overflow-hidden'>
					<Image
						alt={title}
						src={image}
						width={0}
						height={0}
						sizes='(min-width: 768px) 33vw, 100vw'
						className='w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105'
					/>
				</div>
			</Link>

			<div className='flex flex-col gap-[5px] px-2'>
				<p className='text-black text-xs font-medium'>{date}</p>
				<Link href={link} target='_blank' rel='noopener noreferrer'>
					<p className='text-[#0A3470] text-[14px] font-semibold break-words leading-snug hover:underline'>
						{title}
					</p>
				</Link>
			</div>
		</div>
	)
}

export default NewsComponent

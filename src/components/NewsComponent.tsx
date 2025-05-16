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
		<div className='group flex flex-col gap-[10px] w-full h-full'>
			<Link
				href={link}
				className='relative block aspect-[16/9] overflow-hidden'
			>
				<Image
					alt={title}
					src={image}
					fill
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
					className='object-cover transition-transform duration-300 group-hover:scale-105'
					quality={85}
				/>
			</Link>

			<div className='flex flex-col gap-[5px] px-2 flex-1'>
				<p className='text-black text-xs font-medium'>{date}</p>
				<Link href={link} className='hover:underline'>
					<h3 className='text-[#0A3470] text-[14px] font-semibold leading-snug line-clamp-3'>
						{title}
					</h3>
				</Link>
			</div>
		</div>
	)
}

export default NewsComponent

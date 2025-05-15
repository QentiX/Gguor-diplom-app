import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import NewsComponent from './NewsComponent'

const dummyNews = [
	{
		image: '/imageNews.jpg',
		title:
			'Благоустройство территории филиала УО «ГГУОР» в рамках Республиканского субботника.',
		date: '14.04.2025',
		link: '/news/1',
	},
	{
		image: '/imageNews.jpg',
		title: 'В филиале прошел день открытых дверей: как это было?',
		date: '10.04.2025',
		link: '/news/2',
	},
	{
		image: '/imageNews.jpg',
		title:
			'Учащиеся филиала приняли участие в соревнованиях по легкой атлетике.',
		date: '08.04.2025',
		link: '/news/3',
	},
	{
		image: '/imageNews.jpg',
		title:
			'Благоустройство территории филиала УО «ГГУОР» в рамках Республиканского субботника.',
		date: '14.04.2025',
		link: '/news/4',
	},
	{
		image: '/imageNews.jpg',
		title: 'В филиале прошел день открытых дверей: как это было?',
		date: '10.04.2025',
		link: '/news/5',
	},
	{
		image: '/imageNews.jpg',
		title:
			'Учащиеся филиала приняли участие в соревнованиях по легкой атлетике.',
		date: '08.04.2025',
		link: '/news/6',
	},
]

const NewsSectionContainerComponent = () => {
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

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{dummyNews.map((newsItem, idx) => (
					<NewsComponent
						key={idx}
						image={newsItem.image}
						title={newsItem.title}
						date={newsItem.date}
						link={newsItem.link}
					/>
				))}
			</div>
		</div>
	)
}

export default NewsSectionContainerComponent

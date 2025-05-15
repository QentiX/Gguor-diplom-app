import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AnnounComponent from './AnnounComponent'

const dummyNews = [
	{
		title:
			'Благоустройство территории филиала УО «ГГУОР» в рамках Республиканского субботника.',
		date: '14.04.2025',
		link: '/news/1',
		desc: 'Национальный исследовательский университет «МЭИ» приглашает принять участие в конкурсе инноваций в инженерном образовании.',
	},
	{
		title:
			'Благоустройство территории филиала УО «ГГУОР» в рамках Республиканского субботника.',
		date: '14.04.2025',
		link: '/news/2',
		desc: 'Национальный исследовательский университет «МЭИ» приглашает принять участие в конкурсе инноваций в инженерном образовании.',
	},
	{
		title:
			'Благоустройство территории филиала УО «ГГУОР» в рамках Республиканского субботника.',
		date: '14.04.2025',
		link: '/news/2',
		desc: 'Национальный исследовательский университет «МЭИ» приглашает принять участие в конкурсе инноваций в инженерном образовании.',
	},
]

const AnnounSectionContainerComponent = () => {
	return (
		<div className='mb-[76px]'>
			<Link
				href='/news'
				className='flex items-center text-[#0A3470] font-bold text-[32px] group w-fit mb-6'
			>
				<span>Объявления</span>
				<ChevronRight
					color='#0A3470'
					size={24}
					className='ml-1 transition-transform duration-300 group-hover:translate-x-1 pt-1'
				/>
			</Link>

			<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
				{dummyNews.map((newsItem, idx) => (
					<AnnounComponent
						key={idx}
						desc={newsItem.desc}
						title={newsItem.title}
						date={newsItem.date}
						link={newsItem.link}
					/>
				))}
			</div>
		</div>
	)
}

export default AnnounSectionContainerComponent

import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
	{
		title: 'Меню',
		items: [
			{
				icon: '/layout-dashboard.svg',
				label: 'Домашняя страница',
				href: '/',
				visible: ['admin', 'teacher', 'student', 'coach'],
			},
			{
				icon: '/graduation-cap.svg',
				label: 'Учителя',
				href: '/list/teachers',
				visible: ['admin', 'teacher'],
			},
			{
				icon: '/users.svg',
				label: 'Студенты',
				href: '/list/students',
				visible: ['admin', 'teacher', 'coach', 'student'],
			},
			{
				icon: '/users-round.svg',
				label: 'Тренеры',
				href: '/list/coaches',
				visible: ['admin', 'coach'],
			},
			{
				icon: '/clipboard-list.svg',
				label: 'Предметы',
				href: '/list/subjects',
				visible: ['admin'],
			},
			{
				icon: '/land-plot.svg',
				label: 'Дисциплины',
				href: '/list/disciplines',
				visible: ['admin'],
			},
			{
				icon: '/presentation.svg',
				label: 'Группы',
				href: '/list/classes',
				visible: ['admin', 'teacher'],
			},
			{
				icon: '/notepad-text.svg',
				label: 'Уроки',
				href: '/list/lessons',
				visible: ['admin', 'teacher', 'coach'],
			},
			{
				icon: '/book-open-check.svg',
				label: 'Экзамены',
				href: '/list/exams',
				visible: ['admin', 'teacher', 'student', 'coach'],
			},
			{
				icon: '/school.svg',
				label: 'Задания',
				href: '/list/assignments',
				visible: ['admin', 'teacher', 'student', 'coach'],
			},
			{
				icon: '/keyboard-music.svg',
				label: 'Индивидуальные тренировки',
				href: '/list/personalTrainings',
				visible: ['admin', 'student', 'coach'],
			},
			{
				icon: '/book-a.svg',
				label: 'Результаты',
				href: '/list/results',
				visible: ['admin', 'teacher', 'student', 'coach'],
			},
			{
				icon: '/user-check.svg',
				label: 'Посещаемость',
				href: '/list/attendance',
				visible: ['admin', 'teacher', 'student', 'coach'],
			},
			{
				icon: '/calendar-days.svg',
				label: 'События',
				href: '/list/events',
				visible: ['admin', 'teacher', 'student', 'coach'],
			},
			{
				icon: '/bell.svg',
				label: 'Объявления',
				href: '/list/announcements',
				visible: ['admin', 'teacher', 'student', 'coach'],
			},
		],
	},
	{
		title: 'Другое',
		items: [
			{
				icon: '/newspaper.svg',
				label: 'Новости',
				href: '/list/news',
				visible: ['admin'],
			},
			{
				icon: '/file-video.svg',
				label: 'Видео галерея',
				href: '/list/videos',
				visible: ['admin'],
			},
		],
	},
]

const Menu = async () => {
	const user = await currentUser()
	const role = user?.publicMetadata.role as string

	return (
		<div className='mt-4 text-sm ml-2 pr-2'>
			{menuItems.map(i => (
				<div className='flex flex-col gap-2' key={i.title}>
					<span className='hidden lg:block text-[#7E7F80] font-medium my-2'>
						{i.title}
					</span>
					{i.items.map(item => {
						if (item.visible.includes(role)) {
							return (
								<Link
									href={
										item.label === 'Домашняя страница'
											? item.href + role
											: item.href
									}
									key={item.label}
									className='flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 hover:bg-[#F3F3F3] font-medium hover:text-[#000] text-[#454545] hover:rounded-lg'
								>
									<Image src={item.icon} alt='' width={20} height={20} />
									<span className='hidden lg:block'>{item.label}</span>
								</Link>
							)
						}
					})}
				</div>
			))}
		</div>
	)
}

export default Menu

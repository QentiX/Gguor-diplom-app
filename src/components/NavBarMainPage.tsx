'use client'

import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AuthMainPageButton from './AurhMainPageButton'

export default function NavBarMainPage() {
	const [searchActive, setSearchActive] = useState(false)
	const [language, setLanguage] = useState('ru')

	const menuItems = [
		{
			title: 'Об учреждении',
			dropdown: [
				{
					heading: 'О нас',
					links: [
						{ name: 'Руководство', href: '/university/management' },
						{ name: 'История развития филиала', href: '/university/structure' },
						{ name: 'Новости', href: '/university/faculties' },
					],
				},
				{
					heading: 'Услуги',
					links: [
						{ name: 'Платные услуги', href: '/university/paid-services' },
					],
				},
				{
					heading: 'Контакты',
					links: [
						{
							name: 'Контактная информация',
							href: '/university/paid-services',
						},
						{ name: 'Одно окно', href: '/university/paid-services' },
					],
				},
			],
		},
		{
			title: 'Сотрудникам',
			dropdown: [
				{
					heading: 'Спортивное отделение',
					links: [{ name: 'Отделения', href: '/staff/docs' }],
				},
				{
					heading: 'Преподавательская деятельность',
					links: [{ name: 'Расписание', href: '/staff/docs' }],
				},
				{
					heading: 'Информация',
					links: [
						{ name: 'Контакты', href: '/staff/docs' },
						{ name: 'Одно окно', href: '/staff/docs' },
					],
				},
			],
		},
		{
			title: 'Обучающимся',
			dropdown: [
				{
					heading: 'Спортивное отделение',
					links: [
						{ name: 'Кадровый состав', href: '/students/sports' },
						{ name: 'Отделения', href: '/students/camp' },
						{
							name: 'Учебные программы по видам спорта',
							href: '/students/food',
						},
						{ name: 'Допинг', href: '/students/language' },
					],
				},
				{
					heading: 'Учебное отделение',
					links: [
						{ name: 'Педагогический состав', href: '/students/contacts' },
						{ name: 'Расписание занятий', href: '/students/public-reception' },
						{ name: 'Права и обязанности учащихся', href: '/students/press' },
						{ name: 'Виртуальный читальный зал', href: '/students/press' },
						{
							name: 'Интернет-ресурсы системы образования',
							href: '/students/press',
						},
					],
				},
			],
		},
		{
			title: 'Воспитательное отделение',
			dropdown: [
				{
					heading: 'Основная информация',
					links: [
						{ name: 'Кадровый состав', href: '/admission/campaign' },
						{
							name: 'Идеологическая и воспитательная работа',
							href: '/admission/research',
						},
						{
							name: 'Школа активного гражданина (ШАГ)',
							href: '/admission/promotion',
						},
						{ name: 'Профориентация', href: '/admission/phonebook' },
						{ name: 'Родителям', href: '/admission/contact' },
						{ name: 'Телефоны доверия', href: '/admission/one-window' },
						{ name: 'Правовые знания', href: '/admission/feedback' },
					],
				},
			],
		},
		{
			title: 'Абитуриентам',
			dropdown: [
				{
					heading: 'Основная информация',
					links: [
						{ name: 'Приемная комиссия', href: '/graduates/community' },
						{
							name: 'Информация о ходе приема документов',
							href: '/graduates/careers',
						},
						{
							name: 'Критерии отбора на зачисление',
							href: '/graduates/community',
						},
						{ name: 'Спортивные отделения', href: '/graduates/careers' },
					],
				},
			],
		},
	]

	return (
		<header className='flex justify-between items-center pt-2 px-4 md:px-4 lg:px-4 bg-[#0A3470] z-50 relative w-full'>
			<div className='flex-shrink-0'>
				<Link href='/' className='flex items-center pb-2 gap-2'>
					<Image src='/whiteGguorLogo.svg' alt='logo' width={68} height={68} />
					<div className='font-medium leading-3 pl-2 border-l border-white hidden md:block text-white'>
						<p className='text-xxxs leading-3'>филиал учреждения образования</p>
						<p className='text-xxs'>ГОМЕЛЬСКОЕ</p>
						<p className='text-xxs'>ГОСУДАРСТВЕННОЕ</p>
						<p className='text-xxs'>УЧИЛИЩЕ</p>
						<p className='text-xxs'>ОЛИМПИЙСКОГО</p>
						<p className='text-xxs'>РЕЗЕРВА</p>
					</div>
				</Link>
			</div>

			<div className='flex flex-col items-end pl-4 w-full lg:w-auto'>
				<div className='flex justify-end items-center text-white text-sm mb-5 gap-4'>
					<Link
						href='tel:+375236223611'
						className='whitespace-nowrap hover:text-gray-200 transition-colors'
					>
						+375 236 22-36-11 | Приемная
					</Link>

					<div className='flex items-center gap-4'>
						<Toggle
							size='sm'
							aria-label='Переключить контраст'
							className='hover:bg-transparent hover:text-[#dad9d9] border-none'
						>
							<Eye size={18} />
						</Toggle>

						<ToggleGroup
							type='single'
							className='gap-1'
							size='sm'
							value={language}
							onValueChange={val => val && setLanguage(val)}
						>
							<ToggleGroupItem
								value='ru'
								className='hover:bg-transparent hover:text-[#dad9d9] border-none'
							>
								RU
							</ToggleGroupItem>
							<ToggleGroupItem
								value='en'
								className='hover:bg-transparent hover:text-[#dad9d9] border-none'
							>
								EN
							</ToggleGroupItem>
							<ToggleGroupItem
								value='be'
								className='hover:bg-transparent hover:text-[#dad9d9] border-none'
							>
								BE
							</ToggleGroupItem>
						</ToggleGroup>

						<AuthMainPageButton />
					</div>
				</div>

				<AnimatePresence mode='wait'>
					{!searchActive ? (
						<motion.nav
							key='nav'
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='w-full flex justify-end'
						>
							<ul className='flex gap-6 font-semibold text-[16px] items-center text-white'>
								{menuItems.map(({ title, dropdown }, idx) => (
									<li key={idx} className='relative group'>
										<span className='relative inline-block pb-0 px-2 group-hover:bg-white group-hover:text-[#0A3470]'>
											{title}
										</span>

										{dropdown && (
											<div
												className={`
                          absolute top-full -mt-[1px] hidden
                          group-hover:flex group-focus-within:flex
                          bg-white text-[#0A3470] shadow-md z-20
                          px-6 py-4 w-max max-w-screen-xl flex-wrap gap-x-12 gap-y-4
                          pointer-events-auto
                          ${
														idx < 2
															? 'left-0 origin-top-left'
															: 'right-0 origin-top-right'
													}
                        `}
												onMouseEnter={e => {
													const parent = e.currentTarget.closest('.group')
													parent?.classList.add('hover')
												}}
												onMouseLeave={e => {
													const parent = e.currentTarget.closest('.group')
													parent?.classList.remove('hover')
												}}
											>
												{dropdown.map((section, sIdx) => (
													<div key={sIdx} className='min-w-[180px]'>
														{section.heading && (
															<p className='font-semibold text-base mb-1 text-black'>
																{section.heading}
															</p>
														)}
														{section.links.map((link, lIdx) => (
															<Link
																key={lIdx}
																href={link.href}
																className='block py-1 text-sm text-[#000] hover:underline transition font-medium'
															>
																{link.name}
															</Link>
														))}
													</div>
												))}
											</div>
										)}
									</li>
								))}
								<li>
									<button
										onClick={() => setSearchActive(true)}
										className='text-white hover:text-gray-300 transition-colors pt-2'
									>
										<Search size={20} />
									</button>
								</li>
							</ul>
						</motion.nav>
					) : (
						<motion.div
							key='search'
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 30 }}
							transition={{ duration: 0.3 }}
							className='w-[80%]'
						>
							<div className='flex items-center bg-transparent text-white px-4 py-2 w-full'>
								<Search size={18} className='mr-2 text-gray-400' />
								<input
									autoFocus
									type='text'
									placeholder='Поиск по сайту'
									className='bg-transparent outline-none text-sm placeholder:text-gray-400 w-[900px]'
								/>
								<button
									onClick={() => setSearchActive(false)}
									className='text-gray-400 hover:text-white transition-colors'
								>
									<X size={18} />
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	)
}

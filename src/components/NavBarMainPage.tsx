'use client'

import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function NavBarMainPage() {
	const [searchActive, setSearchActive] = useState(false)

	return (
		<header className='flex justify-between items-center pt-2 px-4 bg-[#0A3470] z-50 relative w-full'>
			<div className='flex-shrink-0'>
				<Link href='/' className='flex items-center pb-2 gap-2'>
					<Image src='/whiteGguorLogo.svg' alt='logo' width={68} height={68} />
					<div className='font-medium leading-3 pl-2 border-l border-white hidden xl:block text-white'>
						<p className='text-xxxs leading-3'>филиал учреждения образования</p>
						<p className='text-xxs'>ГОМЕЛЬСКОЕ</p>
						<p className='text-xxs'>ГОСУДАРСТВЕННОЕ</p>
						<p className='text-xxs'>УЧИЛИЩЕ</p>
						<p className='text-xxs'>ОЛИМПИЙСКОГО</p>
						<p className='text-xxs'>РЕЗЕРВА</p>
					</div>
				</Link>
			</div>

			<div className='flex flex-col items-end pl-4'>
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

						<ToggleGroup type='single' className='gap-1' size='sm'>
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

						<div>
							<Link href='/sign-in'>
								<Image alt='user icon' src='/user.svg' width={20} height={20} />
							</Link>
						</div>
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
							<ul className='flex gap-6 font-medium text-[16px] items-center text-white'>
								<li>
									<Link
										href='/'
										className='hover:text-gray-200 transition-colors'
									>
										Об учреждении
									</Link>
								</li>
								<li>
									<Link
										href='/'
										className='hover:text-gray-200 transition-colors'
									>
										Сотрудникам
									</Link>
								</li>
								<li>
									<Link
										href='/'
										className='hover:text-gray-200 transition-colors'
									>
										Обучающимся
									</Link>
								</li>
								<li>
									<Link
										href='/'
										className='hover:text-gray-200 transition-colors'
									>
										Воспитательное отделение
									</Link>
								</li>
								<li>
									<Link
										href='/'
										className='hover:text-gray-200 transition-colors'
									>
										Абитуриентам
									</Link>
								</li>
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

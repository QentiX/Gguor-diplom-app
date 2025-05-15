import Image from 'next/image'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'

const FooterContainerComponent = () => {
	const linkStyles = 'hover:underline transition-colors duration-200'

	return (
		<div className='mx-4'>
			<MaxWidthWrapper className='text-white'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
					{/* Левая колонка */}
					<div className='sm:col-span-1'>
						<h3 className='font-semibold mb-4 text-[#6ECBF4] text-base'>
							Популярные ссылки
						</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='/history' className={linkStyles}>
									История развития филиала
								</Link>
							</li>
							<li>
								<Link href='/analysis' className={linkStyles}>
									Идеологическая и воспитательная работа
								</Link>
							</li>
							<li>
								<Link href='/management' className={linkStyles}>
									Руководство
								</Link>
							</li>
							<li>
								<Link href='/state' className={linkStyles}>
									Государственная символика
								</Link>
							</li>
						</ul>
					</div>

					{/* Средняя колонка */}
					<div>
						<h3 className='font-semibold mb-4 text-[#6ECBF4] text-base'>
							Абитуриентам
						</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='/admission' className={linkStyles}>
									Информация о ходе приема документов
								</Link>
							</li>
							<li>
								<Link href='/enrollment' className={linkStyles}>
									Контроль отбора на зачисление
								</Link>
							</li>
						</ul>
					</div>

					{/* Правая колонка */}
					<div className='lg:col-span-2 xl:col-span-1'>
						<h3 className='font-semibold mb-4 text-[#6ECBF4] text-base'>
							Контакты
						</h3>
						<address className='not-italic space-y-2'>
							<p className='text-sm break-words'>
								247760, Гомельская область, г.Мозырь, 1-й пер.Берёзовый, 5А
							</p>
							<div className='flex gap-2 mt-2 text-sm'>
								<p>Тел/факс:</p>
								<Link href='tel:+79292175268' className={`${linkStyles} block`}>
									+792 921 75-26-8
								</Link>
							</div>
							<div className='flex mt-2 text-sm gap-2'>
								<p>E-mail:</p>
								<Link
									href='mailto:ehr-mos@cg.gov.ru'
									className={`${linkStyles} underline`}
								>
									ehr-mos@cg.gov.ru
								</Link>
							</div>
						</address>
					</div>

					{/* Социальные сети */}
					<div className='sm:col-span-2 lg:col-span-1'>
						<h3 className='font-semibold mb-4 text-[#6ECBF4] text-base'>
							Мы в социальных сетях
						</h3>
						<div className='flex space-x-2 text-sm'>
							<Link
								href='https://www.youtube.com/channel/UC8l1fiaG4V8rTmJ-3hjqw7Q'
								target='_blank'
							>
								<Image
									alt='youTube icon footer'
									src='/youTubeFooterIcon.svg'
									width={28}
									height={28}
								/>
							</Link>
							<Link href='https://www.instagram.com/uormozyrr/' target='_blank'>
								<Image
									alt='instagram icon footer'
									src='/instaFooterIcon.svg'
									width={28}
									height={28}
								/>
							</Link>
						</div>
					</div>
				</div>

				<div className='border-t border-white/20 pt-4 text-center text-xs font-medium'>
					<p>© 2023 Все права защищены.</p>
				</div>
			</MaxWidthWrapper>
		</div>
	)
}

export default FooterContainerComponent

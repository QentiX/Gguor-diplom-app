import Image from 'next/image'
import MaxWidthWrapper from './MaxWidthWrapper'

const DisciplinesComponentContainer = () => {
	return (
		<MaxWidthWrapper className='mb-[53px]'>
			<div className='text-center mb-[60px]'>
				<h2 className='font-bold text-3xl text-[#0A3470]'>
					Спортивные отделения
				</h2>
			</div>
			<div className='flex flex-col gap-[20px]'>
				{/* Гребля на байдарках и каноэ */}
				<div className='flex flex-col lg:flex-row'>
					{/* Левая часть с изображением */}
					<div className='flex-1 relative lg:w-1/2'>
						<Image
							src='/disciplineRowing.png'
							alt='Фотография гребли'
							width={610}
							height={342}
							className='w-full h-full object-cover'
							style={{ objectPosition: 'center' }}
						/>
					</div>
					{/* Правая часть с текстом и статистикой */}
					<div
						className='flex-1 relative lg:w-1/2 p-6 lg:p-6'
						style={{ backgroundColor: '#0A3470' }}
					>
						<svg
							viewBox='0 0 1440 320'
							className='absolute top-0 left-0 w-full h-full opacity-5'
							preserveAspectRatio='none'
						>
							<path
								fill='#FFFFFF'
								d='M0,160L48,138.7C96,117,192,75,288,80C384,85,480,139,576,144C672,149,768,107,864,106.7C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
							></path>
						</svg>
						<div className='relative z-10 text-white'>
							<h3 className='text-2xl lg:text-xl font-semibold mb-5 text-center'>
								Гребля на байдарках и каноэ
							</h3>
							<p className='mb-8 lg:mb-12 text-[#B4B4B4] font-medium text-[14px] text-center'>
								Это олимпийский вид спорта, включающий соревнования в узких
								лодках (байдарках и каноэ), где спортсмены перемещаются по воде
								с помощью весел. Этот спорт сочетает скорость, выносливость,
								технику и координацию.
								<br />
								<br />
								За годы работы подготовлено:
							</p>

							<div className='grid grid-cols-3 gap-5 relative font-semibold text-base'>
								{['34', '81', '200'].map((value, index) => (
									<div
										key={index}
										className={
											index === 1
												? 'transform translate-y-0 xl:translate-y-10'
												: ''
										}
									>
										<StatItem
											value={value}
											label={['МСМК', 'КМС', 'МС'][index]}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				{/* Велоспорт */}
				<div className='flex flex-col lg:flex-row'>
					{/* Левая часть с текстом и статистикой */}
					<div
						className='flex-1 relative lg:w-1/2 p-6 lg:p-6'
						style={{ backgroundColor: '#fff' }}
					>
						<div className='absolute inset-0 z-0 opacity-70'>
							<img
								src='/dotsBg.svg'
								alt=''
								className='w-full h-full object-cover'
								aria-hidden='true'
							/>
						</div>
						<div className='relative z-10 text-black'>
							<h3 className='text-2xl lg:text-xl font-semibold mb-5 text-center'>
								Велоспорт
							</h3>
							<p className='mb-8 lg:mb-12 text-[#7E7F80] font-medium text-[14px] text-center'>
								Это совокупность спортивных дисциплин, в которых спортсмены
								соревнуются на скорость, выносливость или технику, используя
								велосипеды. Это олимпийский вид спорта, включающий разнообразные
								форматы гонок и дисциплин, как на открытом воздухе, так и в
								закрытых помещениях.
								<br />
								<br />
								За годы работы подготовлено:
							</p>

							<div className='grid grid-cols-3 gap-5 relative font-semibold'>
								{['26', '100', '12'].map((value, index) => (
									<div
										key={index}
										className={
											index === 1
												? 'transform translate-y-0 xl:translate-y-16'
												: ''
										}
									>
										<StatItem
											value={value}
											label={['МС', 'КМС', 'МСМК'][index]}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					{/* Правая часть с изображением */}
					<div className='flex-1 relative lg:w-1/2'>
						<Image
							src='/cyclingDisciplines.jpg'
							alt='Фотография гребли'
							width={610}
							height={342}
							className='w-full h-full object-cover'
							style={{ objectPosition: 'center' }}
						/>
					</div>
				</div>
				{/* Академическия гребля */}
				<div className='flex flex-col lg:flex-row'>
					{/* Левая часть с изображением */}
					<div className='flex-1 relative lg:w-1/2'>
						<Image
							src='/image3.jpg'
							alt='Фотография гребли'
							width={610}
							height={342}
							className='w-full h-full object-cover'
							style={{ objectPosition: 'center' }}
						/>
					</div>
					{/* Правая часть с текстом и статистикой */}
					<div
						className='flex-1 relative lg:w-1/2 p-6 lg:p-6'
						style={{ backgroundColor: '#0A3470' }}
					>
						<svg
							viewBox='0 0 1440 320'
							className='absolute top-0 left-0 w-full h-full opacity-5'
							preserveAspectRatio='none'
						>
							<path
								fill='#FFFFFF'
								d='M0,160L48,138.7C96,117,192,75,288,80C384,85,480,139,576,144C672,149,768,107,864,106.7C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
							></path>
						</svg>
						<div className='relative z-10 text-white'>
							<h3 className='text-2xl lg:text-xl font-semibold mb-5 text-center'>
								Академическия гребля
							</h3>
							<p className='mb-8 lg:mb-12 text-[#B4B4B4] font-medium text-[14px] text-center'>
								Это олимпийский вид спорта, включающий соревнования на узких
								лодках (байдарках и каноэ), где спортсмены перемещаются по воде
								с помощью вёсел. Этот спорт сочетает скорость, выносливость,
								технику и координацию.
								<br />
								<br />
								За годы работы подготовлено:
							</p>

							<div className='grid grid-cols-3 gap-5 relative font-semibold text-base'>
								{['13', '170', '69'].map((value, index) => (
									<div
										key={index}
										className={
											index === 1
												? 'transform translate-y-0 xl:translate-y-20'
												: ''
										}
									>
										<StatItem
											value={value}
											label={['МСМК', 'КМС', 'МС'][index]}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				{/* Легкая атлетика */}
				<div className='flex flex-col lg:flex-row'>
					{/* Левая часть с текстом и статистикой */}
					<div
						className='flex-1 relative lg:w-1/2 p-6 lg:p-6'
						style={{ backgroundColor: '#fff' }}
					>
						<div className='absolute inset-0 z-0 opacity-70'>
							<img
								src='/dotsBg.svg'
								alt=''
								className='w-full h-full object-cover'
								aria-hidden='true'
							/>
						</div>
						<div className='relative z-10 text-black'>
							<h3 className='text-2xl lg:text-xl font-semibold mb-5 text-center'>
								Легкая атлетика
							</h3>
							<p className='mb-8 lg:mb-12 text-[#7E7F80] font-medium text-[14px] text-center'>
								это совокупность спортивных дисциплин, основанных на
								естественных движениях человека: беге, прыжках, метаниях и
								ходьбе. Это один из древнейших и самых массовых видов спорта,
								часто называемый «королевой спорта». Легкоатлетические
								дисциплины входят в программу Олимпийских игр с 1896 года.
								<br />
								<br />
								За годы работы подготовлено:
							</p>

							<div className='grid grid-cols-2 relative font-semibold ml-0 xl:ml-20'>
								{['8', '32'].map((value, index) => (
									<div
										key={index}
										className={
											index === 1
												? 'transform translate-y-0 xl:translate-y-14'
												: ''
										}
									>
										<StatItem value={value} label={['МС', 'КМС'][index]} />
									</div>
								))}
							</div>
						</div>
					</div>
					{/* Правая часть с изображением */}
					<div className='flex-1 relative lg:w-1/2'>
						<Image
							src='/track-and-field-disciplines.jpg'
							alt='Фотография гребли'
							width={610}
							height={342}
							className='w-full h-full object-cover'
							style={{ objectPosition: 'center' }}
						/>
					</div>
				</div>
				{/* Тяжелая атлетика */}
				<div className='flex flex-col lg:flex-row'>
					{/* Левая часть с изображением */}
					<div className='flex-1 relative lg:w-1/2'>
						<Image
							src='/strongDiscipline.jpg'
							alt='Фотография гребли'
							width={610}
							height={342}
							className='w-full h-full object-cover'
							style={{ objectPosition: 'center' }}
						/>
					</div>
					{/* Правая часть с текстом и статистикой */}
					<div
						className='flex-1 relative lg:w-1/2 p-6 lg:p-6'
						style={{ backgroundColor: '#0A3470' }}
					>
						<div className='absolute inset-0 z-0 opacity-70'>
							<img
								src='/wave.svg'
								alt=''
								className='w-full h-full object-cover'
								aria-hidden='true'
							/>
						</div>
						<div className='relative z-10 text-white'>
							<h3 className='text-2xl lg:text-xl font-semibold mb-5 text-center'>
								Тяжелая атлетика
							</h3>
							<p className='mb-8 lg:mb-12 text-[#B4B4B4] font-medium text-[14px] text-center'>
								Это олимпийский вид спорта, в основе которого лежит выполнение
								упражнений по поднятию штанги над головой. Соревнования по
								тяжёлой атлетике на сегодняшний день включают в себя два
								упражнения: рывок и толчок. Тяжелоатлеты имеют три попытки в
								каждом упражнении.
								<br />
								<br />
								За годы работы подготовлено:
							</p>

							<div className='grid grid-cols-3 gap-5 relative font-semibold text-base'>
								{['11', '150', '77'].map((value, index) => (
									<div
										key={index}
										className={
											index === 1
												? 'transform translate-y-0 xl:translate-y-20'
												: ''
										}
									>
										<StatItem
											value={value}
											label={['МСМК', 'КМС', 'МС'][index]}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	)
}

const StatItem = ({ value, label }: { value: string; label: string }) => (
	<div className='pl-4 flex items-center'>
		<div className='text-base z-10'>{label}</div>
		<div className='text-[50px] font-medium mb-2 -ml-3 text-[#CCBBCC]/35'>
			{value}
		</div>
	</div>
)

export default DisciplinesComponentContainer

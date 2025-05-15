import Image from 'next/image'
import MaxWidthWrapper from './MaxWidthWrapper'

const DisciplinesComponentContainer = () => {
	return (
		<MaxWidthWrapper className='mb-[53px]'>
			<div className='text-center mb-[60px]'>
				<span className='font-bold text-3xl text-[#0A3470] mb-[50px]'>
					Спортивные отделения
				</span>
			</div>
			<div>
				<div className='flex'>
					<div>
						<Image src='/disciplineRowing.png' alt='Фотография гребли' width={610} height={342}/>
					</div>
					<div>
						<span></span>
						<p></p>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	)
}

export default DisciplinesComponentContainer

import AnnounSectionContainerComponent from '@/components/AnnounSectionContainerComponent'
import DisciplinesComponentContainer from '@/components/DisciplinesComponentContainer'
import FooterContainerComponent from '@/components/FooterContainerComponent'
import InfoSliderContainer from '@/components/InfoSliderContainer'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavBarMainPage from '@/components/NavBarMainPage'
import NewsSectionContainerComponent from '@/components/NewsSectionContainerComponent'
import SwiperComponent from '@/components/SwiperComponent'
import VideoSection from '@/components/VideoSection'

const Homepage = () => {
	return (
		<>
			<main className='flex-1'>
				<section className='bg-[#0A3470]'>
					<MaxWidthWrapper className='' children={<NavBarMainPage />} />
				</section>

				<section>
					<SwiperComponent />
				</section>

				<section className='mx-4'>
					<MaxWidthWrapper
						className=''
						children={<NewsSectionContainerComponent />}
					/>
				</section>

				<section>
					<DisciplinesComponentContainer />
				</section>

				<section className='mx-4'>
					<MaxWidthWrapper
						className=''
						children={<AnnounSectionContainerComponent />}
					/>
				</section>

				<section className='mx-4'>
					<MaxWidthWrapper className='' children={<VideoSection />} />
				</section>

				<section className='mx-4'>
					<InfoSliderContainer />
				</section>

			</main>
			<footer className='py-8 bg-[#0A3470]'>
				<FooterContainerComponent />
			</footer>
		</>
	)
}

export default Homepage

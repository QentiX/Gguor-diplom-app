import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavBarMainPage from '@/components/NavBarMainPage'
import SwiperComponent from '@/components/SwiperComponent'

const Homepage = () => {
	return (
		<main className=''>
			<section className='bg-[#0A3470]'>
				<MaxWidthWrapper className='' children={<NavBarMainPage />}/>
			</section>
			<section>
				<SwiperComponent />
			</section>
		</main>
	)
}

export default Homepage

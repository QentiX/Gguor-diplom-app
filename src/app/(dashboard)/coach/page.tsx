import Announcements from '@/components/Announcements'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import CoachAttendanceChartContainer from '@/components/CoachAttendanceChartContainer'
import { auth } from '@clerk/nextjs/server'

const CoachPage = async () => {
	const { userId } = await auth()
	return (
		<div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row'>
			{/* LEFT */}
			<div className='w-full xl:w-2/3'>
				<div className='h-full bg-white p-4 rounded-xl shadow-lg'>
					<h1 className='text-xl font-semibold'>Расписание</h1>
					<BigCalendarContainer type='coachId' id={userId!} />
				</div>
			</div>
			{/* RIGHT */}
			<div className='w-full xl:w-1/3 flex flex-col gap-8'>
				<CoachAttendanceChartContainer coachId={userId!} />
				<Announcements />
			</div>
		</div>
	)
}

export default CoachPage

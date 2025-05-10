import Announcements from '@/components/Announcements'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'
import AttendanceMonthAdminChartContainer from '@/components/AttendanceMonthAdminChartContainer'
import AverageScoreAdminChartContainer from '@/components/AverageScoreAdminChartContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import UserCard from '@/components/UserCard'

const AdminPage = async ({
	searchParams,
}: {
	searchParams: { [keys: string]: string | undefined }
}) => {
	return (
		<div className='p-4 flex gap-4 flex-col md:flex-row'>
			{/* LEFT */}
			<div className='w-full lg:w-2/3 flex flex-col gap-8'>
				{/* USER CARDS */}
				<div className='flex gap-4 justify-between flex-wrap'>
					<UserCard type='админ' />
					<UserCard type='студент' />
					<UserCard type='учителя' />
					<UserCard type='тренер' />
					<UserCard type='класс' />
					<UserCard type='занятия' />
				</div>
				{/* MIDDLE CHARTS */}
				<AverageScoreAdminChartContainer />
				<AttendanceChartContainer />
				<AttendanceMonthAdminChartContainer />
			</div>
			{/* RIGHT */}
			<div className='w-full lg:w-1/3 flex flex-col gap-8'>
				<EventCalendarContainer searchParams={searchParams} />
				<Announcements />
			</div>
		</div>
	)
}

export default AdminPage

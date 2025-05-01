import Announcements from '@/components/Announcements'
import AttendanceChart from '@/components/AttendanceChart'
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
				</div>
				{/* MIDDLE CHARTS */}
				<div className='w-full h-[510px]'>
					{/* ATTENDANCE CHART */}
					<AttendanceChart />
				</div>
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

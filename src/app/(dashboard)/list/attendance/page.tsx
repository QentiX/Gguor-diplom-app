import MonthSelection from '@/components/MonthSelection'

const AttendanceListPage = () => {
	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			<h1 className='hidden md:block text-lg font-semibold'>Посещаемость</h1>
			<div className='flex items-center'>
				<MonthSelection />
			</div>
		</div>
	)
}

export default AttendanceListPage

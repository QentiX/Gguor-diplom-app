'use client'

import ClassSelection from '@/components/ClassSelection'
import MonthSelection from '@/components/MonthSelection'
import SubjectSelection from '@/components/SubjectSelection'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const AttendanceListPage = () => {
	const [selectedMonth, setSelectedMonth] = useState()
	const [selectedClass, setSelectedClass] = useState()
	const [selectedSubject, setSelectedSubject] = useState()

	const onSearchHandler = () => {
		console.log(selectedMonth)
	}
	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			<h1 className='hidden md:block text-lg font-semibold mb-5'>
				Посещаемость
			</h1>
			<div className='flex items-center gap-3'>
				{/* <ClassSelection />

				<SubjectSelection /> */}

				<MonthSelection
					selectedMonth={(value: any) => setSelectedMonth(value)}
				/>

				<Button
					className='bg-[#0A3470] hover:bg-[#20467a]'
					onClick={() => onSearchHandler()}
				>
					Искать
				</Button>
			</div>
		</div>
	)
}

export default AttendanceListPage

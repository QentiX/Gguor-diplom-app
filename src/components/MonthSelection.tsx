'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { addMonths } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'

const MonthSelection = ({ selectedMonth }: { selectedMonth: any }) => {
	const today = new Date()

	const nextMonths = addMonths(new Date(), 0)
	const [month, setMonth] = useState(nextMonths)

	return (
		<div className=''>
			{/* <Popover>
				<PopoverTrigger>
					<div className='flex items-center gap-2 border-1 border-solid rounded-lg py-2 px-4 text-xs font-semibold'>
						Месяц
						<CalendarDays className='h-5 w-5' strokeWidth={1.6} />
					</div>
				</PopoverTrigger>
				<PopoverContent>Place content for the popover here.</PopoverContent>
			</Popover> */}
			<Popover>
				<PopoverTrigger asChild>
					<Button variant={'outline'} className='text-sm font-normal'>
						<CalendarIcon className='h-5 w-5' strokeWidth={1.7} />
						{moment(month).format('MMM yyyy')}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0'>
					<Calendar
						mode='single'
						month={month}
						onMonthChange={value => {
							selectedMonth(value)
							setMonth(value)
						}}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default MonthSelection

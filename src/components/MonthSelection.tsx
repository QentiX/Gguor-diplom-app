'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { addMonths } from 'date-fns'
import { ru } from "date-fns/locale"
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import 'moment/locale/ru'
import { useState } from 'react'

const MonthSelection = ({ selectedMonth }: { selectedMonth: any }) => {
	const today = new Date()

	const nextMonths = addMonths(new Date(), 0)
	const [month, setMonth] = useState(nextMonths)

	return (
		<div className=''>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant={'outline'} className='text-sm font-normal'>
						<CalendarIcon className='h-5 w-5' strokeWidth={1.7} />
						{moment(month).locale('ru').format('MMM yyyy')}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0'>
					<Calendar
						mode='single'
						locale={ru}
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

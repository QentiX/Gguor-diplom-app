'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { addMonths } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import 'moment/locale/ru'
import { useState } from 'react'

type MonthSelectionProps = {
	onChange: (month: number, year: number) => void
}

const MonthSelection = ({ onChange }: MonthSelectionProps) => {
	const today = new Date()
	const [selectedDate, setSelectedDate] = useState<Date>(addMonths(today, 0))

	// Правильное имя функции
	const handleMonthChange = (date: Date) => {
		setSelectedDate(date)
		const selectedMonth = date.getMonth() + 1
		const selectedYear = date.getFullYear()
		onChange(selectedMonth, selectedYear) // Используем переданный пропс
	}
	return (
		<div className=''>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant={'outline'} className='text-sm font-normal'>
						<CalendarIcon className='h-5 w-5' strokeWidth={1.7} />
						{moment(selectedDate).locale('ru').format('MMMM YYYY')}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					side='bottom'
					align='start'
					avoidCollisions={false}
				>
					<Calendar
						mode='single'
						locale={ru}
						month={selectedDate}
						onMonthChange={handleMonthChange}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default MonthSelection

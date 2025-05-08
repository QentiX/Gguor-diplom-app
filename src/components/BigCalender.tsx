'use client'

import moment from 'moment'
import 'moment/locale/ru'
import { useState } from 'react'
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const BigCalendar = ({
	data,
}: {
	data: { title: string; start: Date; end: Date }[]
}) => {
	const [view, setView] = useState<View>(Views.WEEK)

	const handleOnChangeView = (selectedView: View) => {
		setView(selectedView)
	}

	return (
		<Calendar
			localizer={localizer}
			events={data}
			startAccessor='start'
			endAccessor='end'
			views={['week', 'day']}
			view={view}
			style={{ height: '700px' }}
			onView={handleOnChangeView}
			min={new Date(2025, 1, 0, 8, 0, 0)}
			max={new Date(2025, 1, 0, 18, 0, 0)}
		/>
	)
}

export default BigCalendar

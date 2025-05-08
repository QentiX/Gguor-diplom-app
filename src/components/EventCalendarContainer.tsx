import Image from 'next/image'
import EventCalendar from './EventCalendar'
import EventList from './EventList'
import Link from 'next/link'
import { Ellipsis } from 'lucide-react'

const EventCalendarContainer = async ({
	searchParams,
}: {
	searchParams: { [keys: string]: string | undefined }
}) => {
	const { date } = searchParams
	return (
		<div className='bg-white p-4 rounded-md'>
			<EventCalendar />
			<div className='flex items-center justify-between'>
				<h1 className='text-xl font-semibold my-4'>События</h1>
				<Link
					href={'/list/events'}
				>
					<Ellipsis size={26} color='#B4B4B4'/>
				</Link>
				{/* <Image src='/moreDark.png' alt='' width={20} height={20} /> */}
			</div>
			<div className='flex flex-col gap-4'>
				<EventList dateParam={date} />
			</div>
		</div>
	)
}

export default EventCalendarContainer

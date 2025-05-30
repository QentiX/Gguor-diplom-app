import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Class, Event, Prisma } from '@prisma/client'

type EventList = Event & { class: Class }

const EventListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role
	const currentUserId = userId

	const columns = [
		{
			header: 'Название',
			accessor: 'title',
		},
		{
			header: 'Группа',
			accessor: 'class',
		},
		{
			header: 'Дата',
			accessor: 'date',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Начало',
			accessor: 'startTime',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Окончание',
			accessor: 'endTime',
			className: 'hidden md:table-cell',
		},
		...(role === 'admin'
			? [
					{
						header: 'Действия',
						accessor: 'action',
					},
			  ]
			: []),
	]

	const renderRow = (item: EventList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-[#F9F9FA] text-sm hover:bg-[#F3F3F3]'
		>
			<td className='flex items-center gap-4 p-4'>{item.title}</td>
			<td>{item.class?.name || '-'}</td>
			<td className='hidden md:table-cell'>
				{new Intl.DateTimeFormat('ru').format(item.startTime)}
			</td>
			<td className='hidden md:table-cell'>
				{item.startTime.toLocaleTimeString('ru', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				})}
			</td>
			<td className='hidden md:table-cell'>
				{item.endTime.toLocaleTimeString('ru', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				})}
			</td>
			<td>
				<div className='flex items-center gap-2'>
					{role === 'admin' && (
						<>
							<FormContainer table='event' type='update' data={item} />
							<FormContainer table='event' type='delete' id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams

	const p = page ? parseInt(page) : 1

	// URL PARAMS CONDITION

	const query: Prisma.EventWhereInput = {}

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case 'search':
						query.title = { contains: value, mode: 'insensitive' }
						break
					default:
						break
				}
			}
		}
	}

	// ROLE CONDITIONS

	switch (role) {
		case 'admin':
			break
		case 'teacher':
			query.OR = [
				{ classId: null },
				{ class: { supervisorId: currentUserId! } },
			]
			break
		case 'student':
			query.OR = [
				{ classId: null },
				{ class: { students: { some: { id: currentUserId! } } } },
			]
			break
		case 'coach':
			query.OR = [{ classId: null }]
			break
		default:
			break
	}

	const [data, count] = await prisma.$transaction([
		prisma.event.findMany({
			where: query,
			include: {
				class: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.event.count({ where: query }),
	])

	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>Все события</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						{role === 'admin' && <FormContainer table='event' type='create' />}
					</div>
				</div>
			</div>
			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={data} />
			{/* PAGINATION */}
			<Pagination page={p} count={count} />
		</div>
	)
}

export default EventListPage

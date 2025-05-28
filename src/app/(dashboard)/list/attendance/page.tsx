import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Attendance, Lesson, Prisma, Student } from '@prisma/client'

type AttendanceList = Attendance & { student: Student } & { lesson: Lesson }

const AttendanceListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role
	const currentUserId = userId

	const columns = [
		{
			header: 'Студент',
			accessor: 'name',
		},
		{
			header: 'Занятие',
			accessor: 'subName',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Дата',
			accessor: 'date',
			className: 'hidden lg:table-cell',
		},
		{
			header: 'Статус',
			accessor: 'present',
		},
		...(role === 'admin' || role === 'teacher' || role === 'coach'
			? [
					{
						header: 'Действия',
						accessor: 'action',
					},
			  ]
			: []),
	]

	const renderRow = (item: AttendanceList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-[#F9F9FA] text-sm hover:bg-[#F3F3F3]'
		>
			<td className='flex items-center gap-4 p-4'>
				{item.student.surname +
					' ' +
					item.student.name +
					' ' +
					item.student.patronymic}
			</td>
			<td className='hidden md:table-cell'>{item.lesson.name}</td>
			<td className='hidden lg:table-cell'>
				{/* {item.lesson.startTime */}
				{new Intl.DateTimeFormat('ru-RU').format(item.lesson.startTime)}
			</td>
			<td>{item.present === true ? 'Присутствовал' : 'Отсутствовал'}</td>
			<td>
				<div className='flex items-center gap-2'>
					{(role === 'admin' || role === 'teacher' || role === 'coach') && (
						<>
							<FormContainer table='attendance' type='update' data={item} />
							<FormContainer table='attendance' type='delete' id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams

	const p = page ? parseInt(page) : 1

	// URL PARAMS CONDITION

	const query: Prisma.AttendanceWhereInput = {}

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case 'lessonId':
						query.lessonId = parseInt(value)
						break
					case 'studentId':
						query.studentId = value
						break
					case 'search':
						query.OR = [
							{ lesson: { name: { contains: value, mode: 'insensitive' } } },
							{
								student: { name: { contains: value, mode: 'insensitive' } },
							},
						]
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
			query.OR = [{ lesson: { teacherId: currentUserId! } }]
			break
		case 'student':
			query.studentId = currentUserId!
			break
		case 'coach':
			query.OR = [{ lesson: { coachId: currentUserId! } }]
			break
		default:
			break
	}

	const [data, count] = await prisma.$transaction([
		prisma.attendance.findMany({
			where: query,
			include: {
				student: { select: { name: true, surname: true, patronymic: true } },
				lesson: { select: { name: true, startTime: true } },
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.attendance.count({ where: query }),
	])

	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>
					Вся посещаемость
				</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						{(role === 'admin' || role === 'teacher' || role === 'coach') && (
							<>
								<FormContainer table='attendance' type='create' />
							</>
						)}
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

export default AttendanceListPage

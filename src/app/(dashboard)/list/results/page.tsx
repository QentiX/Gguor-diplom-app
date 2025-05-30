import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

type ResultList = {
	id: number
	title: string
	studentName: string
	studentSurname: string
	teacherName: string
	teacherSurname: string
	teacherPatronymic: string
	coachName: string
	coachSurname: string
	coachPatronymic: string
	score: number
	className: string
	startTime: Date
}

const ResultListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role
	const currentUserId = userId

	const columns = [
		{
			header: 'Название экзамена/задания',
			accessor: 'name',
		},
		{
			header: 'Студент',
			accessor: 'student',
		},
		{
			header: 'Оценка',
			accessor: 'score',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Учитель/Тренер',
			accessor: 'teacher',
			className: 'hidden 2xl:table-cell',
		},
		{
			header: 'Группа',
			accessor: 'class',
			className: 'hidden xl:table-cell',
		},
		{
			header: 'Дата',
			accessor: 'date',
			className: 'hidden lg:table-cell',
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

	const renderRow = (item: ResultList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-[#F9F9FA] text-sm hover:bg-[#F3F3F3]'
		>
			<td className='flex items-center gap-4 p-4'>{item?.title}</td>
			<td>{item.studentName + ' ' + item.studentSurname}</td>
			<td className='hidden md:table-cell'>{item.score}</td>
			<td className='hidden 2xl:table-cell'>
				{item.teacherName && item.teacherSurname
					? item.teacherName +
					  ' ' +
					  item.teacherSurname +
					  ' ' +
					  item.teacherPatronymic
					: item.coachName +
					  ' ' +
					  item.coachSurname +
					  ' ' +
					  item.coachPatronymic}
			</td>
			<td className='hidden xl:table-cell'>{item.className}</td>
			<td className='hidden lg:table-cell'>
				{new Intl.DateTimeFormat('ru').format(item.startTime)}
			</td>
			<td>
				<div className='flex items-center gap-2'>
					{(role === 'admin' || role === 'teacher' || role === 'coach') && (
						<>
							<FormContainer table='result' type='update' data={item} />
							<FormContainer table='result' type='delete' id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams

	const p = page ? parseInt(page) : 1

	// URL PARAMS CONDITION

	const query: Prisma.ResultWhereInput = {}

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case 'studentId':
						query.studentId = value
						break
					case 'search':
						query.OR = [
							{ exam: { title: { contains: value, mode: 'insensitive' } } },
							{
								assignment: { title: { contains: value, mode: 'insensitive' } },
							},
							{ student: { name: { contains: value, mode: 'insensitive' } } },
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
			query.OR = [
				{ exam: { lesson: { teacherId: currentUserId! } } },
				{ assignment: { lesson: { teacherId: currentUserId! } } },
			]
			break
		case 'student':
			query.studentId = currentUserId!
			break
		case 'coach':
			query.OR = [
				{ exam: { lesson: { coachId: currentUserId! } } },
				{ assignment: { lesson: { coachId: currentUserId! } } },
			]
			break
		default:
			break
	}

	const [dataRes, count] = await prisma.$transaction([
		prisma.result.findMany({
			where: query,
			include: {
				student: { select: { name: true, surname: true } },
				exam: {
					include: {
						lesson: {
							select: {
								class: { select: { name: true } },
								teacher: {
									select: { name: true, surname: true, patronymic: true },
								},
								coach: {
									select: { name: true, surname: true, patronymic: true },
								},
							},
						},
					},
				},
				assignment: {
					include: {
						lesson: {
							select: {
								class: { select: { name: true } },
								teacher: {
									select: { name: true, surname: true, patronymic: true },
								},
								coach: {
									select: { name: true, surname: true, patronymic: true },
								},
							},
						},
					},
				},
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.result.count({ where: query }),
	])

	const data = dataRes.map(item => {
		const assessment = item.exam || item.assignment

		if (!assessment) return null

		const isExam = 'startTime' in assessment

		return {
			id: item.id,
			title: assessment.title,
			studentName: item.student.name,
			studentSurname: item.student.surname,
			teacherName: assessment.lesson.teacher?.name,
			teacherSurname: assessment.lesson.teacher?.surname,
			teacherPatronymic: assessment.lesson.teacher?.patronymic,
			coachName: assessment.lesson.coach?.name,
			coachSurname: assessment.lesson.coach?.surname,
			coachPatronymic: assessment.lesson.coach?.patronymic,
			score: item.score,
			className: assessment.lesson.class.name,
			startTime: isExam ? assessment.startTime : assessment.startDate,
		}
	})

	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>
					Все результаты
				</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						{(role === 'admin' || role === 'teacher' || role === 'coach') && (
							<>
								<FormContainer table='result' type='create' />
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

export default ResultListPage

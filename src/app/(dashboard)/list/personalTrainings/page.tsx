import FileIcon from '@/components/FileIcon'
import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import {
	Coach,
	PersonalTraining,
	Prisma,
	Student,
	TrainingFile,
} from '@prisma/client'
import Link from 'next/link'

type PersonalTrainingList = PersonalTraining & {
	student: Student
	coach: Coach
	files: TrainingFile[]
}

const PersonalTrainingListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role
	const currentUserId = userId

	const columns = [
		{ header: 'Заголовок', accessor: 'title' },
		{
			header: 'Описание',
			accessor: 'description',
			className: 'hidden lg:table-cell',
		},
		{
			header: 'Студент',
			accessor: 'student',
			className: 'hidden md:table-cell',
		},
		{ header: 'Тренер', accessor: 'coach', className: 'hidden md:table-cell' },
		{ header: 'Дата', accessor: 'date', className: 'hidden 2xl:table-cell' },
		{ header: 'Файлы', accessor: 'files' },
		...(role === 'admin' || role === 'coach'
			? [{ header: 'Действия', accessor: 'action' }]
			: []),
	]

	const renderRow = (item: PersonalTrainingList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-[#F9F9FA] text-sm hover:bg-[#F3F3F3]'
		>
			<td className='w-[150px]'>{item.title}</td>
			<td className='w-[200px] text-wrap hidden lg:table-cell xl:line-clamp-6'>
				{item.description}
			</td>
			<td className='hidden md:table-cell'>
				{item.student.surname +
					' ' +
					item.student.name +
					' ' +
					item.student.patronymic}
			</td>
			<td className='hidden md:table-cell'>
				{item.coach.surname +
					' ' +
					item.coach.name +
					' ' +
					item.coach.patronymic}
			</td>
			<td className='hidden 2xl:table-cell'>
				{new Intl.DateTimeFormat('ru-RU').format(new Date(item.createdAt))}
			</td>
			<td className=''>
				<div className='flex flex-wrap gap-1 w-[200px]'>
					{item.files?.length > 0 ? (
						item.files.map(file => (
							<Link
								key={file.id}
								href={file.url}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600 hover:underline text-sm flex items-center gap-1'
								title={file.originalName}
								download
							>
								<FileIcon type={file.fileType} />
								<span className=''>{file.originalName}</span>
							</Link>
						))
					) : (
						<span className='text-gray-400 italic text-sm'>Нет файлов</span>
					)}
				</div>
			</td>
			<td>
				{(role === 'admin' || role === 'coach') && (
					<div className='flex gap-2'>
						<FormContainer
							table='personalTrainings'
							type='update'
							data={item}
						/>
						<FormContainer
							table='personalTrainings'
							type='delete'
							id={item.id}
						/>
					</div>
				)}
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams
	const p = page ? parseInt(page) : 1

	const query: Prisma.PersonalTrainingWhereInput = {}

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case 'search':
						query.OR = [
							{
								title: { contains: value, mode: 'insensitive' },
							},
							{
								student: {
									name: { contains: value, mode: 'insensitive' },
								},
							},
							{
								coach: {
									name: { contains: value, mode: 'insensitive' },
								},
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
		case 'coach':
			query.coachId = currentUserId!
			break
		case 'student':
			query.studentId = currentUserId!
			break
		default:
			break
	}

	const [data, count] = await prisma.$transaction([
		prisma.personalTraining.findMany({
			where: query,
			include: {
				student: { select: { name: true, surname: true, patronymic: true } },
				coach: { select: { name: true, surname: true, patronymic: true } },
				files: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
			orderBy: { createdAt: 'desc' },
		}),
		prisma.personalTraining.count({ where: query }),
	])

	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>
					Индивидуальные тренировки
				</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						{(role === 'admin' || role === 'coach') && (
							<>
								<FormContainer table='personalTrainings' type='create' />
							</>
						)}
					</div>
				</div>
			</div>

			<Table columns={columns} renderRow={renderRow} data={data} />

			<Pagination page={p} count={count} />
		</div>
	)
}

export default PersonalTrainingListPage

import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Class, Prisma, Student } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type StudentList = Student & { class: Class }

const StudentListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const { sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const columns = [
		{
			header: 'Информация',
			accessor: 'info',
		},
		{
			header: 'ID студента/ученика',
			accessor: 'studentId',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Группа',
			accessor: 'grade',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Телефон',
			accessor: 'phone',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Адрес',
			accessor: 'address',
			className: 'hidden xl:table-cell',
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

	const renderRow = (item: StudentList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-[#F9F9FA] text-sm hover:bg-[#F3F3F3]'
		>
			<td className='flex items-center gap-4 p-4'>
				<Image
					src={item.img || '/no-profile-picture.svg'}
					alt=''
					width={40}
					height={40}
					className='md:hidden xl:block w-10 h-10 rounded-full object-cover'
				/>
				<div className='flex flex-col'>
					<h3 className='font-semibold'>
						{item.surname + ' ' + item.name + ' ' + item.patronymic}
					</h3>
					<p className='text-xs text-gray-500'>{item.class.name}</p>
				</div>
			</td>
			<td className='hidden md:table-cell'>{item.username}</td>
			<td className='hidden md:table-cell'>{item.class.name}</td>
			<td className='hidden md:table-cell'>{item.phone}</td>
			<td className='hidden xl:table-cell'>{item.address}</td>
			<td>
				<div className='flex items-center gap-2'>
					<Link href={`/list/students/${item.id}`}>
						<button className='w-7 h-7 flex items-center justify-center rounded-full bg-[#3780D2]'>
							<Image src='/eye.svg' alt='' width={16} height={16} />
						</button>
					</Link>
					{role === 'admin' && (
						<FormContainer table='student' type='delete' id={item.id} />
					)}
				</div>
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams

	const p = page ? parseInt(page) : 1

	// URL PARAMS CONDITION

	const query: Prisma.StudentWhereInput = {}

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case 'teacherId':
						query.class = {
							lessons: {
								some: {
									teacherId: value,
								},
							},
						}
						break
					case 'search':
						query.name = { contains: value, mode: 'insensitive' }
						break
					default:
						break
				}
			}
		}
	}

	const [data, count] = await prisma.$transaction([
		prisma.student.findMany({
			where: query,
			include: {
				class: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.student.count({ where: query }),
	])
	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>
					Все студенты/ученики
				</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						{role === 'admin' && (
							<FormContainer table='student' type='create' />
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

export default StudentListPage

import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Prisma, Subject, Teacher } from '@prisma/client'

type SubjectList = Subject & { teachers: Teacher[] }

const SubjectListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const { sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const columns = [
		{
			header: 'Название предмета',
			accessor: 'name',
		},
		{
			header: 'Учитель',
			accessor: 'teachers',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Действия',
			accessor: 'action',
		},
	]

	const renderRow = (item: SubjectList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-[#F9F9FA] text-sm hover:bg-[#F3F3F3]'
		>
			<td className='flex items-center gap-4 p-4'>{item.name}</td>
			<td className='hidden md:table-cell'>
				{item.teachers
					.map(
						teacher =>
							teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic
					)
					.join(',')}
			</td>
			<td>
				<div className='flex items-center gap-2'>
					{role === 'admin' && (
						<>
							<FormContainer table='subject' type='update' data={item} />
							<FormContainer table='subject' type='delete' id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams

	const p = page ? parseInt(page) : 1

	// URL PARAMS CONDITION

	const query: Prisma.SubjectWhereInput = {}

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
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
		prisma.subject.findMany({
			where: query,
			include: {
				teachers: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.subject.count({ where: query }),
	])

	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>Все предметы</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						{role === 'admin' && (
							<FormContainer table='subject' type='create' />
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

export default SubjectListPage

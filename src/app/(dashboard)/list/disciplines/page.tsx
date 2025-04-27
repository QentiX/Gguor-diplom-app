import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Coach, Disciplines, Prisma } from '@prisma/client'
import Image from 'next/image'

type DisciplineList = Disciplines & { coaches: Coach[] }

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
			header: 'Тренер',
			accessor: 'teachers',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Действия',
			accessor: 'action',
		},
	]

	const renderRow = (item: DisciplineList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#ecf8ff]'
		>
			<td className='flex items-center gap-4 p-4'>{item.name}</td>
			<td className='hidden md:table-cell'>
				{item.coaches.map(coach => coach.name).join(',')}
			</td>
			<td>
				<div className='flex items-center gap-2'>
					{role === 'admin' && (
						<>
							<FormModal table='subject' type='update' data={item} />
							<FormModal table='subject' type='delete' id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams

	const p = page ? parseInt(page) : 1

	// URL PARAMS CONDITION

	const query: Prisma.DisciplinesWhereInput = {}

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
		prisma.disciplines.findMany({
			where: query,
			include: {
				coaches: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.disciplines.count({ where: query }),
	])

	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>
					Все дисциплины
				</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						<button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#B3E2FD]'>
							<Image
								src='/sliders-horizontal.svg'
								alt=''
								width={14}
								height={14}
							/>
						</button>
						<button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#B3E2FD]'>
							<Image
								src='/list-filter-plus.svg'
								alt=''
								width={16}
								height={16}
							/>
						</button>
						{role === 'admin' && <FormModal table='subject' type='create' />}
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

import FormContainer from '@/components/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { News, Prisma } from '@prisma/client'
import Image from 'next/image'

type NewsList = News

const NewsListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const { sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const columns = [
		{
			header: 'Обложка',
			accessor: 'cover',
		},
		{
			header: 'Название',
			accessor: 'title',
			className: 'hidden md:table-cell',
		},
		{
			header: 'Содержимое',
			accessor: 'content',
			className: 'hidden 2xl:table-cell',
		},
		{
			header: 'Дата добавления',
			accessor: 'AddDate',
			className: 'hidden lg:table-cell',
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

	const renderRow = (item: NewsList) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-[#F9F9FA] text-sm hover:bg-[#F3F3F3]'
		>
			<td className='flex items-center gap-4 p-4'>
				<Image
					src={item.thumbnail}
					alt=''
					width={100}
					height={100}
					className='w-25 h-15 object-cover'
				/>
			</td>
			<td className='hidden md:table-cell line-clamp-2'>{item.title}</td>
			<td className='hidden 2xl:table-cell line-clamp-2'>
				<div className='line-clamp-1'>{item.content}</div>
			</td>
			<td className='hidden lg:table-cell'>
				{new Intl.DateTimeFormat('ru').format(item.createdAt)}
			</td>
			<td>
				<div className='flex items-center gap-2'>
					{role === 'admin' && (
						<>
							<FormContainer table='news' type='update' data={item} />
							<FormContainer table='news' type='delete' id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	)

	const { page, ...queryParams } = searchParams

	const p = page ? parseInt(page) : 1

	// URL PARAMS CONDITION

	const query: Prisma.NewsWhereInput = {}

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

	const [data, count] = await prisma.$transaction([
		prisma.news.findMany({
			where: query,
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.news.count({ where: query }),
	])

	return (
		<div className='bg-white p-4 rounded-xl flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>Все новости</h1>
				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
					<TableSearch />
					<div className='flex items-center gap-4 self-end'>
						{role === 'admin' && <FormContainer table='news' type='create' />}
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

export default NewsListPage

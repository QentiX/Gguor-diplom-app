import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { resultsData, role } from '@/lib/data'
import Image from 'next/image'

type Result = {
	id: number
	subject: string
	class: string
	teacher: string
	student: string
	type: 'exam' | 'assignment'
	date: string
	score: number
}

const columns = [
	{
		header: 'Название предмета/дисциплины',
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
		header: 'Учитель/тренер',
		accessor: 'teacher',
		className: 'hidden lg:table-cell',
	},
	{
		header: 'Класс',
		accessor: 'class',
		className: 'hidden lg:table-cell',
	},
	{
		header: 'Дата',
		accessor: 'date',
		className: 'hidden md:table-cell',
	},
	{
		header: 'Действия',
		accessor: 'action',
	},
]

const ResultListPage = () => {
	const renderRow = (item: Result) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#ecf8ff]'
		>
			<td className='flex items-center gap-4 p-4'>{item.subject}</td>
			<td>{item.student}</td>
			<td className='hidden md:table-cell'>{item.score}</td>
			<td className='hidden lg:table-cell'>{item.teacher}</td>
			<td className='hidden lg:table-cell'>{item.class}</td>
			<td className='hidden md:table-cell'>{item.date}</td>
			<td>
				<div className='flex items-center gap-2'>
					{role === 'admin' ||
						(role === 'teacher' && (
							<>
								<FormModal table='result' type='update' data={item} />
								<FormModal table='result' type='delete' id={item.id} />
							</>
						))}
				</div>
			</td>
		</tr>
	)

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
						{role === 'admin' ||
							(role === 'teacher' && (
								<FormModal table='result' type='create' />
							))}
					</div>
				</div>
			</div>
			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={resultsData} />
			{/* PAGINATION */}
			<Pagination />
		</div>
	)
}

export default ResultListPage

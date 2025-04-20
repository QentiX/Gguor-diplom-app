import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { classesData, role } from '@/lib/data'
import Image from 'next/image'

type Class = {
	id: number
	name: string
	capacity: number
	grade: number
	supervisor: string
}

const columns = [
	{
		header: 'Название класса',
		accessor: 'name',
	},
	{
		header: 'Кол-во студентов/учеников',
		accessor: 'capacity',
		className: 'hidden lg:table-cell',
	},
	{
		header: 'Класс',
		accessor: 'grade',
		className: 'hidden sm:table-cell',
	},
	{
		header: 'Классный руководитель/куратор',
		accessor: 'supervisor',
		className: 'hidden md:table-cell',
	},
	{
		header: 'Действия',
		accessor: 'action',
	},
]

const ClassListPage = () => {
	const renderRow = (item: Class) => (
		<tr
			key={item.id}
			className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#ecf8ff]'
		>
			<td className='flex items-center gap-4 p-4'>{item.name}</td>
			<td className='hidden lg:table-cell'>{item.capacity}</td>
			<td className='hidden sm:table-cell'>{item.grade}</td>
			<td className='hidden md:table-cell'>{item.supervisor}</td>
			<td>
				<div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
			</td>
		</tr>
	)

	return (
		<div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
			{/* TOP */}
			<div className='flex items-center justify-between'>
				<h1 className='hidden md:block text-lg font-semibold'>Все классы</h1>
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
						{role === "admin" && <FormModal table="class" type="create" />}
					</div>
				</div>
			</div>
			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={classesData} />
			{/* PAGINATION */}
			<Pagination />
		</div>
	)
}

export default ClassListPage

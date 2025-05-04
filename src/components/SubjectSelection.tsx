

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import prisma from '@/lib/prisma'

const SubjectSelection = async () => {

	const data = await prisma.subject.findMany()
	return (
		<Select>
			<SelectTrigger className='w-[200px]'>
				<SelectValue placeholder='Выберите предмет' />
			</SelectTrigger>
			<SelectContent>
				{data.map((item, index) => (
					<SelectItem key={index} value={item.name}>{item.name}</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default SubjectSelection

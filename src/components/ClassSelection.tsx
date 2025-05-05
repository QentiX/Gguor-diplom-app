'use client'

import GlobalApi from '@/app/_services/GlobalApi'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

const ClassSelection = ({ selectedClass }: { selectedClass: any }) => {
	const [classes, setClasses] = useState<any[]>([])

	useEffect(() => {
		GetAllClassList()
	}, [])

	const GetAllClassList = () => {
		GlobalApi.GetAllClasses().then((resp: any) => {
			setClasses(resp.data)
		})
	}
	// const data = await prisma.class.findMany()
	return (
		<Select onValueChange={(e: any) => selectedClass(e)}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Выберите класс' />
			</SelectTrigger>
			<SelectContent>
				{classes.map((item, index) => (
					<SelectItem key={index} value={item.name}>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default ClassSelection

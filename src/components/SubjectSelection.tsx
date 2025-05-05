'use client'

import GlobalApi from '@/app/_services/GlobalApi'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

const SubjectSelection = ({selectedSubject}:{selectedSubject:any}) => {
	const [subjects, setSubjects] = useState<any[]>([])
	const [disciplines, setDisciplines] = useState<any[]>([])

	useEffect(() => {
		GetAllClassList(), GetAllDisciplineList()
	}, [])

	const GetAllClassList = () => {
		GlobalApi.GetAllSubjects().then((resp: any) => {
			setSubjects(resp.data)
		})
	}

	const GetAllDisciplineList = () => {
		GlobalApi.GetAllDisciplines().then((resp: any) => {
			setDisciplines(resp.data)
		})
	}
	// const data = await prisma.subject.findMany()
	return (
		<Select onValueChange={(e: any) => selectedSubject(e)}>
			<SelectTrigger className='w-[240px]'>
				<SelectValue placeholder='Выберите предмет/дисциплину' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Предметы</SelectLabel>
					{subjects.map((item, index) => (
						<SelectItem key={index} value={item.name}>
							{item.name}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Дисциплины</SelectLabel>
					{disciplines.map((item, index) => (
						<SelectItem key={index} value={item.name}>
							{item.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
			{/* <SelectContent>
				{subjects.map((item, index) => (
					<SelectItem key={index} value={item.name}>{item.name}</SelectItem>
				))}
			</SelectContent> */}
		</Select>
	)
}

export default SubjectSelection

'use client'

import {
	deleteAnnouncement,
	deleteAssignment,
	deleteAttendance,
	deleteClass,
	deleteCoach,
	deleteDiscipline,
	deleteEvent,
	deleteExam,
	deleteLesson,
	deleteNews,
	deletePersonalTraining,
	deleteResult,
	deleteStudent,
	deleteSubject,
	deleteTeacher,
	deleteVideo,
} from '@/lib/actions'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'
import { FormContainerProps } from './FormContainer'

const deleteActionMap = {
	subject: deleteSubject,
	discipline: deleteDiscipline,
	class: deleteClass,
	teacher: deleteTeacher,
	student: deleteStudent,
	coach: deleteCoach,
	lesson: deleteLesson,
	exam: deleteExam,
	assignment: deleteAssignment,
	result: deleteResult,
	attendance: deleteAttendance,
	event: deleteEvent,
	announcement: deleteAnnouncement,
	video: deleteVideo,
	news: deleteNews,
	personalTrainings: deletePersonalTraining,
}


// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
	loading: () => <h1>Загрузка...</h1>,
})
const StudentForm = dynamic(() => import('./forms/StudentForm'), {
	loading: () => <h1>Загрузка...</h1>,
})
const CoachForm = dynamic(() => import('./forms/CoachForm'), {
	loading: () => <h1>Загрузка...</h1>,
})
const SubjectForm = dynamic(() => import('./forms/SubjectForm'), {
	loading: () => <h1>Загрузка...</h1>,
})
const DisciplineForm = dynamic(() => import('./forms/DisciplineForm'), {
	loading: () => <h1>Загрузка...</h1>,
})
const ClassForm = dynamic(() => import('./forms/ClassForm'), {
	loading: () => <h1>Загрузка...</h1>,
})
const ExamForm = dynamic(() => import('./forms/ExamForm'), {
	loading: () => <h1>Loading...</h1>,
})
const EventForm = dynamic(() => import('./forms/EventForm'), {
	loading: () => <h1>Loading...</h1>,
})
const AnnouncementForm = dynamic(() => import('./forms/AnnouncementForm'), {
	loading: () => <h1>Loading...</h1>,
})
const ResultForm = dynamic(() => import('./forms/ResultForm'), {
	loading: () => <h1>Loading...</h1>,
})
const AssignmentForm = dynamic(() => import('./forms/AssignmentForm'), {
	loading: () => <h1>Loading...</h1>,
})
const LessonForm = dynamic(() => import('./forms/LessonForm'), {
	loading: () => <h1>Loading...</h1>,
})
const AttendanceForm = dynamic(() => import('./forms/AttendanceForm'), {
	loading: () => <h1>Loading...</h1>,
})
const VideosLibraryForm = dynamic(() => import('./forms/VideosLibraryForm'), {
	loading: () => <h1>Loading...</h1>,
})
const NewsForm = dynamic(() => import('./forms/NewsForm'), {
	loading: () => <h1>Loading...</h1>,
})
const PersonalTrainingForm = dynamic(
	() => import('./forms/PersonalTrainingForm'),
	{
		loading: () => <h1>Loading...</h1>,
	}
)

const forms: {
	[key: string]: (
		setOpen: Dispatch<SetStateAction<boolean>>,
		type: 'create' | 'update',
		data?: any,
		relatedData?: any
	) => JSX.Element
} = {
	subject: (setOpen, type, data, relatedData) => (
		<SubjectForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	discipline: (setOpen, type, data, relatedData) => (
		<DisciplineForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	class: (setOpen, type, data, relatedData) => (
		<ClassForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	teacher: (setOpen, type, data, relatedData) => (
		<TeacherForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	coach: (setOpen, type, data, relatedData) => (
		<CoachForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	student: (setOpen, type, data, relatedData) => (
		<StudentForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	exam: (setOpen, type, data, relatedData) => (
		<ExamForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	event: (setOpen, type, data, relatedData) => (
		<EventForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	announcement: (setOpen, type, data, relatedData) => (
		<AnnouncementForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	result: (setOpen, type, data, relatedData) => (
		<ResultForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	assignment: (setOpen, type, data, relatedData) => (
		<AssignmentForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	lesson: (setOpen, type, data, relatedData) => (
		<LessonForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	attendance: (setOpen, type, data, relatedData) => (
		<AttendanceForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	video: (setOpen, type, data, relatedData) => (
		<VideosLibraryForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
	news: (setOpen, type, data) => (
		<NewsForm type={type} data={data} setOpen={setOpen} />
	),
	personalTrainings: (setOpen, type, data, relatedData) => (
		<PersonalTrainingForm
			type={type}
			data={data}
			setOpen={setOpen}
			relatedData={relatedData}
		/>
	),
}

const FormModal = ({
	table,
	type,
	data,
	id,
	relatedData,
}: FormContainerProps & { relatedData?: any }) => {
	const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
	const bgColor =
		type === 'create'
			? 'bg-[#3780D2]'
			: type === 'update'
			? 'bg-[#3780D2]'
			: 'bg-[#F54162]'

	const [open, setOpen] = useState(false)

	const Form = () => {
		const [state, formAction] = useFormState(deleteActionMap[table], {
			success: false,
			error: false,
		})

		const router = useRouter()

		useEffect(() => {
			if (state.success) {
				toast(`${table} был удален!`)
				setOpen(false)
				router.refresh()
			}
		}, [state, router])

		return type === 'delete' && id ? (
			<form action={formAction} className='p-4 flex flex-col gap-4'>
				<input type='text | number' name='id' value={id} hidden />
				<span className='text-center font-medium'>
					Все данные будут потеряны. Вы уверены, что хотите удалить данный
					элемент?
				</span>
				<button className='bg-red-700 text-white py-2 px-4 rounded-xl border-none w-max self-center'>
					Удалить
				</button>
			</form>
		) : type === 'create' || type === 'update' ? (
			forms[table](setOpen, type, data, relatedData)
		) : (
			'Form not found!'
		)
	}

	return (
		<>
			<button
				className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
				onClick={() => setOpen(true)}
			>
				<Image src={`/${type}.svg`} alt='' width={16} height={16} />
			</button>
			{open && (
				<div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
					<div className='bg-white p-4 rounded-xl relative w-[90%] md:w-[70%] md:top-8 lg:w-[78%] xl:w-[78%] 2xl:w-[40%]'>
						<Form />
						<div
							className='absolute top-4 right-4 cursor-pointer'
							onClick={() => setOpen(false)}
						>
							<Image src='/close.svg' alt='' width={20} height={20} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default FormModal

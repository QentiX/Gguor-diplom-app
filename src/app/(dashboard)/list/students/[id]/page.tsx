import Announcements from '@/components/Announcements'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import ExportStudentReportButton from '@/components/ExportAllInfoStudentWord'
import FormContainer from '@/components/FormContainer'
import PerfomanceAdminChartContainer from '@/components/PerfomanceAdminChartContainer'
import StudentAttendanceCard from '@/components/StudentAttendanceCard'
import { extractGradeLevel } from '@/lib/extractGradeLevel'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Class, Student } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const SingleStudentPage = async ({
	params: { id },
}: {
	params: { id: string }
}) => {
	const { sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const student:
		| (Student & {
				class: Class & { _count: { lessons: number } }
		  })
		| null = await prisma.student.findUnique({
		where: { id },
		include: {
			class: { include: { _count: { select: { lessons: true } } } },
		},
	})

	if (!student) {
		return notFound()
	}
	return (
		<div className='flex-1 p-4 flex flex-col gap-4 2xl:flex-row'>
			{/* LEFT */}
			<div className='w-full 2xl:w-2/3'>
				{/* TOP */}
				<div className='flex flex-col lg:flex-row gap-4 mb-7'>
					{/* USER INFO CARD */}
					<div className='bg-[#F3F3F3] py-6 px-4 rounded-xl flex-1 flex gap-4 shadow-lg'>
						<div className='w-1/3'>
							<Image
								src={student.img || '/no-profile-picture.svg'}
								alt=''
								width={144}
								height={144}
								className='w-36 h-36 rounded-full object-cover'
							/>
						</div>
						<div className='w-2/3 flex flex-col justify-between gap-4'>
							<div className='flex items-center gap-4'>
								<h1 className='text-xl font-semibold'>
									{student.surname +
										' ' +
										student.name +
										' ' +
										student.patronymic}
								</h1>
								{role === 'admin' && (
									<div className='flex items-center gap-2'>
										<FormContainer
											table='student'
											type='update'
											data={student}
										/>
										<ExportStudentReportButton
											studentId={student.id}
											studentName={`${student.surname}_${student.name}_${student.patronymic}`}
										/>
									</div>
								)}
							</div>
							<p className='text-sm text-gray-500'>{student.status || '-'}</p>
							<div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/123.png' alt='' width={15} height={15} />
									<span>{student.position}</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/date.png' alt='' width={14} height={14} />
									<span>
										{new Intl.DateTimeFormat('ru').format(student.birthday)}
									</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/mail.png' alt='' width={14} height={14} />
									<span>{student.email || '-'}</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/phone.png' alt='' width={14} height={14} />
									<span>{student.phone || '-'}</span>
								</div>
							</div>
						</div>
					</div>
					{/* SMALL CARDS */}
					<div className='flex-1 flex gap-4 justify-between flex-wrap'>
						{/* CARD */}
						<div className='bg-white p-4 rounded-xl shadow-lg flex gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%]'>
							<Image
								src='/singleAttendance.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<Suspense fallback='загрузка...'>
								<StudentAttendanceCard id={student.id} />
							</Suspense>
						</div>
						{/* CARD */}
						<div className='bg-white p-4 rounded-xl shadow-lg flex gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%]'>
							<Image
								src='/singleBranch.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<div className=''>
								<h1 className='text-xl font-semibold'>
									{extractGradeLevel(student.class.name)}
								</h1>
								<span className='text-sm text-gray-400'>Класс/Курс</span>
							</div>
						</div>
						{/* CARD */}
						<div className='bg-white p-4 rounded-xl shadow-lg flex gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%]'>
							<Image
								src='/singleLesson.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<div className=''>
								<h1 className='text-xl font-semibold'>
									{student.class._count.lessons}
								</h1>
								<span className='text-sm text-gray-400'>Уроков</span>
							</div>
						</div>
						{/* CARD */}
						<div className='bg-white p-4 rounded-xl shadow-lg flex gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%]'>
							<Image
								src='/singleClass.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<div className=''>
								<h1 className='text-xl font-semibold'>{student.class.name}</h1>
								<span className='text-sm text-gray-400'>Группа</span>
							</div>
						</div>
					</div>
				</div>
				{/* BOTTOM */}
				<div className='mt-4 bg-white rounded-xl shadow-lg p-4 h-[830px]'>
					<h1 className='text-xl font-semibold'>Расписание</h1>
					<BigCalendarContainer type='classId' id={student.class.id} />
				</div>
			</div>
			{/* RIGHT */}
			<div className='w-full 2xl:w-1/3 flex flex-col gap-7'>
				<div className='bg-white p-4 rounded-xl shadow-lg'>
					<h1 className='text-xl font-semibold'>Тэги</h1>
					<div className='mt-4 flex gap-4 flex-wrap text-xs font-semibold'>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/lessons?classId=${student.class.id}`}
						>
							Занятия ученика
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/teachers?classId=${student.class.id}`}
						>
							Преподаватели ученика
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/exams?classId=${student.class.id}`}
						>
							Экзамены ученика
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/assignments?classId=${student.class.id}`}
						>
							Задания ученика
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/results?studentId=${student.id}`}
						>
							Результаты ученика
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/personalTrainings?studentId=${student.id}`}
						>
							Индивидуальные тренировки ученика
						</Link>
					</div>
				</div>
				<PerfomanceAdminChartContainer studentId={student.id} />
				<Announcements />
			</div>
		</div>
	)
}

export default SingleStudentPage

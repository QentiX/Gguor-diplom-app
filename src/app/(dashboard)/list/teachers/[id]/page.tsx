import Announcements from '@/components/Announcements'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import FormContainer from '@/components/FormContainer'
import PerformanceTeacherChartContainer from '@/components/PerformanceTeacherChartContainer'
import TeacherAttendanceStats from '@/components/TeacherAttendanceStats'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Teacher } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const SingleTeacherPage = async ({
	params: { id },
}: {
	params: { id: string }
}) => {
	const { sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const teacher:
		| (Teacher & {
				_count: { subjects: number; lessons: number; classes: number }
		  })
		| null = await prisma.teacher.findUnique({
		where: { id },
		include: {
			_count: {
				select: {
					subjects: true,
					lessons: true,
					classes: true,
				},
			},
		},
	})

	if (!teacher) {
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
								src={teacher.img || '/no-profile-picture.svg'}
								alt='teacher image'
								width={144}
								height={144}
								className='w-36 h-36 rounded-full object-cover'
							/>
						</div>
						<div className='w-2/3 flex flex-col justify-between gap-4'>
							<div className='flex items-center gap-4'>
								<h1 className='text-xl font-semibold'>
									{teacher.surname +
										' ' +
										teacher.name +
										' ' +
										teacher.patronymic}
								</h1>
								{role === 'admin' && (
									<FormContainer table='teacher' type='update' data={teacher} />
								)}
							</div>
							<p className='text-sm text-[#818181]'>{teacher.position}</p>
							<div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/123.png' alt='' width={15} height={15} />
									<span>{teacher.qualification || '-'}</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/date.png' alt='' width={14} height={14} />
									<span>
										{new Intl.DateTimeFormat('ru').format(teacher.birthday)}
									</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/mail.png' alt='' width={14} height={14} />
									<span>{teacher.email || '-'}</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/phone.png' alt='' width={14} height={14} />
									<span>{teacher.phone || '-'}</span>
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
								<TeacherAttendanceStats teacherId={teacher.id} />
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
									{teacher._count.subjects}
								</h1>
								<span className='text-sm text-gray-400'>Предмета</span>
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
									{teacher._count.lessons}
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
								<h1 className='text-xl font-semibold'>
									{teacher._count.classes}
								</h1>
								<span className='text-sm text-gray-400'>Групп</span>
							</div>
						</div>
					</div>
				</div>
				{/* BOTTOM */}
				<div className='mt-4 bg-white rounded-xl shadow-lg p-4 h-[830px]'>
					<h1 className='text-xl font-semibold'>Расписание</h1>
					<BigCalendarContainer type='teacherId' id={teacher.id} />
				</div>
			</div>
			{/* RIGHT */}
			<div className='w-full 2xl:w-1/3 flex flex-col gap-7'>
				<div className='bg-white p-4 rounded-xl shadow-lg'>
					<h1 className='text-xl font-semibold'>Тэги</h1>
					<div className='mt-4 flex gap-4 flex-wrap text-xs font-semibold'>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/classes?supervisorId=${teacher.id}`}
						>
							Группы учителя
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/students?teacherId=${teacher.id}`}
						>
							Ученики учителя
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/lessons?teacherId=${teacher.id}`}
						>
							Занятия учителя
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/exams?teacherId=${teacher.id}`}
						>
							Экзамены учителя
						</Link>
						<Link
							className='p-3 rounded-lg shadow-md bg-[#F9F9FA]'
							href={`/list/assignments?teacherId=${teacher.id}`}
						>
							Задания от учителя
						</Link>
					</div>
				</div>
				<PerformanceTeacherChartContainer teacherId={teacher.id} />
				<Announcements />
			</div>
		</div>
	)
}

export default SingleTeacherPage

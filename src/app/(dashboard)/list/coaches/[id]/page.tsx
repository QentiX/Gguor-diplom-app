import Announcements from '@/components/Announcements'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import FormContainer from '@/components/FormContainer'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Coach } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const SingleCoachPage = async ({
	params: { id },
}: {
	params: { id: string }
}) => {
	const { sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const coach:
		| (Coach & {
				_count: { disciplines: number; lessons: number }
		  })
		| null = await prisma.coach.findUnique({
		where: { id },
		include: {
			_count: {
				select: {
					disciplines: true,
					lessons: true,
				},
			},
		},
	})

	if (!coach) {
		return notFound()
	}
	return (
		<div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
			{/* LEFT */}
			<div className='w-full xl:w-2/3'>
				{/* TOP */}
				<div className='flex flex-col lg:flex-row gap-4'>
					{/* USER INFO CARD */}
					<div className='bg-[#B3E2FD] py-6 px-4 rounded-md flex-1 flex gap-4'>
						<div className='w-1/3'>
							<Image
								src={coach.img || '/no-profile-picture.svg'}
								alt='coach image'
								width={144}
								height={144}
								className='w-36 h-36 rounded-full object-cover'
							/>
						</div>
						<div className='w-2/3 flex flex-col justify-between gap-4'>
							<div className='flex items-center gap-4'>
								<h1 className='text-xl font-semibold'>
									{coach.name + ' ' + coach.surname}
								</h1>
								{role === 'admin' && (
									<FormContainer table='coach' type='update' data={coach} />
								)}
							</div>
							<p className='text-sm text-[#818181]'>{coach.position || '-'}</p>
							<div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/123.png' alt='' width={15} height={15} />
									<span>{coach.qualification || '-'}</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/date.png' alt='' width={14} height={14} />
									<span>
										{new Intl.DateTimeFormat('ru').format(coach.birthday)}
									</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/mail.png' alt='' width={14} height={14} />
									<span>{coach.email || '-'}</span>
								</div>
								<div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
									<Image src='/phone.png' alt='' width={14} height={14} />
									<span>{coach.phone || '-'}</span>
								</div>
							</div>
						</div>
					</div>
					{/* SMALL CARDS */}
					<div className='flex-1 flex gap-4 justify-between flex-wrap'>
						{/* CARD */}
						<div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
							<Image
								src='/singleAttendance.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<div className=''>
								<h1 className='text-xl font-semibold'>90%</h1>
								<span className='text-sm text-gray-400'>Посещаемость</span>
							</div>
						</div>
						{/* CARD */}
						<div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
							<Image
								src='/singleBranch.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<div className=''>
								<h1 className='text-xl font-semibold'>
									{coach._count.disciplines}
								</h1>
								<span className='text-sm text-gray-400'>Дисциплины</span>
							</div>
						</div>
						{/* CARD */}
						<div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
							<Image
								src='/singleLesson.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<div className=''>
								<h1 className='text-xl font-semibold'>
									{coach._count.lessons}
								</h1>
								<span className='text-sm text-gray-400'>Уроков</span>
							</div>
						</div>
						{/* CARD */}
						<div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
							<Image
								src='/singleClass.png'
								alt=''
								width={24}
								height={24}
								className='w-6 h-6'
							/>
							<div className=''>
								<h1 className='text-xl font-semibold'>-</h1>
								<span className='text-sm text-gray-400'>-</span>
							</div>
						</div>
					</div>
				</div>
				{/* BOTTOM */}
				<div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
					<h1 className='text-xl font-semibold'>Расписание</h1>
					<BigCalendarContainer type='coachId' id={coach.id} />
				</div>
			</div>
			{/* RIGHT */}
			<div className='w-full xl:w-1/3 flex flex-col gap-4'>
				<div className='bg-white p-4 rounded-md'>
					<h1 className='text-xl font-semibold'>Тэги</h1>
					<div className='mt-4 flex gap-4 flex-wrap text-xs font-semibold'>
						<Link
							className='p-3 rounded-md bg-[#B3E2FD]'
							href={`/list/lessons?coachId=${coach.id}`}
						>
							Занятия тренера
						</Link>
						<Link
							className='p-3 rounded-md bg-[#B3E2FD]'
							href={`/list/exams?coachId=${coach.id}`}
						>
							Экзамены тренера
						</Link>
						<Link
							className='p-3 rounded-md bg-[#B3E2FD]'
							href={`/list/assignments?coachId=${coach.id}`}
						>
							Задания тренера
						</Link>
					</div>
				</div>
				{/* <Performance /> */}
				<Announcements />
			</div>
		</div>
	)
}

export default SingleCoachPage

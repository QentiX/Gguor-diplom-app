'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Class, Coach, Student, Teacher } from '@prisma/client'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import Announcements from '@/components/Announcements'
import { cn } from '@/lib/utils'

type ProfileData = 
  | (Student & { class: Class & { _count: { lessons: number } } })
  | (Teacher & { _count: { subjects: number; lessons: number; classes: number } })
  | (Coach & { _count: { disciplines: number; lessons: number } })

const ProfilePageContent = ({
  data,
  userRole
}: {
  data: ProfileData
  userRole: 'student' | 'teacher' | 'coach'
}) => {
  const calendarType = 
    userRole === 'student' ? 'classId' :
    userRole === 'teacher' ? 'teacherId' :
    'coachId'

  const getRoleSpecificContent = () => {
    const commonInfo = (
      <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
        <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
          <Image src='/date.png' alt='' width={14} height={14} />
          <span>
            {new Intl.DateTimeFormat('ru').format(
              new Date('birthday' in data ? data.birthday : new Date())
            )}
          </span>
        </div>
        <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
          <Image src='/mail.png' alt='' width={14} height={14} />
          <span>{'email' in data ? data.email : '-'}</span>
        </div>
        <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
          <Image src='/phone.png' alt='' width={14} height={14} />
          <span>{'phone' in data ? data.phone : '-'}</span>
        </div>
      </div>
    )

    switch (userRole) {
      case 'student':
        const student = data as Student & { class: Class & { _count: { lessons: number } } }
        return (
          <>
            <p className='text-sm text-gray-500'>{student.position}</p>
            {commonInfo}
            <div className='flex-1 flex gap-4 justify-between flex-wrap mt-4'>
              <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]'>
                <Image src='/singleClass.png' alt='' width={24} height={24} className='w-6 h-6' />
                <div>
                  <h1 className='text-xl font-semibold'>{student.class.name}</h1>
                  <span className='text-sm text-gray-400'>Группа</span>
                </div>
              </div>
            </div>
          </>
        )

      case 'teacher':
        const teacher = data as Teacher & { _count: { subjects: number; lessons: number; classes: number } }
        return (
          <>
            <p className='text-sm text-[#818181]'>{teacher.position}</p>
            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
              <Image src='/123.png' alt='' width={15} height={15} />
              <span>{teacher.qualification || '-'}</span>
            </div>
            {commonInfo}
          </>
        )

      case 'coach':
        const coach = data as Coach & { _count: { disciplines: number; lessons: number } }
        return (
          <>
            <p className='text-sm text-[#818181]'>{coach.position || '-'}</p>
            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
              <Image src='/123.png' alt='' width={15} height={15} />
              <span>{coach.qualification || '-'}</span>
            </div>
            {commonInfo}
          </>
        )
    }
  }

  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
      <div className='w-full xl:w-2/3'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='bg-[#B3E2FD] py-6 px-4 rounded-md flex-1 flex gap-4'>
            <div className='w-1/3'>
              <Image
                src={'img' in data ? data.img || '/no-profile-picture.svg' : '/no-profile-picture.svg'}
                alt='Profile image'
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>
                  {'name' in data ? `${data.name} ${data.surname}` : 'Профиль'}
                </h1>
              </div>
              {getRoleSpecificContent()}
            </div>
          </div>
        </div>

        <div className='mt-4 bg-white rounded-md p-4 h-[760px]'>
          <h1 className='text-xl font-semibold'>Расписание</h1>
          {/* <BigCalendarContainer 
            type={calendarType}
            id={data.id} 
          /> */}
        </div>
      </div>

      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <Announcements />
      </div>
    </div>
  )
}

export default ProfilePageContent
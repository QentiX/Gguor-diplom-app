'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


const LoginPage = () => {
	const { isLoaded, isSignedIn, user } = useUser()

	const router = useRouter()

	useEffect(() => {
		const role = user?.publicMetadata.role

		if (role) {
			router.push(`/${role}`)
		}
	}, [user, router])

	return (
		<div className='h-screen flex items-center justify-center bg-[#eff2f5]'>
			<SignIn.Root>
				<SignIn.Step
					name='start'
					className='bg-white p-10 pt-5 rounded-xl shadow-2xl flex flex-col gap-2 w-96'
				>
					<div className='flex justify-center mb-2'>
						<Image src='/blueGguorLogo.svg' alt='' width={95} height={95} />
					</div>
					<div className='flex justify-center mb-3'>
						<h2 className='text-gray-400 text-sm'>Вход в личный кабинет</h2>
					</div>
					<Clerk.GlobalError className='text-sm text-red-400' />
					<Clerk.Field name='identifier' className='flex flex-col gap-2 mb-3'>
						<Clerk.Label className='text-xs font-medium'>Логин</Clerk.Label>
						<Clerk.Input
							type='text'
							required
							className='p-2 rounded-md ring-1 ring-gray-300 text-sm'
						/>
						<Clerk.FieldError className='text-xs text-red-400' />
					</Clerk.Field>
					<Clerk.Field name='password' className='flex flex-col gap-2 mb-5'>
						<Clerk.Label className='text-xs font-medium'>Пароль</Clerk.Label>
						<Clerk.Input
							type='password'
							required
							className='p-2 rounded-md ring-1 ring-gray-300'
						/>
						<Clerk.FieldError className='text-xs text-red-400' />
					</Clerk.Field>
					<SignIn.Action
						submit
						className='bg-[#0A3470] text-white my-1 rounded-xl text-sm p-[10px]'
					>
						Войти
					</SignIn.Action>
				</SignIn.Step>
			</SignIn.Root>
		</div>
	)
}

export default LoginPage

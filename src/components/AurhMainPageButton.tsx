'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { LayoutDashboard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthButton() {
	const { isSignedIn, user } = useUser()
	const myRole = user?.publicMetadata?.role as string

	if (!isSignedIn) {
		return (
			<Link href='/sign-in'>
				<Image alt='user icon' src='/user.svg' width={20} height={20} />
			</Link>
		)
	}

	return (
		<UserButton>
			<UserButton.MenuItems>
				<UserButton.Link
					label='Главная страница ИИС'
					labelIcon={<LayoutDashboard size={16} />}
					href={`/${myRole}`}
				/>
			</UserButton.MenuItems>
		</UserButton>
	)
}

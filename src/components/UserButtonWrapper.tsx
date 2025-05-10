'use client'

import { UserButton } from '@clerk/nextjs'
import { ContactRound } from 'lucide-react'

export const UserButtonWrapper = ({
	userRole,
	userId,
}: {
	userRole: string
	userId: string
}) => {
	return (
		<UserButton>
			{userRole !== 'admin' && (
				<UserButton.MenuItems>
					<UserButton.Link
						label='Профиль ИИС'
						labelIcon={<ContactRound size={16} />}
						href={`/list/${
							userRole === 'coach' ? userRole + 'es' : userRole + 's'
						}/${userId}`}
					/>
				</UserButton.MenuItems>
			)}
		</UserButton>
	)
}

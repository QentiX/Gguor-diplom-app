import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ruRU } from '@clerk/localizations'

const montserrat = Montserrat({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
	title: 'Gguor',
	description: 'Next.js Gguor Management System',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider localization={ruRU}>
			<html lang='ru'>
				<body className={montserrat.className}>{children}</body>
			</html>
		</ClerkProvider>
	)
}

import { cn } from '@/lib/utils'
import { ruRU } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import configSite from '@/configSite/site'

const montserrat = Montserrat({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
	title: configSite.title,
	description: configSite.description,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider localization={ruRU}>
			<html lang='ru'>
				<body
					className={cn('w-screen overflow-x-hidden', montserrat.className)}
				>
					{children} <ToastContainer position='bottom-right' theme='light' />
				</body>
			</html>
		</ClerkProvider>
	)
}

import { ruRU } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

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
				<body className={montserrat.className}>
					{children} <ToastContainer position="bottom-right" theme="light"/>
				</body>
			</html>
		</ClerkProvider>
	)
}

import type { Metadata } from 'next'
import Link from 'next/link';
import './globals.css';


export const metadata: Metadata = {
  title: 'SUMATRA BUS',
 
  description: 'Ini halaman Home',
}

export default function RootLayout({children} : {
  children : React.ReactNode
}) {
  return (
      <html lang='en'>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body>
          {children}
        </body>
      </html>
  )
}

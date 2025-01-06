import type { Metadata } from 'next'
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';


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
        <ToastContainer />
          {children}
        </body>
      </html>
  )
}

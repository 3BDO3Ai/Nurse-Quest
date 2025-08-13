import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nurse Quest',
  description: 'Interactive medical simulation for students',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="hospital-bg min-h-screen">
        <main className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-5xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  )
}

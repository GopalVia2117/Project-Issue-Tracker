import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "issues", href: "/issues" }
    ]
  return (
    <div className="flex space-x-6 h-14 items-center mb-5 px-5 border-b">
          <Link href="/">Logo</Link>
          <ul className='flex space-x-6'>
              {links.map((link, index) => <li key={index}><Link className="text-zinc-500 hover:text-zinc-800 transition-colors" href={link.href}>{link.label}</Link></li>)}
          </ul>
    </div>
  )
}

export default Navbar
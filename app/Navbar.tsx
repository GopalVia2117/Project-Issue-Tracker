"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "issues", href: "/issues" }
    ]
  return (
    <div className="flex space-x-6 h-14 items-center mb-5 px-5 border-b">
          <Link href="/">Logo</Link>
          <ul className='flex space-x-6'>
              {links.map((link, index) => <li key={index}>
                  <Link className={classNames({
                      'text-zinc-900': link.href === currentPath,
                      'text-zinc-500': link.href !== currentPath,
                      'hover:text-zinc-800 transition-colors': true
                  })
                  } href={link.href}>{link.label}</Link>
              </li>)}
          </ul>
    </div>
  )
}

export default Navbar
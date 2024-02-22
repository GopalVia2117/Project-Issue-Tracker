"use client";

import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
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

          <Box>
               {status === "authenticated" && <Link href="/api/auth/signout">Log out</Link>}
                { status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
         </Box>
    </div>
  )
}

export default Navbar
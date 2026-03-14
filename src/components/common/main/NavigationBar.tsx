import React from 'react'
import Link from 'next/link'

export default function NavigationBar() {
    const leftNavLinks = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ]
    const rightNavLinks = [
        {
            title: "Login",
            href: "/login",
        },
        {
            title: "Register",
            href: "/register",
        },
    ]
  return (
    <nav className='flex justify-between items-center gap-4'>
        <div className='flex items-center gap-4'>
            {leftNavLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                    {link.title}
                </Link>
            ))}
        </div>
        <div className='flex items-center gap-4'>
            {rightNavLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                    {link.title}
                </Link>
            ))}
        </div>
    </nav>
  )
}

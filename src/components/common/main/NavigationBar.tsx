"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";

export default function NavigationBar() {
  const leftNavLinks = [
    {
      title: "WeLearn",
      href: "/",
      icon: "/icons/app-icon.svg",
    },
    {
      title: "FILE",
      href: "/",
    },
    {
      title: "EDIT",
      href: "/about",
    },
    {
      title: "CONTACT",
      href: "/contact",
    },
  ];
  const middleNavLinks = [
    {
      title: "🔥 7 DAYS",
      href: "/",
    },
    {
      title: "LEVEL 1 (240/100) XP",
      href: "/",
    },
    {
      title: "🪙 120.5K",
      href: "/",
    },
  ];
  const rightNavLinksData = [
    {
      title: "",
      href: "",
      icon: <FaCirclePlay />,
      iconClicked: <FaCirclePlay />,
    },
    {
      title: "",
      href: "",
      icon: <IoIosNotifications />,
      iconClicked: <IoIosNotificationsOff />,
    },
    {
      title: "10.00 AM",
      href: "",
    },
  ];

  const [clickedStates, setClickedStates] = useState<boolean[]>(
    rightNavLinksData.map(() => false)
  );

  const toggleClicked = (index: number) => {
    setClickedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };
  return (
    <nav className="flex z-100 px-6 py-1 text-card fixed top-0 w-screen justify-between font-bold items-center gap-4">
      <div className="flex items-center gap-4">
        {leftNavLinks.map((link) => (
          <Link
            className="flex items-center gap-2"
            key={link.title}
            href={link.href}
          >
            {link.icon && (
              <Image src={link.icon} alt={link.title} width={24} height={24} />
            )}
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {middleNavLinks.map((link) => (
          <Link
            className="flex items-center gap-2"
            key={link.title}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {rightNavLinksData.map((link, index) =>
          link.icon ? (
            <button
              className="flex items-center gap-2 cursor-pointer"
              key={link.title || index}
              onClick={() => toggleClicked(index)}
            >
              {clickedStates[index] ? link.iconClicked : link.icon}
            </button>
          ) : (
            <Link
              className="flex items-center gap-2"
              key={link.title || index}
              href={link.href}
            >
              {link.title}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

"use client";
import { usePathname } from "next/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkModeButton from "@/components/header/darkmode.component";
import Image from "next/image";
import Link from "next/link";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface Linkitems {
  key: number;
  name: string;
  href: string;
}

export default function Navbar({ menuItems }: any) {
  const pathname = usePathname();
  const currentRoute = pathname;

  function NavigationLink({ href, name }: Linkitems) {
    return (
      <a
        href={href}
        className={
          currentRoute === href
            ? "border-indigo-500 text-gray-900 dark:text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium"
            : "border-transparent text-gray-500 dark:text-gray-50 hover:border-gray-300 hover:text-gray-700 inline-flex items-center text-base px-1 pt-1 border-b-2 font-medium"
        }
      >
        {name}
      </a>
    );
  }

  function NavigationLinkDisclosure({ href, name }: Linkitems) {
    return (
      <Disclosure.Button
        as="a"
        href={href}
        className={
          currentRoute === href
            ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            : "border-transparent text-gray-600 dark:text-gray-50 hover:bg-gray-50 dark:hover:text-indigo-700 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        }
      >
        {name}
      </Disclosure.Button>
    );
  }

  return (
    <Disclosure
      as="nav"
      className="px-2 py-2.5 dark:border-gray-700 dark:bg-gray-900 sm:px-4"
    >
      {({ open }) => (
        <>
          <div className="flex flex-wrap items-center justify-between mx-auto">
            <Link className="flex items-center" href="/">
              <Image
                className="block float-left w-auto h-12 lg:hidden dark:bg-blue100"
                src="/svgrepo-com.svg"
                alt="Testblog"
                width={48}
                height={48}
              />

              <Image
                className="hidden float-left w-auto h-12 lg:block dark:bg-blue100"
                src="/svgrepo-com.svg"
                alt="Testblog"
                width={48}
                height={48}
              />
            </Link>

            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {/* Desktop View */}
              {menuItems.map((menuItem: any, index: number) => (
                <NavigationLink
                  key={index}
                  href={menuItem.href}
                  name={menuItem.name}
                />
              ))}
            </div>

            <div className="flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
              <DarkModeButton />
            </div>

            <div className="flex items-center lg:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Only show up in Mobile view */}
              {menuItems.map((menuItem: any, index: number) => (
                <NavigationLinkDisclosure
                  key={index}
                  href={menuItem.href}
                  name={menuItem.name}
                />
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkModeButton from "@/components/header/darkmode.component";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import {
  useRouter,
  usePathname,
  useParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface Linkitems {
  key: number;
  name: string;
  href: string;
}

export default function Navbar({ menuItems }: any) {
  // Internationalization
  const locale = useParams()?.locale as LocaleTypes;
  const pathname = usePathname();
  const currentRoute = pathname;
  const { t } = useTranslation(locale, "common");

  const { push } = useRouter();
  const router = useRouter();
  const urlSegments = useSelectedLayoutSegments();

  async function handleLocaleChange(event: any) {
    const newLocale = event;

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    router.push(`/${newLocale}/${urlSegments.join("/")}`);
  }

  function NavigationLink({ href, name }: Linkitems) {
    return (
      <a
        href={href}
        className={
          currentRoute === href
            ? "border-indigo-500 text-gray900 dark:text-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium"
            : "border-transparent text-gray500 dark:text-gray50 hover:border-gray300 hover:text-gray700 inline-flex items-center text-base px-1 pt-1 border-b-2 font-medium"
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
            : "border-transparent text-gray600 dark:text-gray100 hover:bg-gray100 dark:hover:text-indigo-700 hover:border-gray300 hover:text-gray800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        }
      >
        {name}
      </Disclosure.Button>
    );
  }

  return (
    <Disclosure
      as="nav"
      className="px-2 py-2.5 dark:border-gray700 dark:bg-gray900 sm:px-4"
    >
      {({ open }) => (
        <>
          <div className="flex flex-wrap items-center justify-between mx-auto">
            <Link className="flex items-center" href={`/${locale}/`}>
              <Image
                className="block float-left w-auto h-12 lg:hidden dark:bg-blue100"
                src="/images/svgrepo-com.svg"
                alt="Testblog"
                width={48}
                height={48}
              />

              <Image
                className="hidden float-left w-auto h-12 lg:block dark:bg-blue100"
                src="/images/svgrepo-com.svg"
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
                  // href={menuItem.href}
                  href={`/${locale}${menuItem.href}`}
                  name={menuItem.name}
                />
              ))}
            </div>

            <div className="flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
              <DarkModeButton />

              {/* Language dropdown */}
              <Menu as="div" className="relative flex-shrink-0 ml-4">
                <div>
                  <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">
                      {" "}
                      {t("user.languageswitcher")}
                    </span>
                    <GlobeAmericasIcon
                      className="w-8 h-8 hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 block w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            handleLocaleChange("en-US");
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          🇺🇸 {t("languages.en")}
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            handleLocaleChange("de-DE");
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          🇩🇪 {t("languages.de")}
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <div className="flex items-center lg:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray400 rounded-md hover:text-gray500 hover:bg-gray100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                  // href={menuItem.href}
                  href={`/${locale}${menuItem.href}`}
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

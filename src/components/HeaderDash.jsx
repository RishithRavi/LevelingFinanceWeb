// components/Header.js
import { Bars3Icon, BellIcon } from '@heroicons/react/20/solid'
import ThemeToggle from './ThemeToggle'
import { UserButton } from '@clerk/nextjs'

export default function HeaderDash({ setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between bg-gray-100 px-4 py-4 shadow-sm dark:bg-gray-900 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-900 dark:text-white xl:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex-1 text-center text-lg font-semibold text-gray-900 dark:text-white">
        Educator Dashboard
      </div>
      <div className="flex items-center space-x-8">
        <ThemeToggle />
        <button
          type="button"
          className="text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* <a
          href="#"
          className="text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        > */}
        <span className="sr-only">Your profile</span>
        <UserButton className="h-8 w-8 rounded-full" />
        {/* <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          /> */}
        {/* </a> */}
      </div>
    </header>
  )
}

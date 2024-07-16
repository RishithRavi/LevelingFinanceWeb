import { Fragment } from 'react'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  SignalIcon,
  XMarkIcon,
  TrophyIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { Logomark } from './Logo'

const navigation = [
  { name: 'Overview', href: '#', icon: ChartBarSquareIcon, current: true },
  { name: 'Leaderboard', href: '#', icon: TrophyIcon, current: false },
  { name: 'Classes', href: '#', icon: FolderIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-1 flex-col bg-white p-6 ring-1 ring-white/10 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="w-108 flex items-center space-x-reverse">
                    <svg viewBox="0 0 55 40" aria-hidden="true">
                      <Logomark
                        width="40"
                        height="40"
                        className="fill-indigo-500"
                      />
                    </svg>
                    <h1 className="text-xl font-semibold text-white">
                      Leveling Finance
                    </h1>
                  </div>
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <nav className="mt-8">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
                            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
                          'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                        )}
                      >
                        <item.icon
                          className="mr-3 h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden xl:fixed xl:inset-y-0 xl:flex xl:w-72 xl:flex-col">
        <div className="flex flex-grow flex-col bg-white p-6 ring-1 ring-white/10 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="w-108 flex items-center space-x-reverse">
              <svg viewBox="0 0 55 40" aria-hidden="true">
                <Logomark width="40" height="40" className="fill-indigo-500" />
              </svg>
              <h1 className="text-xl font-bold italic text-black dark:text-white">
                Leveling Finance
              </h1>
            </div>
          </div>
          <nav className="mt-8 flex-1">
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                  )}
                >
                  <item.icon
                    className="mr-3 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

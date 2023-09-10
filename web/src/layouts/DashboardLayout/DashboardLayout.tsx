import { Link, NavLink, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth';

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, CalendarIcon, HomeIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, XMarkIcon, PencilSquareIcon, ArrowLeftOnRectangleIcon, GiftIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

  const { logOut } = useAuth()

  const navigation = [
    { name: 'Dashboard', to: routes.dashboard(), icon: HomeIcon, current: true, live: true},
    { name: 'Goals', to: routes.goals(), icon: PencilSquareIcon, current: false, live: true},
    { name: 'Focus Area', to: routes.focusArea(), icon: CalendarIcon, current: false, live: true},
    { name: 'Development', to: "", icon: BuildingLibraryIcon, current: false, live: false},
    { name: 'Chat', to: "", icon: ChatBubbleLeftRightIcon, current: false, live: false},
    { name: 'Show Appreciation', to: "", icon: GiftIcon, current: false, live: false},
    { name: 'Settings', to: "", icon: Cog6ToothIcon, current: false, live: false},
    // { name: 'Log out', to: logOut(), icon: ArrowLeftOnRectangleIcon, current: false, live: true},
  ]
  const teams = [
    { id: 1, name: 'Malik Smith', href: '#', initial: 'MS', current: false },
    { id: 2, name: 'Cassandra Johnson', href: '#', initial: 'CJ', current: false },
    { id: 3, name: 'Richard Brown', href: '#', initial: 'RB', current: false },
  ]

  
  const { currentUser } = useAuth()

  const email = currentUser.email
  
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
  <>
    <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-14"
                        src="../logo-image.png"
                        alt="Technology Playground"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <NavLink
                                  activeClassName="activeLink bg-gray-800 text-white" 
                                  className="link text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  to={item.to}                        >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                  {item.live || ( <span className="text-xs text-gray-500 italic py-1 ml-auto">coming soon</span> )}
                                </NavLink>
                              </li>
                            ))}
                            <li>
                              <button
                                type="button"
                                className="link text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                onClick={() => logOut()} >
                                <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                Log out 
                            </button>
                          </li>
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your team</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex my-4 h-16 shrink-0 items-center">
              <img
                className="h-14"
                src="../logo-image.png"
                alt="Technology Playground"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          activeClassName="activeLink bg-gray-800 text-white" 
                          className="link text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          to={item.to}                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                          {item.live || ( <span className="text-xs text-gray-500 italic py-1 ml-auto">coming soon</span> )}
                        </NavLink>
                      </li>
                    ))}              
                    <li>
                      <button
                        type="button"
                        className="link text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        onClick={() => logOut()} >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        Log out 
                      </button>
                    </li>
                  </ul>
                </li>
                
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">The Team <span className="text-xs text-gray-500 italic py-1 px-4">coming soon</span></div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-800" aria-hidden="true" />
                    {/* <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="../../../assets/profiles/bruce_canedy_profile.png"
                      alt=""
                    /> */}
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{email}</span>
                    
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">Employee Review Co-pilot</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <UserCircleIcon className="h-8 w-8 rounded-full bg-white" aria-hidden="true" />
            {/* <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src="../../../assets/profiles/bruce_canedy_profile.png"
              alt=""
            /> */}
          </a>
        </div>

        <main className="flex h-screen flex-col py-10 lg:pl-72 bg-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
          
          {children}
         


          </div>
        </main>

      </div>
  
  
  </>
  )
};

export default DashboardLayout;

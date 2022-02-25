import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {UserIcon} from '@heroicons/react/solid'
import Link from 'next/link';


const navigation = [
    {name: '소개', href: '#', current: true},
    {name: '사용방법', href: '#', current: false},
    {name: '서비스 이용하기', href: '/meeting/lobby', current: false},
    // {name: 'Calendar', href: '#', current: false},
    // {name: 'Reports', href: '#', current: false},
]
const userNavigation = [
    {name: '프로필', href: '/user/detailInfo'},
    {name: '로그인', href: '/user/login'},
    // {name: 'Sign out', href: '#'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navi() {
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <Menu as="nav" className="bg-gray-800">
                    {({open}) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        {/*대표 아이콘*/}
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        {/*PC버전에서 보이는 네비바*/}
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <Link href={item.href} key={item.name}>
                                                        <a
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'px-3 py-2 rounded-md text-sm font-medium'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/*PC버전에서 보이는 사용자 버튼*/}
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <favicon className="h-6 w-6" aria-hidden="true"/>
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="ml-3 relative">
                                                <div>
                                                    <Menu.Button
                                                        className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                        <span className="sr-only">Open user menu</span>
                                                        <UserIcon className="h-8 w-8 fill-gray-300"/>
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
                                                    <Menu.Items
                                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({active}) => (
                                                                    <Link href={item.href}>
                                                                        <a
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </a>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    {/*모바일에서 보이는 메뉴*/}
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Menu.Button
                                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                            )}
                                        </Menu.Button>
                                    </div>
                                </div>
                            </div>
                            {/*모바일에서 보이는 메뉴리스트*/}
                            <div className="md:hidden">
                                <Menu.Items className="px-2 pt-2 pb-3 space-y-1 divide-y divide-gray-700 sm:px-3">
                                    <div>
                                        {navigation.map((item) => (
                                            <Menu.Item
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                <div>
                                                    {item.name}
                                                </div>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                    <div>
                                        {userNavigation.map((item) => (
                                            <Menu.Item
                                                key={item.name}
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                            >
                                                <div>
                                                    {item.name}
                                                </div>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                                <div>
                                    <Menu.Items className="mt-3 px-2 space-y-1">

                                    </Menu.Items>
                                </div>
                            </div>
                        </>
                    )}
                </Menu>
            </div>
        </>
    )
}
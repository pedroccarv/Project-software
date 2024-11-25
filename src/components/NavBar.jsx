import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { List, Bell, X, UserCircle } from "@phosphor-icons/react"
import Logo from "../assets/logo.png"
import { useAuth } from '../services/AuthContext'; // Importando o contexto de autenticação
import { useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Convidar Amigos', href: '/convidar-amigos', current: false },
    { name: 'Alugar', href: '/quadras', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
    const { user, logout } = useAuth(); // Obtendo informações do usuário logado e a função de logout
    const navigate = useNavigate();
    return (
        <Disclosure as="nav" className="p-4 shadow-md">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Botão do menu mobile */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-600">
                            <span className="sr-only">Abrir menu principal</span>
                            <List
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <X
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </Disclosure.Button>
                    </div>

                    {/* Logo e navegação desktop */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src={Logo}
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? "page" : undefined}
                                        className={classNames(
                                            item.current
                                                ? "bg-orange-500 text-white"
                                                : "text-gray-800 hover:text-orange-500",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Botões de notificações e perfil */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                        {/* Botão de notificações */}
                        <button
                            type="button"
                            className="relative rounded-full p-1 "
                        >
                            <span className="sr-only">Visualizar notificações</span>
                            <div className="relative">
                                <div className="absolute right-0 h-2 w-2 bg-red-600 animate-ping rounded-full" />
                                <Bell aria-hidden="true" className="h-6 w-6" />
                            </div>
                        </button>

                        {/* Menu de perfil */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="relative flex items-center rounded-full p-1 text-sm hover:text-orange-500 hover:underline">
                                    <span className="sr-only">Abrir menu de usuário</span>
                                    <UserCircle  className="h-6 w-6" />
                                    <span className="ml-2">{user?.name || "Usuário"}</span>
                                </Menu.Button>
                            </div>
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <Menu.Item>
                                    <button
                                        onClick={() => navigate("/editar-perfil")}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Editar Perfil
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sair
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-800 hover:bg-orange-500 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </Disclosure.Panel>
        </Disclosure>

    );
}

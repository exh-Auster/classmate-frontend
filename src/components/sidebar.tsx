'use client'
import { BookMarkedIcon, Home, LogOut, Settings } from "lucide-react"
import { Button } from "./ui/button"
import UserCard from "./userCard"
import { UserProps } from "@/app/page"
import { Group } from "@/client"

interface SideBarProps {
    user: UserProps,
    onCommunityClick: (param: Group["id"]) => void,
    onProfileClick: (param: number) => void,
    onHomeClick: () => void
}

function Sidebar({ user, onCommunityClick, onProfileClick, onHomeClick }: SideBarProps) {
    return (
        <div className="w-[30%] bg-white shadow-md p-4 flex flex-col">
            <UserCard user={user} onClick={() => onProfileClick(user.id ?? 0)} />
            <Button variant="ghost" className="mt-6 mb-0" onClick={onHomeClick}>
                <Home className="mr-2 h-4 w-4" />
                Timeline
            </Button>
            <Button variant="ghost" className="mt-0 mb-4" /*onClick={}*/ disabled>
                <BookMarkedIcon className="mr-2 h-4 w-4" />
                Lista de Leitura
            </Button>
            <nav className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">Suas Disciplinas</h2>
                <ul>
                    {user.groups.map((group) => (
                        <li key={group.id} className="mb-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => onCommunityClick(group.id)}
                            >
                                {group.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex justify-center space-x-2 mb-4">
                <Button variant="ghost" /*onClick={onSettingsClick}*/ disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                </Button>
                <Button variant="ghost" /*onClick={}*/ disabled>
                    <LogOut className="mr-2 h-4 w-4" />
                    Desconectar
                </Button>
            </div>
        </div>
    )
}

export default Sidebar
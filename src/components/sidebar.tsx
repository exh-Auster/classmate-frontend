'use client'
import { Home, Settings } from "lucide-react"
import { Button } from "./ui/button"
import UserCard from "./userCard"
import { UserProps } from "@/app/page"
import { communities } from '../lib/mock-data'

interface SideBarProps {
    user: UserProps,
    onCommunityClick: (param: string) => void,
    onProfileClick: (param: string) => void,
    onHomeClick: () => void
}

function Sidebar({ user, onCommunityClick, onProfileClick, onHomeClick }: SideBarProps) {
    return (
        <div className="w-[30%] bg-white shadow-md p-4 flex flex-col">
            <UserCard user={user} onClick={() => onProfileClick(user.name)} />
            <Button variant="ghost" className="mt-6 mb-4" onClick={onHomeClick}>
                <Home className="mr-2 h-4 w-4" />
                Timeline
            </Button>
            <nav className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">Suas Disciplinas</h2>
                <ul>
                    {communities.map((className) => (
                        <li key={className} className="mb-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => onCommunityClick(className)}
                            >
                                {className}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
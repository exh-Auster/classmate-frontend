import { BookMarkedIcon, Home, Settings } from "lucide-react"
import { Button } from "./ui/button"
import UserCard from "./userCard"
import { UserProps } from "@/app/page"
import { Group } from "@/client"

interface SideBarProps {
    user: UserProps,
    onCommunityClick: (param: Group["id"]) => void,
    onProfileClick: (param: number) => void,
    onHomeClick: () => void,
    onBookmarksClick: () => void
}

function Sidebar({ user, onCommunityClick, onProfileClick, onHomeClick, onBookmarksClick }: SideBarProps) {
    return (
        <div className="w-[30%] bg-white shadow-md p-4 flex flex-col">
            <UserCard
                user={user}
                onClick={() => onProfileClick(user.id ?? 0)}
            />
            <Button variant="ghost" className="mt-6 mb-0 w-full justify-start" onClick={onHomeClick}>
                <Home className="mr-2 h-4 w-4" />
                Timeline
            </Button>
            <Button
                variant="ghost"
                className="mt-0 mb-4 w-full justify-start"
                onClick={onBookmarksClick}
                data-testid="bookmarks-link"
            >
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
                                data-testid="group-link"
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
            </div>
        </div>
    )
}

export default Sidebar
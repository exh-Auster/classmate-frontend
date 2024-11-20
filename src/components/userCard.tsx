import { Avatar, /*AvatarImage,*/ AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader } from "./ui/card"
import { UserProps } from "@/app/page"
import { MouseEventHandler } from "react"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
// import { currentUser } from "@/app/page"

interface UserCardProps {
    user: UserProps,
    onClick: MouseEventHandler<HTMLDivElement>
}

function UserCard({ user, onClick }: UserCardProps) {
    return (
        <Card className="cursor-pointer" onClick={onClick}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar>
                        {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <div className="text-sm text-gray-500">
                            <span>{user.following} Seguindo</span>
                            <span className="mx-1">•</span>
                            <span>{user.followers} Seguidores</span>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" /*onClick={}*/ disabled>
                    <LogOut className="mr-0 h-4 w-4" />
                </Button>
            </CardHeader>
        </Card>
    )
}

export default UserCard
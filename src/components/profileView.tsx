'use client'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Edit, UserMinus, UserPlus } from "lucide-react"
import { useState } from "react"
import Post from "./post"
import { Button } from "./ui/button"
import { Card, CardHeader } from "./ui/card"
import { allPosts, UserProps } from "@/app/page"

interface ProfileViewProps {
    profile: string,
    currentUser: UserProps,
    onProfileClick: (param: string) => void
}

function ProfileView({ profile, currentUser, onProfileClick }: ProfileViewProps) {
    const isCurrentUser = profile === currentUser.name
    const [isFollowing, setIsFollowing] = useState(false)
    const profilePosts = allPosts.filter(post => post.author === profile)
    const sortedPosts = profilePosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

    return (
        <div>
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={currentUser.avatar} alt={profile} />
                        <AvatarFallback>{profile[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-semibold">{profile}</h2>
                        <p className="text-gray-500">{currentUser.bio}</p>
                        <div className="flex gap-4 mt-2">
                            <span><strong>{currentUser.following}</strong> Seguindo</span>
                            <span><strong>{currentUser.followers}</strong> Seguidores</span>
                        </div>
                    </div>
                    {isCurrentUser ? (
                        <Button
                            variant="outline"
                            className="ml-auto"
                            onClick={() => {
                                // TODO
                            }}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Perfil
                        </Button>
                    ) : (
                        <Button
                            variant={isFollowing ? "outline" : "default"}
                            className="ml-auto"
                            onClick={() => setIsFollowing(!isFollowing)}
                        >
                            {isFollowing ? (
                                <>
                                    <UserMinus className="mr-2 h-4 w-4" />
                                    Deixar de Seguir
                                </>
                            ) : (
                                <>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Seguir
                                </>
                            )}
                        </Button>
                    )}
                </CardHeader>
            </Card>
            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
            <div>
                {sortedPosts.map((post) => (
                    <Post key={post.id} post={post} onProfileClick={onProfileClick} />
                ))}
            </div>
        </div>
    )
}

export default ProfileView
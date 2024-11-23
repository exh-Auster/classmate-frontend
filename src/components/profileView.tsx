import { Avatar, /* AvatarImage,*/ AvatarFallback } from "@/components/ui/avatar"
import { Edit, UserMinus, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import Post from "./post"
import { Button } from "./ui/button"
import { Card, CardHeader } from "./ui/card"
import { PostProps, UserProps } from "@/app/page"
import { fetchUserById, fetchUserPosts } from "@/lib/data"

interface ProfileViewProps {
    profile: number | null,
    currentUser: UserProps,
    onProfileClick: (param: number) => void
}

function ProfileView({ profile, currentUser, onProfileClick }: ProfileViewProps) {
    const isCurrentUser = profile === currentUser.id
    const [isFollowing, setIsFollowing] = useState(false)

    const [userPosts, setUserPosts] = useState<PostProps[]>([])
    const [user, setUserInfo] = useState<UserProps | null>(null)

    const handleDeletePost = (postId: number) => {
        setUserPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }

    console.log(profile)
    useEffect(() => {
        const getUserPosts = async () => {
            try {
                const response = await fetchUserPosts(profile ?? 0)
                if (response) {
                    setUserPosts(response)
                }
            } catch (error) {
                console.error('Error fetching user posts:', error)
            }
        }

        const getUserInfo = async () => {
            try {
                const response = await fetchUserById(profile ?? 0)
                if (response) {
                    setUserInfo(response)
                }
            } catch (error) {
                console.error('Error fetching user info:', error)
            }
        }

        getUserPosts()
        getUserInfo()
    }, [profile])

    const sortedPosts = userPosts.sort((a, b) => new Date(b.timestamp ?? "").getTime() - new Date(a.timestamp ?? "").getTime())

    return (
        <div>
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="w-20 h-20">
                        {/* <AvatarImage src={currentUser.avatar} alt={profile} /> */}
                        <AvatarFallback>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-semibold">{user?.name}</h2>
                        <p className="text-gray-500">{user?.bio}</p>
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
                            disabled
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
            <h3 className="text-xl font-semibold mb-4">Publicações Recentes</h3>
            <div>
                {sortedPosts.map((post) => (
                    <Post key={post.id} post={post} onProfileClick={onProfileClick} onDeletePost={handleDeletePost} />
                ))}
            </div>
        </div>
    )
}

export default ProfileView
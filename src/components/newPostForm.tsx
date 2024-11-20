'use client'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Paperclip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Image } from "lucide-react"
import { Group } from "@/client"
import { createPostPostPost } from "@/client/services.gen"
import { currentUser } from "@/lib/data"

interface NewPostFormProps {
    communities: Group[],
    fixedCommunity?: number | null
}

function NewPostForm({ communities, fixedCommunity = null }: NewPostFormProps) {
    const [postContent, setPostContent] = useState('')
    const [postLink, setPostLink] = useState('')
    const [selectedCommunity, setSelectedCommunity] = useState<number | null>(fixedCommunity)

    const fixedCommunityName = fixedCommunity
        ? communities.find((community) => community.id === fixedCommunity)?.name
        : null

    const handleSubmit = async () => {
        if (!postContent.trim()) return
    
        const newPost = {
            body: postContent,
            external_content_url: postLink || null,
            author_id: currentUser.id ?? undefined,
            group_id: fixedCommunity ?? selectedCommunity ?? undefined,
            timestamp: new Date().toISOString(),
        }
    
        try {
            await createPostPostPost({ body: newPost })
            setPostContent('')
            setPostLink('')
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    return (
        <Card>
            <CardContent className="p-4">
                <Textarea
                    placeholder="O que você quer compartilhar hoje?"
                    className="mb-4"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Link para conteúdo externo"
                    className="mb-4"
                    value={postLink}
                    onChange={(e) => setPostLink(e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <Button variant="outline" size="icon" disabled>
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" disabled>
                            <Image className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        {fixedCommunity ? (
                            <div className="text-sm text-gray-500">Publicando em: {fixedCommunityName}</div>
                        ) : (
                            <Select onValueChange={(value) => setSelectedCommunity(Number(value))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecionar disciplina" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communities.map((community) => (
                                        <SelectItem key={community.id} value={String(community.id)}>
                                            {community.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        <Button disabled={!postContent.trim() || !selectedCommunity} onClick={handleSubmit}>Publicar</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default NewPostForm
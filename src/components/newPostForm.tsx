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

interface NewPostFormProps {
    communities: Group[],
    fixedCommunity?: string | null
}

function NewPostForm({ communities, fixedCommunity = null }: NewPostFormProps) {
    const [postContent, setPostContent] = useState('')
    const [postLink, setPostLink] = useState('')

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
                        <Button variant="outline" size="icon">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Image className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        {fixedCommunity ? (
                            <div className="text-sm text-gray-500">Publicando em: {fixedCommunity}</div>
                        ) : (
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecionar disciplina" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communities.map((community) => (
                                        <SelectItem key={community.id} value={community.name}>
                                            {community.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        <Button disabled={!postContent.trim()}>Publicar</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default NewPostForm
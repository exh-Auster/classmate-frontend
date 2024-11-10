'use client'
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import CommunityView from "./comunityView"
import Feed from "./feed"
import ProfileView from "./profileView"
import { UserProps, ViewType } from "@/app/page"

interface MainContentProps {
    view: ViewType,
    community: string,
    profile: string,
    currentUser: UserProps,
    onProfileClick: (param: string) => void,
    searchQuery: string,
    onSearch: (param: string) => void
}

function MainContent({ view, community, profile, currentUser, onProfileClick, searchQuery, onSearch }: MainContentProps) {
    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-10 bg-white"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
            </div>
            {view === 'feed' && <Feed communities={currentUser.classes} onProfileClick={onProfileClick} />}
            {view === 'community' && <CommunityView community={community} onProfileClick={onProfileClick} />}
            {view === 'profile' && <ProfileView profile={profile} currentUser={currentUser} onProfileClick={onProfileClick} posts={currentUser.posts ?? []} />}
        </div>
    )
}

export default MainContent
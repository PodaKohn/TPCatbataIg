import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Post } from './types'
import { catUsernames, captions, currentUser, stories } from './data/user'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Stories from './components/Stories'
import Feed from './components/Feed'
import PostPanel from './components/PostModal'
import Profile from './components/Profile'
import './index.css'

const API_KEY = 'live_E42PlIdpKknvFVOV0foHIiofP26r94HMCHUsoZeFnvUbB8UwYbQweYftFBNWobjl'

type View = 'feed' | 'profile'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<View>('feed')

  useEffect(() => {
    axios
      .get('https://api.thecatapi.com/v1/images/search', {
        params: { limit: 12, has_breeds: 0 },
        headers: { 'x-api-key': API_KEY },
      })
      .then((res) => {
        const mapped: Post[] = res.data.map((cat: any, i: number) => ({
          id: cat.id,
          url: cat.url,
          width: cat.width,
          height: cat.height,
          likes: Math.floor(Math.random() * 9000) + 500,
          caption: captions[i % captions.length],
          username: catUsernames[i % catUsernames.length],
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${catUsernames[i]}`,
          timestamp: `hace ${Math.floor(Math.random() * 23) + 1}h`,
          comments: [
            { id: 1, username: '@micho', text: '¡Qué hermoso! 😍' },
            { id: 2, username: '@luna', text: 'Me encanta esta foto 🐾' },
            { id: 3, username: '@neko', text: 'Iconic 👑' },
          ],
        }))
        setPosts(mapped)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="app">
      <Sidebar
        user={currentUser}
        activeView={activeView}
        onNavigate={setActiveView}
      />
      <div className="main">
        <Header />
        <div className="content">
          {activeView === 'feed' ? (
            <>
              <Stories stories={stories} />
              <Feed posts={posts} loading={loading} onSelect={setSelectedPost} />
            </>
          ) : (
            <Profile
              user={currentUser}
              posts={posts}
              onSelect={setSelectedPost}
            />
          )}
        </div>
      </div>
      {selectedPost && (
        <PostPanel post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  )
}

export default App
import type { Post } from '../types'
import PostCard from './PostCard'

interface Props {
  posts: Post[]
  loading: boolean
  onSelect: (post: Post) => void
}

const Feed = ({ posts, loading, onSelect }: Props) => {
  if (loading) {
    return (
      <div className="feed-loading">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    )
  }

  return (
    <section className="feed">
      <h2 className="feed-title">TRENDING</h2>
      <div className="feed-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

export default Feed
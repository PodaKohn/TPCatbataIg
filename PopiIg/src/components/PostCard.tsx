import { useState } from 'react'
import type { Post } from '../types'

interface Props {
  post: Post
  onSelect: (post: Post) => void
}

const PostCard = ({ post, onSelect }: Props) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="post-card" onClick={() => onSelect(post)}>
      <img src={post.url} alt={post.caption} className="post-image" />
      <div className="post-overlay">
        <div className="post-overlay-info">
          <img src={post.avatar} alt={post.username} className="post-avatar" />
          <span className="post-username">{post.username}</span>
        </div>
        <div className="post-overlay-actions">
          <button
            className={`action-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
            title="Like"
          >
            {liked ? '❤️' : '🤍'} {likeCount.toLocaleString()}
          </button>
          <button className="action-btn" title="Comentar">💬</button>
          <button className="action-btn" title="Compartir">📤</button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
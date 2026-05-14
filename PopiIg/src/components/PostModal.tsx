import { useState } from 'react'
import type { Post } from '../types'

interface Props {
  post: Post
  onClose: () => void
}

const PostPanel = ({ post, onClose }: Props) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(post.comments)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setComments([
      ...comments,
      { id: Date.now(), username: '@catbata', text: newComment.trim() },
    ])
    setNewComment('')
  }

  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />
      <aside className="post-panel">
        <button className="panel-close" onClick={onClose}>✕</button>

        <img src={post.url} alt={post.caption} className="panel-image" />

        <div className="panel-body">
          <div className="panel-user">
            <img src={post.avatar} alt={post.username} className="panel-avatar" />
            <div>
              <p className="panel-username">{post.username}</p>
              <p className="panel-time">{post.timestamp}</p>
            </div>
          </div>

          <p className="panel-caption">{post.caption}</p>

          <div className="panel-actions">
            <button
              className={`panel-action-btn ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {liked ? '❤️' : '🤍'} {likeCount.toLocaleString()} likes
            </button>
            <button className="panel-action-btn">💬 {comments.length}</button>
            <button className="panel-action-btn">📤</button>
          </div>

          <div className="panel-comments">
            <h4 className="comments-title">Comentarios</h4>
            {comments.map((c) => (
              <div key={c.id} className="comment">
                <span className="comment-user">{c.username}</span>
                <span className="comment-text">{c.text}</span>
              </div>
            ))}
          </div>

          <form className="comment-form" onSubmit={handleComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Agregá un comentario..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Publicar</button>
          </form>
        </div>
      </aside>
    </>
  )
}

export default PostPanel
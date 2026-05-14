import type { User, Post } from '../types'

interface Props {
  user: User
  posts: Post[]
  onSelect: (post: Post) => void
}

const Profile = ({ user, posts, onSelect }: Props) => {
  return (
    <div className="profile">

      {/* Info del usuario */}
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          <img src={user.avatar} alt={user.displayName} className="profile-avatar" />
        </div>

        <div className="profile-info">
          <div className="profile-top">
            <h2 className="profile-username">{user.username}</h2>
            <button className="edit-profile-btn">Editar perfil</button>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-value">{user.posts}</span>
              <span className="profile-stat-label">publicaciones</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{user.followers.toLocaleString()}</span>
              <span className="profile-stat-label">seguidores</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{user.following}</span>
              <span className="profile-stat-label">seguidos</span>
            </div>
          </div>

          <p className="profile-displayname">{user.displayName}</p>
          <p className="profile-bio">{user.bio}</p>
        </div>
      </div>

      {/* Grilla de posts */}
      <div className="profile-divider" />
      <div className="profile-grid">
        {posts.map((post) => (
          <div key={post.id} className="profile-post" onClick={() => onSelect(post)}>
            <img src={post.url} alt={post.caption} className="profile-post-img" />
            <div className="profile-post-overlay">
              <span>❤️ {post.likes.toLocaleString()}</span>
              <span>💬 {post.comments.length}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Profile
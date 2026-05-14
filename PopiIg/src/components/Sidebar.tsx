import type { User } from '../types'

type View = 'feed' | 'profile'

interface Props {
  user: User
  activeView: View
  onNavigate: (view: View) => void
}

const Sidebar = ({ user, activeView, onNavigate }: Props) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">📷</span>
        <span className="logo-text">CatBata</span>
      </div>

      <div className="sidebar-profile" onClick={() => onNavigate('profile')} style={{ cursor: 'pointer' }}>
        <img src={user.avatar} alt={user.displayName} className="sidebar-avatar" />
        <h3 className="sidebar-name">{user.displayName}</h3>
        <p className="sidebar-username">{user.username}</p>
        <p className="sidebar-bio">{user.bio}</p>

        <div className="sidebar-stats">
          <div className="stat">
            <span className="stat-value">{user.followers.toLocaleString()}</span>
            <span className="stat-label">Seguidores</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">Siguiendo</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.posts}</span>
            <span className="stat-label">Posts</span>
          </div>
        </div>

        <button className="edit-profile-btn" onClick={(e) => e.stopPropagation()}>
          Editar perfil
        </button>
      </div>

      <nav className="sidebar-nav">
        <a
          href="#"
          className={`nav-item ${activeView === 'feed' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('feed') }}
        >
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </a>
        <a href="#" className="nav-item" onClick={(e) => e.preventDefault()}>
          <span className="nav-icon">🔍</span>
          <span>Explorar</span>
        </a>
        <a href="#" className="nav-item" onClick={(e) => e.preventDefault()}>
          <span className="nav-icon">🎬</span>
          <span>Reels</span>
        </a>
        <a href="#" className="nav-item" onClick={(e) => e.preventDefault()}>
          <span className="nav-icon">📺</span>
          <span>IGTV</span>
        </a>
        <a
          href="#"
          className={`nav-item ${activeView === 'profile' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('profile') }}
        >
          <span className="nav-icon">👤</span>
          <span>Mi perfil</span>
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
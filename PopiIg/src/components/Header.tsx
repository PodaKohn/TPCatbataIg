const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar usuario, hashtag o historia..."
          className="search-input"
        />
      </div>
      <div className="header-actions">
        <button className="header-icon-btn" title="Configuración">⚙️</button>
        <button className="header-icon-btn" title="Cámara">📷</button>
        <button className="header-icon-btn" title="Mensajes">✉️</button>
        <button className="new-post-btn">
          <span>+</span> Nuevo Post
        </button>
      </div>
    </header>
  )
}

export default Header
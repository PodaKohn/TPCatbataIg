import type { Story } from '../types'

interface Props {
  stories: Story[]
}

const Stories = ({ stories }: Props) => {
  return (
    <section className="stories-section">
      <h2 className="stories-title">STORIES</h2>
      <div className="stories-list">
        {stories.map((story) => (
          <div key={story.id} className="story-item">
            <div className={`story-ring ${story.seen ? 'seen' : ''}`}>
              <img src={story.avatar} alt={story.username} className="story-avatar" />
            </div>
            <span className="story-username">{story.username}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stories
import type { User, Story } from '../types'

export const currentUser: User = {
  username: 'catbata',
  displayName: 'CatBata 🐱',
  avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=catbata',
  bio: 'Amante de los gatos 🐾 | Fotos felinas desde Buenos Aires 📸',
  posts: 48,
  followers: 12400,
  following: 312,
}

export const stories: Story[] = [
  { id: 1, username: '@micho', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=micho', seen: false },
  { id: 2, username: '@luna', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=luna', seen: false },
  { id: 3, username: '@neko', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=neko', seen: true },
  { id: 4, username: '@felix', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=felix', seen: false },
  { id: 5, username: '@mishi', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mishi', seen: true },
  { id: 6, username: '@gatito', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gatito', seen: false },
  { id: 7, username: '@bata', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bata', seen: false },
]

export const catUsernames = [
  '@micho_oficial', '@luna_felina', '@neko.jpg', '@felix_cats',
  '@mishi_real', '@gatito_bello', '@bata_cat', '@tiger_paws',
  '@snowball99', '@whiskers_ar', '@mittens_ok', '@fluffycat',
]

export const captions = [
  'Lunes de siesta ', 'No me molesten, estoy ocupado ',
  'El sol me llama ', 'Día de exploración ',
  'Modo zen activado ', 'Esperando la cena... ',
  'El mundo es mi almohada ', 'Vigilando el barrio ',
  'Muy ocupado siendo hermoso ', 'Chill day ',
  'No me importa nada ', 'Fotogénico por naturaleza',
]
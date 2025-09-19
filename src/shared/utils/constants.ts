export const SOCIAL_LINKS = {
  github: 'https://github.com/kyochul98',
  linkedin: 'https://www.linkedin.com/in/kyochul',
  email: 'mailto:kyochul.jang@gmail.com',
  instagram: 'https://www.instagram.com/kyochul_jang/',
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Projects', href: '#projects', icon: 'folder' },
  { label: 'Contact', href: '#contact', icon: 'envelope' },
] as const;

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 1000,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'hello-blog',
    title: 'Hello, Blog',
    date: '25-01-03',
    summary: 'How this space now splits public posts and still keeps a private corner.',
    tags: ['site', 'writing'],
    content: `The diary lived here first. It was useful, but everything was hidden behind an AES key and only I could read it. I wanted a calmer place to publish small notes without stripping away the private corner, so the page is now a blog with two tracks.

Public posts sit in the Blog tab. They are plain text, indexable, and written with visitors in mind. The Diary tab stays encrypted; the titles and dates are visible, but the stories require a key.

This split should make it easier to share progress notes, travel logs, and light essays without compromising the more personal writing. If something feels rough around the edges, it is because I am intentionally shipping small pieces instead of waiting for perfect drafts.`
  },
  {
    slug: 'building-in-public',
    title: 'Building in Public (Safely)',
    date: '25-01-11',
    summary: 'Shipping small artifacts weekly without leaking private details.',
    tags: ['dev', 'process'],
    content: `I used to treat every side project as a secret until it was finished. The result was that most projects never shipped. Switching to public updates changes the incentives: I bias toward smaller scopes, add screenshots earlier, and write a short note even when progress is tiny.

There is still a line I do not cross. Anything that belongs to the diary—relationships, raw feelings, or half-baked opinions—stays encrypted. The blog is for artifacts: design sketches, performance experiments, snippets of code that solved a real problem.

This boundary makes it sustainable. Sharing helps me remember what I learned, and the locked diary keeps the rest honest. If you are reading this, you are seeing the curated stream.`
  },
  {
    slug: 'weekend-reading',
    title: 'Weekend Reading List',
    date: '25-01-18',
    summary: 'A few links and books that shaped this month.',
    tags: ['reading', 'ml'],
    content: `I have been balancing research papers with lighter essays. The mix keeps me curious. Recent highlights:

- A paper on lightweight retrieval over small contexts reminded me that simple baselines often win.
- A short essay on creative routines convinced me to time-box writing to forty minutes.
- Rereading an old systems book refreshed my intuition about queues and backpressure.

None of these deserve a full review, but putting them in a public list helps future-me rediscover them. The private notes—including frustrations and bad takes—stay in the diary.`
  }
];

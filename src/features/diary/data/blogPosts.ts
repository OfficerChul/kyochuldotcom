import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'hello-blog',
    title: 'Hello, Blog',
    date: '25-01-03',
    summary: 'How this space now splits public posts and still keeps a private corner.',
    tags: ['site', 'writing'],
    content: `The diary lived here first. It was useful, but everything was hidden behind an AES key and only I could read it. I wanted a calmer place to publish small notes without stripping away the private corner, so the page is now a blog with two tracks.

## What changed
- **Blog tab**: public posts, indexable, written with visitors in mind.  
- **Diary tab**: still encrypted; titles/dates are visible, stories need a key.

## Why the split
> Ship small, keep the private notes private.

### Quick checklist
- [x] Keep drafts short
- [ ] Add cover images
- [ ] Automate RSS

### Tiny code note
\`\`\`bash
# how I preview posts locally
pnpm dev
\`\`\`

If something feels rough around the edges, it is because I am intentionally shipping small pieces instead of waiting for perfect drafts.`,
    translations: {
      ko: {
        title: '안녕, 블로그',
        summary: '공개 글과 비공개 일기를 분리해 더 편하게 쓰는 공간으로 바뀌었어요.',
        tags: ['사이트', '글쓰기'],
        content: `일기는 이곳에서 시작했어요. AES 키 뒤에 숨겨져서 오직 나만 볼 수 있었죠. 이제는 공개 글도 적고 싶어서, 블로그와 다이어리 두 트랙으로 나눴어요.

## 바뀐 점
- **블로그 탭**: 공개 글, 검색 가능, 방문자를 위한 글.
- **다이어리 탭**: 여전히 암호화; 제목/날짜만 보이고 내용은 키가 필요.

## 왜 나눴나
> 작은 단위로 자주 올리고, 사적인 내용은 계속 비공개.

### 체크리스트
- [x] 짧은 글로 자주 올리기
- [ ] 커버 이미지 추가
- [ ] RSS 자동화

### 간단한 코드 노트
\`\`\`bash
# 로컬 미리보기
pnpm dev
\`\`\`

거칠게 느껴질 수도 있지만, 완벽을 기다리기보다 작게 자주 올리기로 했어요.`
      },
      zh: {
        title: '你好，博客',
        summary: '把公开博客和私密日记分开，更轻松地写作。',
        tags: ['站点', '写作'],
        content: `这里最初只是日记，所有内容都被 AES 密钥保护。现在想写点公开的东西，所以分成了博客和日记两条轨道。

## 变化
- **Blog 标签**：公开、可索引、写给访客。
- **Diary 标签**：仍然加密；只有标题和日期可见，内容需要密钥。

## 为什么要分开
> 频繁发布小内容，隐私仍然保持私密。

### 清单
- [x] 保持短文频繁更新
- [ ] 增加封面图
- [ ] 自动化 RSS

### 简单命令
\`\`\`bash
# 本地预览
pnpm dev
\`\`\`

如果觉得有点粗糙，那是因为我选择小步快跑，而不是等到完美。`
      }
    }
  },
  {
    slug: 'building-in-public',
    title: 'Building in Public (Safely)',
    date: '25-01-11',
    summary: 'Shipping small artifacts weekly without leaking private details.',
    tags: ['dev', 'process'],
    content: `I used to treat every side project as a secret until it was finished. The result was that most projects never shipped. Switching to public updates changes the incentives: I bias toward smaller scopes, add screenshots earlier, and write a short note even when progress is tiny.

There is still a line I do not cross. Anything that belongs to the diary—relationships, raw feelings, or half-baked opinions—stays encrypted. The blog is for artifacts: design sketches, performance experiments, snippets of code that solved a real problem.

This boundary makes it sustainable. Sharing helps me remember what I learned, and the locked diary keeps the rest honest. If you are reading this, you are seeing the curated stream.`,
    translations: {
      ko: {
        title: '공개적으로 만들기 (안전하게)',
        summary: '매주 작은 산출물을 내되, 비공개 선을 지키기.',
        tags: ['개발', '프로세스'],
        content: `예전엔 모든 사이드 프로젝트를 완성될 때까지 비밀로 했고, 그래서 대부분 출시되지 못했다. 공개 업데이트로 전환하니, 스코프를 줄이고 스크린샷을 빨리 붙이고, 진행이 작아도 짧게 기록하게 된다.

넘지 않는 선은 있다. 다이어리에 속한 관계, 감정, 덜 익은 생각은 계속 암호화된 채로 둔다. 블로그는 산출물: 디자인 스케치, 성능 실험, 실제 문제를 해결한 코드 조각.

이 경계 덕분에 지속 가능하다. 공유는 내가 배운 것을 기억하게 하고, 잠겨 있는 다이어리는 나머지를 솔직하게 보존한다.`
      },
      zh: {
        title: '公开构建（安全版）',
        summary: '每周发布小成果，同时守住隐私边界。',
        tags: ['开发', '流程'],
        content: `以前所有副项目都要等到完成才公开，结果大多从未发布。改成公开更新后，我会压缩范围、更早放截图，即使进展很小也会写一段说明。

有一道不可跨越的线：属于日记的关系、情绪、半成品想法仍然加密。博客只放产出：设计草图、性能试验、真正解决问题的代码片段。

这种边界让它可持续。分享帮我记住所学，而上锁的日记保持了坦诚。`
      }
    }
  },
  {
    slug: 'weekend-reading',
    title: 'Weekend Reading List',
    date: '25-01-18',
    summary: 'A few links and books that shaped this month.',
    tags: ['reading', 'ml'],
    content: `I have been balancing research papers with lighter essays. The mix keeps me curious.

### Links
- **Retrieval on tiny contexts** — simple baselines still win more than we admit.
- *Creative routines* — a short essay that convinced me to time-box writing to forty minutes.
- Systems classic — rereading a chapter on queues/backpressure clarified an old performance bug.

### Book notes
> "You can only optimize what you measure."  
I am testing this by logging pomodoro blocks instead of hours.

### Quick snippet
\`\`\`bash
# my current reading command
fzf < reading-list.md | xargs -I{} open "{}"
\`\`\`

### What’s next
- Write a one-paragraph summary for each paper, not just highlights.
- Add a small 📷 next time; images make these lists friendlier.

The private notes—including frustrations and bad takes—stay in the diary.`,
    translations: {
      ko: {
        title: '주말 읽을거리 목록',
        summary: '이번 달에 읽은 링크와 책 몇 가지.',
        tags: ['읽기', 'ML'],
        content: `요즘은 논문과 가벼운 에세이를 섞어서 읽는다.

### 링크
- **작은 컨텍스트용 검색** — 단순한 베이스라인이 여전히 강력하다.
- *창작 루틴* — 글쓰기를 40분 타임박스로 묶기로 결심.
- 시스템 고전 — 큐/백프레셔 챕터를 다시 읽으며 오래된 성능 버그를 이해.

### 책 메모
> "측정할 수 있어야 최적화할 수 있다."  
그래서 시간 대신 뽀모도로 블록을 기록해본다.

### 짧은 스니펫
\`\`\`bash
# 내가 쓰는 읽기 명령어
fzf < reading-list.md | xargs -I{} open "{}"
\`\`\`

### 다음에 할 것
- 각 논문마다 한 단락 요약 추가.
- 다음에는 작은 📷도 넣기. 이미지가 훨씬 친근하다.

짜증이나 날 것의 생각은 여전히 다이어리에만 적는다.`
      },
      zh: {
        title: '周末阅读清单',
        summary: '本月影响我的一些链接和书。',
        tags: ['阅读', '机器学习'],
        content: `我在论文和轻松的文章之间来回切换。

### 链接
- **小上下文检索** — 简单基线往往更强。
- *创作习惯* — 让我把写作限制在 40 分钟。
- 系统经典 — 重读队列/背压章节，想起之前的性能问题。

### 书摘
> “只有能度量，才能优化。”  
我试着用番茄钟而不是按小时记录。

### 小片段
\`\`\`bash
# 我现在的阅读命令
fzf < reading-list.md | xargs -I{} open "{}"
\`\`\`

### 接下来
- 给每篇论文写一段摘要。
- 下次放一张小图 📷，读起来更友好。

私密吐槽和不成熟的想法仍然只写在日记里。`
      }
    }
  }
];

import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import ReactMarkdown, { Components as MarkdownComponents } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost, DiaryEntry as DiaryEntryType } from '../../types';
import { DiaryEntryDetail } from '../DiaryEntry';
import HeroSection from '../../../../shared/components/ui/HeroSection';
import SectionTitle from '../../../../shared/components/ui/SectionTitle';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';
import { estimateReadTime } from '../../utils';
import { BLOG_POSTS } from '../../data/blogPosts';
import { DIARY_POSTS } from '../../data/diaryPosts';
import { PostDetailLayout, PostList, PostListItem } from '../PostTemplates';

type TabKey = 'blog' | 'diary';
type Language = 'en' | 'ko' | 'zh';
const LANG_OPTIONS: { code: Language; label: string }[] = [
  { code: 'en', label: 'Eng' },
  { code: 'zh', label: '中' },
  { code: 'ko', label: '한' }
];

const ENTRIES_PER_PAGE = 5;

const readTimeLabel: Record<Language, string> = {
  en: 'min read',
  ko: '분 소요',
  zh: '分钟阅读'
};

const readMoreLabel: Record<Language, string> = {
  en: '(Read more)',
  ko: '(더 보기)',
  zh: '(阅读全文)'
};

const DIARY_KEY = process.env.REACT_APP_DIARY_KEY || 'diary-demo-key';

const getLocalizedDiaryEntry = (entry: DiaryEntryType, lang: Language): DiaryEntryType => {
  const localized = entry.translations?.[lang];
  return {
    ...entry,
    title: localized?.title ?? entry.title,
    content: localized?.content ?? entry.content
  };
};

const uiCopy = {
  decodePlaceholder: {
    en: 'Enter decode key...',
    ko: '디코드 키를 입력하세요...',
    zh: '请输入解锁密钥...'
  },
  decodeButton: {
    en: 'Unlock',
    ko: '잠금 해제',
    zh: '解锁'
  },
  decodeButtonLoading: {
    en: 'Unlocking...',
    ko: '해제 중...',
    zh: '解锁中...'
  },
  decodeEmptyError: {
    en: 'Please enter a decode key',
    ko: '디코드 키를 입력하세요',
    zh: '请输入解锁密钥'
  },
  decodeInvalidError: {
    en: 'Invalid key',
    ko: '키가 맞지 않습니다',
    zh: '密钥不正确'
  },
  lockedPreview: {
    en: '🔒 Locked. Enter the key to view.',
    ko: '🔒 잠겨 있습니다. 키를 입력해 주세요.',
    zh: '🔒 已锁定。请输入密钥查看。'
  },
  lockedDetail: {
    en: 'This diary entry is locked. Enter the key above to read it.',
    ko: '이 일기는 잠겨 있습니다. 상단의 키를 입력해 주세요.',
    zh: '此日记已锁定。请在上方输入密钥解锁。'
  },
  unlockedLabel: {
    en: 'Unlocked ✓',
    ko: '잠금 해제 ✓',
    zh: '已解锁 ✓'
  }
};

const markdownComponents: MarkdownComponents = {
  h1: ({ node, children, ...props }) => (
    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ node, children, ...props }) => (
    <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ node, children, ...props }) => (
    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ node, ordered, children, ...props }) => (
    <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ node, ordered, children, ...props }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ node, ordered, children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ node, children, ...props }) => (
    <blockquote className="border-l-4 border-sky-200 pl-4 italic text-gray-600 mb-4" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ node, inline, className, children, ...props }) =>
    inline ? (
      <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-mono text-gray-800" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-auto mb-4">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    ),
  a: ({ node, children, ...props }) => (
    <a className="text-sky-600 hover:underline" target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  ),
  img: ({ node, alt, ...props }) => <img className="my-4 rounded-lg shadow-sm" alt={alt || ''} {...props} />
};

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const diaryMatch = useMatch('/blog/diary/:date');
  const blogMatch = useMatch('/blog/post/:slug');
  const dateParam = diaryMatch?.params.date;
  const slugParam = blogMatch?.params.slug;

  const [currentPage, setCurrentPage] = useState(1);
  const [language, setLanguage] = useState<Language>('en');
  const [diaryUnlocked, setDiaryUnlocked] = useState(false);
  const [decodeInput, setDecodeInput] = useState('');
  const [decodeError, setDecodeError] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  const parseShortDate = (dateStr: string): number => {
    const [yy, mm, dd] = dateStr.split('-').map(Number);
    return new Date(2000 + yy, mm - 1, dd).getTime();
  };

  const handleDecode = () => {
    if (!decodeInput.trim()) {
      setDecodeError(uiCopy.decodeEmptyError[language]);
      return;
    }
    setIsDecoding(true);
    const trimmed = decodeInput.trim();
    const matched = trimmed === DIARY_KEY;
    setTimeout(() => {
      setDiaryUnlocked(matched);
      setDecodeError(matched ? null : uiCopy.decodeInvalidError[language]);
      setIsDecoding(false);
    }, 150);
  };

  const handleDecodeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDecode();
    }
  };

  useEffect(() => {
    setDecodeError(null);
  }, [language]);

  const diaryEntries = useMemo(
    () => [...DIARY_POSTS].sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime()),
    []
  );

  const localizedDiaryEntries = useMemo(
    () => diaryEntries.map((entry) => getLocalizedDiaryEntry(entry, language)),
    [diaryEntries, language]
  );

  const sortedBlogPosts = useMemo(
    () => [...BLOG_POSTS].sort((a, b) => parseShortDate(b.date) - parseShortDate(a.date)),
    []
  );

  const buildPreviewText = (text: string, limit = 300) => {
    if (!text) return '';
    const normalized = text.replace(/\s+/g, ' ').trim();
    return normalized.length > limit ? `${normalized.slice(0, limit).trimEnd()}…` : normalized;
  };

  const formatDateByLanguage = (dateStr: string, lang: Language): string => {
    const [yy, mm, dd] = dateStr.split('-').map(Number);
    const date = new Date(2000 + yy, mm - 1, dd);
    const locale = lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : 'en-US';
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  const getReadTimeText = (content: string, lang: Language): string => {
    const minutes = estimateReadTime(content);
    return `${minutes} ${readTimeLabel[lang]}`;
  };

  const getLocalizedPost = (post: BlogPost, lang: Language) => {
    const localized = post.translations?.[lang];
    return {
      title: localized?.title ?? post.title,
      summary: localized?.summary ?? post.summary,
      content: localized?.content ?? post.content,
      tags: localized?.tags ?? post.tags
    };
  };

  const activeTab: TabKey = location.pathname.startsWith('/blog/diary') ? 'diary' : 'blog';
  const blogActive = activeTab === 'blog';
  const diaryActive = activeTab === 'diary';
  const tabButtonBaseClasses =
    'inline-flex items-center justify-center px-4 py-2 font-mono font-normal text-[10px] sm:text-xs tracking-[0.12em] uppercase transition-colors duration-200';

  const selectedEntry: DiaryEntryType | null =
    diaryUnlocked && dateParam
      ? localizedDiaryEntries.find((entry) => entry.date === dateParam) || null
      : null;

  const selectedBlogPost: BlogPost | undefined = slugParam
    ? sortedBlogPosts.find((post) => post.slug === slugParam)
    : undefined;
  const localizedSelected = selectedBlogPost ? getLocalizedPost(selectedBlogPost, language) : undefined;

  const orderedMeta = useMemo(
    () =>
      localizedDiaryEntries.map((entry) => ({
        date: entry.date,
        title: entry.title || formatDateByLanguage(entry.date, language)
      })),
    [localizedDiaryEntries, language]
  );
  const totalDiaryEntries = localizedDiaryEntries.length;

  const currentIndex = dateParam ? orderedMeta.findIndex((item) => item.date === dateParam) : -1;
  const prevDate = currentIndex >= 0 && currentIndex < orderedMeta.length - 1 ? orderedMeta[currentIndex + 1].date : null;
  const nextDate = currentIndex > 0 ? orderedMeta[currentIndex - 1].date : null;

  useEffect(() => {
    if (!dateParam) return;
    const idx = localizedDiaryEntries.findIndex((entry) => entry.date === dateParam);
    if (idx === -1) return;
    const targetPage = Math.floor(idx / ENTRIES_PER_PAGE) + 1;
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }
  }, [dateParam, localizedDiaryEntries, currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    navigate('/blog/diary');
  };

  const handleTabChange = (tab: TabKey) => {
    if (tab === activeTab) return;
    if (tab === 'blog') {
      navigate('/blog');
    } else {
      setCurrentPage(1);
      navigate('/blog/diary');
    }
  };

  const getDiaryPreviewSource = (date: string) => {
    if (!diaryUnlocked) {
      return uiCopy.lockedPreview[language];
    }
    const matchedEntry = localizedDiaryEntries.find((entry) => entry.date === date);
    return matchedEntry?.content ?? '';
  };

  const blogListItems: PostListItem[] = sortedBlogPosts.map((post) => {
    const localized = getLocalizedPost(post, language);
    const readTimeText = getReadTimeText(localized.content, language);
    const summaryPreview = buildPreviewText(localized.content, 300);
    const tags = localized.tags;
    const hasTags = Boolean(tags && tags.length);
    const subMetaContent = hasTags ? (
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mt-1">
        <div className="flex flex-wrap gap-2">
          {tags!.map((tag) => (
            <span key={tag} className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ) : null;
    return {
      id: post.slug,
      title: localized.title,
      summary: (
        <p className="text-gray-400 group-hover:text-gray-700 text-xs md:text-sm leading-relaxed transition-colors">
          {summaryPreview}{' '}
          <span className="text-sky-600 font-medium group-hover:text-sky-700 transition-colors">
            {readMoreLabel[language]}
          </span>
        </p>
      ),
      meta: `\u{1F4C5} ${formatDateByLanguage(post.date, language)} \u00B7 ${readTimeText}`,
      subMeta: subMetaContent,
      onSelect: () => navigate(`/blog/post/${post.slug}`)
    };
  });

  const blogIndex = slugParam ? sortedBlogPosts.findIndex((post) => post.slug === slugParam) : -1;
  const prevBlogSlug = blogIndex > 0 ? sortedBlogPosts[blogIndex - 1].slug : null; // older
  const nextBlogSlug = blogIndex >= 0 && blogIndex < sortedBlogPosts.length - 1 ? sortedBlogPosts[blogIndex + 1].slug : null; // newer

  const paginatedDiaryEntries = localizedDiaryEntries.slice(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    currentPage * ENTRIES_PER_PAGE
  );

  const diaryListItems: PostListItem[] = paginatedDiaryEntries.map((entry, idx) => {
    const preview = buildPreviewText(getDiaryPreviewSource(entry.date), 300);
    const readTime = estimateReadTime(preview);
    return {
      id: entry.date,
      title: entry.title,
      summary: (
        <p className="text-gray-400 group-hover:text-gray-700 text-xs md:text-sm leading-relaxed break-all transition-colors">
          {preview}{' '}
          <span className="text-sky-600 font-medium group-hover:text-sky-700 transition-colors">
            {readMoreLabel[language]}
          </span>
        </p>
      ),
      meta: `\u{1F4C5} ${formatDateByLanguage(entry.date, language)} \u00B7 ${readTime} ${readTimeLabel[language]}`,
      subMeta: null,
      onSelect: () => navigate(`/blog/diary/${entry.date}`)
    };
  });

  const diaryPagination =
    Math.ceil(totalDiaryEntries / ENTRIES_PER_PAGE) > 1 ? (
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(totalDiaryEntries / ENTRIES_PER_PAGE) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handleChangePage(page)}
            className={`group relative overflow-hidden w-9 h-9 rounded-full text-sm transition-colors ${
              currentPage === page ? 'bg-sky-500 text-white' : 'text-sky-500 border border-sky-300 hover:bg-sky-50'
            }`}
          >
            <span className="relative z-10">{page}</span>
            <span
              className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent group-hover:translate-x-full transition-transform duration-500 ease-out ${
                currentPage === page ? 'via-white/40' : 'via-sky-300/50'
              }`}
            />
          </button>
        ))}
      </div>
    ) : null;

  const blogDetailView = slugParam ? (
    <PostDetailLayout
      dateLabel={
        localizedSelected
          ? `\u{1F4C5} ${formatDateByLanguage(selectedBlogPost.date, language)} · ${getReadTimeText(localizedSelected.content, language)}`
          : ''
      }
      title={localizedSelected?.title || 'Post'}
      prev={prevBlogSlug ? { label: 'Previous', onClick: () => navigate(`/blog/post/${prevBlogSlug}`) } : null}
      next={nextBlogSlug ? { label: 'Next', onClick: () => navigate(`/blog/post/${nextBlogSlug}`) } : null}
      onBack={() => navigate('/blog')}
      backLabel="← Back to blog"
    >
      {selectedBlogPost ? (
        <article className="space-y-6 text-gray-700 leading-relaxed">
          {localizedSelected?.tags?.length ? (
            <div className="flex flex-wrap gap-2 mb-2 mt-4">
              {localizedSelected.tags.map((tag) => (
                <span key={tag} className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {localizedSelected?.content || ''}
          </ReactMarkdown>
        </article>
      ) : (
        <p className="text-sm text-red-400">Post not found.</p>
      )}
    </PostDetailLayout>
  ) : (
    <PostList items={blogListItems} />
  );

  const diaryDetailView = dateParam ? (
    <PostDetailLayout
      dateLabel={formatDateByLanguage(dateParam, language)}
      title={selectedEntry?.title || orderedMeta.find((meta) => meta.date === dateParam)?.title || 'Diary'}
      prev={prevDate ? { label: 'Previous', onClick: () => navigate(`/blog/diary/${prevDate}`) } : null}
      next={nextDate ? { label: 'Next', onClick: () => navigate(`/blog/diary/${nextDate}`) } : null}
      onBack={() => navigate('/blog/diary')}
    >
      {diaryUnlocked ? (
        selectedEntry ? (
          <DiaryEntryDetail
            entry={selectedEntry}
            readTimeSuffix={readTimeLabel[language]}
            formattedDate={formatDateByLanguage(selectedEntry.date, language)}
          />
        ) : (
          <p className="text-sm text-red-400">Entry not found.</p>
        )
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{uiCopy.lockedDetail[language]}</p>
        </div>
      )}
    </PostDetailLayout>
  ) : (
    <div className="space-y-6">
      <PostList items={diaryListItems} footer={diaryPagination || undefined} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroSection showAboutButton={false} currentPage="blog" secondLineText="My Blog :)" />

      <main className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
        <Fade direction="up" triggerOnce>
          <SectionTitle className="mb-8">{activeTab === 'blog' ? 'Blog' : 'Diary'}</SectionTitle>
        </Fade>

        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FancyButtonSmall
                  onClick={() => handleTabChange('blog')}
                  className={`${tabButtonBaseClasses} ${
                    blogActive
                      ? 'text-sky-700 bg-sky-100'
                      : 'text-sky-500 bg-white hover:text-sky-600'
                  }`}
                  borderColor={blogActive ? 'rgba(14, 165, 233, 0.9)' : 'rgba(148, 163, 184, 0.4)'}
                  borderWidth={2}
                  noSvgBorder
                  ariaLabel="Show blog posts"
                >
                  Blog
                </FancyButtonSmall>
                <FancyButtonSmall
                  onClick={() => handleTabChange('diary')}
                  className={`${tabButtonBaseClasses} ${
                    diaryActive
                      ? 'text-sky-700 bg-sky-100'
                      : 'text-sky-500 bg-white hover:text-sky-600'
                  }`}
                  borderColor={diaryActive ? 'rgba(14, 165, 233, 0.9)' : 'rgba(148, 163, 184, 0.4)'}
                  borderWidth={2}
                  noSvgBorder
                  ariaLabel="Show diary entries"
                >
                  Diary
                </FancyButtonSmall>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start lg:items-end w-full lg:w-auto">
              <div className="flex items-center gap-2 lg:self-end">
                <div className="relative inline-grid grid-cols-3 items-stretch rounded-full border-2 border-sky-200 bg-white overflow-hidden">
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-0 bottom-0 left-0 lang-highlight transition-transform duration-300 ease-out"
                      style={{
                        width: `${100 / LANG_OPTIONS.length}%`,
                        transform: `translateX(${LANG_OPTIONS.findIndex((opt) => opt.code === language) * 100}%)`
                      }}
                      aria-hidden
                    />
                  </div>
                  {LANG_OPTIONS.map((opt) => {
                    const isActive = language === opt.code;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => setLanguage(opt.code)}
                        className={`relative z-10 px-3 py-2 text-xs font-semibold transition-colors ${
                          isActive ? 'text-white' : 'text-sky-600 hover:text-sky-700'
                        }`}
                        aria-label={`Switch to ${opt.label}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {diaryActive ? (
                <div className="flex flex-row flex-wrap items-center justify-start lg:justify-end gap-3 w-full">
                  <input
                    type="password"
                    value={decodeInput}
                    onChange={(e) => {
                      setDecodeInput(e.target.value);
                      setDecodeError(null);
                    }}
                    onKeyDown={handleDecodeKeyDown}
                    placeholder={uiCopy.decodePlaceholder[language]}
                    className="px-4 py-2 text-sm font-mono bg-transparent border-b-2 border-gray-300 focus:border-sky-400 transition-colors w-48 sm:w-56 focus:outline-none"
                  />
                  <FancyButtonSmall
                    onClick={isDecoding ? undefined : handleDecode}
                    className={`inline-block px-6 py-2 font-mono text-sm overflow-hidden text-sky-500 ${
                      diaryUnlocked ? 'text-sky-700' : 'text-sky-500'
                    } ${isDecoding ? 'opacity-50 cursor-not-allowed' : ''}`}
                    borderColor="rgba(56, 189, 248, 0.5)"
                    noSvgBorder
                    shineColor={isDecoding ? '' : 'from-transparent via-sky-300/40 to-transparent'}
                    ariaLabel="Decode diary"
                  >
                    <i className="fa fa-unlock-alt"></i>
                    <span>{isDecoding ? uiCopy.decodeButtonLoading[language] : uiCopy.decodeButton[language]}</span>
                  </FancyButtonSmall>
                  {diaryUnlocked ? (
                    <span className="text-[11px] text-sky-600 font-mono">{uiCopy.unlockedLabel[language]}</span>
                  ) : null}
                </div>
              ) : null}

              {diaryActive && decodeError ? (
                <p className="text-xs text-red-500">{decodeError}</p>
              ) : null}
            </div>
          </div>
        </div>

        {activeTab === 'blog' ? blogDetailView : diaryDetailView}
      </main>

      <style>{`
        .lang-highlight {
          background: linear-gradient(120deg, #67e8f9, #38bdf8 45%, #0ea5e9 80%, #38bdf8);
          background-size: 150% 150%;
          border-radius: 9999px;
          filter: drop-shadow(0 8px 18px rgba(56, 189, 248, 0.18));
          overflow: hidden;
          opacity: 0.9;
          pointer-events: none;
        }
      `}</style>

      <Fade direction="up" triggerOnce>
        <footer className="border-t border-gray-200 py-8 mt-auto">
          <p className="text-center text-xs text-gray-400">© Copyright {new Date().getFullYear()} Kyochul Jang</p>
        </footer>
      </Fade>
    </div>
  );
};

export default BlogPage;

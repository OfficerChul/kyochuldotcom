import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import ReactMarkdown, { Components as MarkdownComponents } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDiaryParser } from '../../hooks';
import { BlogPost, DiaryEntry as DiaryEntryType } from '../../types';
import { DiaryEntryDetail } from '../DiaryEntry';
import DiaryDecoder from '../DiaryDecoder';
import HeroSection from '../../../../shared/components/ui/HeroSection';
import SectionTitle from '../../../../shared/components/ui/SectionTitle';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';
import { estimateReadTime, formatDiaryDate } from '../../utils';
import { BLOG_POSTS } from '../../data/blogPosts';
import { PostDetailLayout, PostList, PostListItem } from '../PostTemplates';

const DIARY_ENTRIES_META = [
  { date: '25-12-29', title: 'Year End Reflections' },
  { date: '25-12-28', title: 'Lazy Saturday' },
  { date: '25-12-27', title: 'Back to Routine' },
  { date: '25-12-26', title: 'Boxing Day Adventures' },
  { date: '25-12-25', title: 'Christmas Morning Thoughts' },
  { date: '25-12-24', title: 'Eve of Something New' },
  { date: '25-12-23', title: 'Winter Reflections' },
  { date: '25-12-22', title: 'A Quiet Sunday' },
  { date: '25-12-21', title: 'First Day of Winter' },
  { date: '25-12-20', title: 'Friday Night Vibes' },
  { date: '25-12-19', title: 'Midweek Thoughts' },
  { date: '25-12-18', title: 'Coffee and Code' },
  { date: '25-12-17', title: 'Rainy Day Musings' },
  { date: '25-12-16', title: 'Monday Motivation' },
  { date: '25-12-15', title: 'Weekend Wrap-up' },
  { date: '25-12-14', title: 'Saturday Stroll' },
  { date: '25-12-13', title: 'Friday the 13th' },
  { date: '25-12-12', title: 'Twelve Twelve' },
  { date: '25-12-11', title: 'Midweek Check-in' },
  { date: '25-12-10', title: 'Ten Days to Go' },
  { date: '25-12-09', title: 'Tuesday Thoughts' },
  { date: '25-12-08', title: 'New Week Energy' },
  { date: '25-12-07', title: 'Lazy Sunday' },
  { date: '25-12-06', title: 'Saturday Plans' },
  { date: '25-12-05', title: 'End of Week' },
  { date: '25-12-04', title: 'December Beginnings' }
];

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
  const { isDecoded, entries, encodedContent, isLoading, error, attemptDecode } = useDiaryParser();
  const navigate = useNavigate();
  const location = useLocation();
  const diaryMatch = useMatch('/blog/diary/:date');
  const blogMatch = useMatch('/blog/post/:slug');
  const dateParam = diaryMatch?.params.date;
  const slugParam = blogMatch?.params.slug;

  const [currentPage, setCurrentPage] = useState(1);
  const [language, setLanguage] = useState<Language>('en');

  const parseShortDate = (dateStr: string): number => {
    const [yy, mm, dd] = dateStr.split('-').map(Number);
    return new Date(2000 + yy, mm - 1, dd).getTime();
  };

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
    'inline-flex items-center justify-center px-4 py-2 font-mono text-[10px] sm:text-xs tracking-[0.12em] uppercase transition-all duration-300';

  const selectedEntry: DiaryEntryType | null =
    isDecoded && dateParam ? entries.find((entry) => entry.date === dateParam) || null : null;

  const selectedBlogPost: BlogPost | undefined = slugParam
    ? sortedBlogPosts.find((post) => post.slug === slugParam)
    : undefined;
  const localizedSelected = selectedBlogPost ? getLocalizedPost(selectedBlogPost, language) : undefined;

  const orderedMeta = useMemo(
    () =>
      (isDecoded && entries.length ? entries : DIARY_ENTRIES_META).map((entry) => ({
        date: entry.date,
        title: 'title' in entry ? entry.title || formatDiaryDate(entry.date) : entry.title
      })),
    [isDecoded, entries]
  );
  const totalDiaryEntries = orderedMeta.length;

  const currentIndex = dateParam ? orderedMeta.findIndex((item) => item.date === dateParam) : -1;
  const prevDate = currentIndex >= 0 && currentIndex < orderedMeta.length - 1 ? orderedMeta[currentIndex + 1].date : null;
  const nextDate = currentIndex > 0 ? orderedMeta[currentIndex - 1].date : null;

  useEffect(() => {
    if (!isDecoded || !dateParam) return;
    const idx = entries.findIndex((entry) => entry.date === dateParam);
    if (idx === -1) return;
    const targetPage = Math.floor(idx / ENTRIES_PER_PAGE) + 1;
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }
  }, [isDecoded, dateParam, entries, currentPage]);

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

  const decodeControlsNode = !isDecoded ? (
    <DiaryDecoder
      mode="inline"
      encodedContent={encodedContent}
      onDecode={attemptDecode}
      placeholder="Enter decode key"
      buttonLabel="Unlock"
      buttonLoadingLabel="Decoding..."
    />
  ) : null;

  const getDiaryPreviewSource = (date: string, snippetIndex: number) => {
    if (isDecoded) {
      const matchedEntry = entries.find((entry) => entry.date === date);
      if (matchedEntry?.content) {
        return matchedEntry.content;
      }
    }
    const start = snippetIndex * 200;
    return encodedContent.slice(start, start + 200) || encodedContent.slice(0, 200);
  };

  const blogListItems: PostListItem[] = sortedBlogPosts.map((post) => {
    const localized = getLocalizedPost(post, language);
    const readTimeText = getReadTimeText(localized.content, language);
    const summaryPreview = buildPreviewText(localized.content, 300);
    const [yearStr] = post.date.split('-');
    const year = yearStr ? 2000 + Number(yearStr) : undefined;
    const tags = localized.tags;
    const hasTags = Boolean(tags && tags.length);
    const subMetaContent =
      year || hasTags ? (
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
          {year ? (
            <span className="inline-flex items-center gap-2">
              <span role="img" aria-label="calendar">
                📅
              </span>
              {year}
            </span>
          ) : null}
          {hasTags ? (
            <div className="flex flex-wrap gap-2">
              {tags!.map((tag) => (
                <span key={tag} className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
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
      meta: `${readTimeText} \u00B7 ${formatDateByLanguage(post.date, language)}`,
      subMeta: subMetaContent,
      onSelect: () => navigate(`/blog/post/${post.slug}`)
    };
  });

  const blogIndex = slugParam ? sortedBlogPosts.findIndex((post) => post.slug === slugParam) : -1;
  const prevBlogSlug = blogIndex > 0 ? sortedBlogPosts[blogIndex - 1].slug : null; // older
  const nextBlogSlug = blogIndex >= 0 && blogIndex < sortedBlogPosts.length - 1 ? sortedBlogPosts[blogIndex + 1].slug : null; // newer

  const paginatedDiaryEntries = orderedMeta.slice((currentPage - 1) * ENTRIES_PER_PAGE, currentPage * ENTRIES_PER_PAGE);

  const diaryListItems: PostListItem[] = paginatedDiaryEntries.map((entry, idx) => {
    const globalIndex = (currentPage - 1) * ENTRIES_PER_PAGE + idx;
    const preview = buildPreviewText(getDiaryPreviewSource(entry.date, globalIndex), 300);
    const readTime = estimateReadTime(preview);
    const [yy] = entry.date.split('-').map(Number);
    const year = yy ? 2000 + yy : undefined;
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
      meta: `${readTime} ${readTimeLabel[language]} \u00B7 ${formatDiaryDate(entry.date)}`,
      subMeta: year ? (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span role="img" aria-label="calendar">
            📅
          </span>
          {year}
        </div>
      ) : null,
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
          ? `${getReadTimeText(localizedSelected.content, language)} · ${formatDateByLanguage(selectedBlogPost.date, language)}`
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
            <div className="flex flex-wrap gap-2 mb-2">
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
      dateLabel={formatDiaryDate(dateParam)}
      title={selectedEntry?.title || orderedMeta.find((meta) => meta.date === dateParam)?.title || 'Diary'}
      prev={prevDate ? { label: 'Previous', onClick: () => navigate(`/blog/diary/${prevDate}`) } : null}
      next={nextDate ? { label: 'Next', onClick: () => navigate(`/blog/diary/${nextDate}`) } : null}
      onBack={() => navigate('/blog/diary')}
    >
      {isDecoded ? (
        selectedEntry ? (
          <DiaryEntryDetail entry={selectedEntry} />
        ) : (
          <p className="text-sm text-red-400">Entry not found.</p>
        )
      ) : (
        <div className="text-sm text-gray-400 font-mono break-all">
          {encodedContent.slice(0, 400) || 'This entry is locked.'}
        </div>
      )}
    </PostDetailLayout>
  ) : (
    <div className="space-y-6">
      <PostList items={diaryListItems} footer={diaryPagination || undefined} />
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Link to="/" className="text-sky-500 hover:underline">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection showAboutButton={false} currentPage="blog" secondLineText="My Blog :)" />

      <main className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
        <Fade direction="up" triggerOnce>
          <SectionTitle className="mb-8">{activeTab === 'blog' ? 'Blog' : 'Diary'}</SectionTitle>
        </Fade>

        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-start gap-3">
            <FancyButtonSmall
              onClick={() => handleTabChange('blog')}
              className={`${tabButtonBaseClasses} ${
                blogActive
                  ? 'text-sky-700 shadow-[0_10px_30px_-18px_rgba(56,189,248,0.9)]'
                  : 'text-sky-500 hover:text-sky-600'
              }`}
              borderColor={blogActive ? 'rgba(56, 189, 248, 0.75)' : 'rgba(148, 163, 184, 0.55)'}
              borderWidth={2}
              shineColor="from-transparent via-sky-300/55 to-transparent"
              hoverBg="bg-sky-50/50"
              noSvgBorder
              ariaLabel="Show blog posts"
            >
              Blog
            </FancyButtonSmall>
            <FancyButtonSmall
              onClick={() => handleTabChange('diary')}
              className={`${tabButtonBaseClasses} ${
                diaryActive
                  ? 'text-sky-700 shadow-[0_10px_30px_-18px_rgba(56,189,248,0.9)]'
                  : 'text-sky-500 hover:text-sky-600'
              }`}
              borderColor={diaryActive ? 'rgba(56, 189, 248, 0.75)' : 'rgba(148, 163, 184, 0.55)'}
              borderWidth={2}
              shineColor="from-transparent via-sky-300/55 to-transparent"
              hoverBg="bg-sky-50/50"
              noSvgBorder
              ariaLabel="Show diary entries"
            >
              Diary
            </FancyButtonSmall>
            <div className="flex-1 min-w-[220px]">
              <div
                className={`${activeTab === 'diary' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
                style={{ visibility: activeTab === 'diary' ? 'visible' : 'hidden' }}
                aria-hidden={activeTab !== 'diary'}
              >
                {decodeControlsNode || <div className="h-[72px]" aria-hidden />}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <div className="relative inline-grid grid-cols-3 items-stretch rounded-full border-2 border-sky-200 bg-white overflow-hidden">
                <div className="absolute inset-0">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-sky-500 transition-transform duration-300 ease-out"
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
          </div>
          <p className="text-xs text-gray-400">
            Blog posts are open. Diary entries require the decode key.
          </p>
        </div>

        {activeTab === 'blog' ? blogDetailView : diaryDetailView}
      </main>

      <Fade direction="up" triggerOnce>
        <footer className="border-t border-gray-200 py-8 mt-auto">
          <p className="text-center text-xs text-gray-400">© Copyright {new Date().getFullYear()} Kyochul Jang</p>
        </footer>
      </Fade>
    </div>
  );
};

export default BlogPage;

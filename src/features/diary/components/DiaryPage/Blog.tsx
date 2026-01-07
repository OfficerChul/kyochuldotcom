import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
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

const ENTRIES_PER_PAGE = 5;

const BlogPage: React.FC = () => {
  const { isDecoded, entries, encodedContent, isLoading, error, attemptDecode } = useDiaryParser();
  const navigate = useNavigate();
  const location = useLocation();
  const diaryMatch = useMatch('/blog/diary/:date');
  const blogMatch = useMatch('/blog/post/:slug');
  const dateParam = diaryMatch?.params.date;
  const slugParam = blogMatch?.params.slug;

  const [currentPage, setCurrentPage] = useState(1);

  const truncateText = (text: string, limit = 150) => {
    if (!text) return '';
    return text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text;
  };

  const activeTab: TabKey = location.pathname.startsWith('/blog/diary') ? 'diary' : 'blog';
  const blogActive = activeTab === 'blog';
  const diaryActive = activeTab === 'diary';
  const tabButtonBaseClasses =
    'inline-flex items-center justify-center px-4 py-2 font-mono text-[10px] sm:text-xs tracking-[0.12em] uppercase transition-all duration-300';

  const selectedEntry: DiaryEntryType | null =
    isDecoded && dateParam ? entries.find((entry) => entry.date === dateParam) || null : null;

  const selectedBlogPost: BlogPost | undefined = slugParam
    ? BLOG_POSTS.find((post) => post.slug === slugParam)
    : undefined;

  const orderedMeta = useMemo(
    () =>
      (isDecoded && entries.length ? entries : DIARY_ENTRIES_META).map((entry) => ({
        date: entry.date,
        title: 'title' in entry ? entry.title || formatDiaryDate(entry.date) : entry.title
      })),
    [isDecoded, entries]
  );

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

  const blogListItems: PostListItem[] = BLOG_POSTS.map((post) => {
    const readTime = estimateReadTime(post.content);
    const summaryPreview = truncateText(post.summary, 160);
    return {
      id: post.slug,
      title: post.title,
      dateLabel: `${formatDiaryDate(post.date)} · ${readTime} min read`,
      description: (
        <>
          <p className="text-gray-600 text-xs md:text-sm mb-2">
            {summaryPreview}
            <span className="ml-2 text-sky-300 font-medium text-[11px]">(Read more)</span>
          </p>
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </>
      ),
      locked: false,
      onSelect: () => navigate(`/blog/post/${post.slug}`)
    };
  });

  const blogIndex = slugParam ? BLOG_POSTS.findIndex((post) => post.slug === slugParam) : -1;
  const prevBlogSlug = blogIndex > 0 ? BLOG_POSTS[blogIndex - 1].slug : null; // older
  const nextBlogSlug = blogIndex >= 0 && blogIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[blogIndex + 1].slug : null; // newer

  const diaryListItems: PostListItem[] = DIARY_ENTRIES_META.slice(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    currentPage * ENTRIES_PER_PAGE
  ).map((entry, idx) => {
    const snippetIndex = ((currentPage - 1) * ENTRIES_PER_PAGE + idx) * 200;
    const snippet = encodedContent.slice(snippetIndex, snippetIndex + 200) || encodedContent.slice(0, 200);
    const preview = truncateText(snippet, 140);
    return {
      id: entry.date,
      title: entry.title,
      dateLabel: formatDiaryDate(entry.date),
      description: (
        <p className="text-gray-500 text-xs md:text-sm font-mono leading-relaxed break-all">
          {preview}
          <span className="ml-2 text-sky-300 font-medium text-[11px]">(Read more)</span>
        </p>
      ),
      locked: true,
      onSelect: () => navigate(`/blog/diary/${entry.date}`)
    };
  });

  const diaryPagination =
    Math.ceil(DIARY_ENTRIES_META.length / ENTRIES_PER_PAGE) > 1 ? (
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(DIARY_ENTRIES_META.length / ENTRIES_PER_PAGE) }, (_, i) => i + 1).map((page) => (
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
        selectedBlogPost ? `${formatDiaryDate(selectedBlogPost.date)} · ${estimateReadTime(selectedBlogPost.content)} min read` : ''
      }
      title={selectedBlogPost?.title || 'Post'}
      prev={prevBlogSlug ? { label: 'Previous', onClick: () => navigate(`/blog/post/${prevBlogSlug}`) } : null}
      next={nextBlogSlug ? { label: 'Next', onClick: () => navigate(`/blog/post/${nextBlogSlug}`) } : null}
      onBack={() => navigate('/blog')}
      backLabel="← Back to blog"
    >
      {selectedBlogPost ? (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {selectedBlogPost.tags?.length ? (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedBlogPost.tags.map((tag) => (
                <span key={tag} className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {selectedBlogPost.content.split('\n').map((line, index) => (
            <p key={index} className="text-sm md:text-base">
              {line || '\u00A0'}
            </p>
          ))}
        </div>
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
              ariaLabel="Show public blog posts"
            >
              Blog (public)
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
              ariaLabel="Show locked diary entries"
            >
              Diary (locked)
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

export interface DiaryEntry {
  date: string;      // "YY-MM-DD" 형식
  title: string;     // 제목
  content: string;   // 일기 내용 (여러 줄 가능)
  rawDate: Date;     // 정렬용 Date 객체
  translations?: {
    en?: Partial<Pick<DiaryEntry, 'title' | 'content'>>;
    ko?: Partial<Pick<DiaryEntry, 'title' | 'content'>>;
    zh?: Partial<Pick<DiaryEntry, 'title' | 'content'>>;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;      // "YY-MM-DD" 형식
  summary: string;
  content: string;
  tags?: string[];
  translations?: {
    en?: Partial<Pick<BlogPost, 'title' | 'summary' | 'content' | 'tags'>>;
    ko?: Partial<Pick<BlogPost, 'title' | 'summary' | 'content' | 'tags'>>;
    zh?: Partial<Pick<BlogPost, 'title' | 'summary' | 'content' | 'tags'>>;
  };
}

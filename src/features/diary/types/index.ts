export interface DiaryEntry {
  date: string;      // "YY-MM-DD" 형식
  title: string;     // 제목
  content: string;   // 일기 내용 (여러 줄 가능)
  rawDate: Date;     // 정렬용 Date 객체
}

export interface DiaryState {
  isDecoded: boolean;
  entries: DiaryEntry[];
  encodedContent: string;
  isLoading: boolean;
  error: string | null;
}

export interface DecoderResult {
  success: boolean;
  content: string;
  error?: string;
}

import { useState, useEffect, useCallback } from 'react';
import { DiaryEntry, DiaryState, DecoderResult } from '../types';
import { decodeDiary } from '../utils';

const DATE_REGEX = /^\d{2}-\d{2}-\d{2}$/;

function parseDateString(dateStr: string): Date {
  const [yy, mm, dd] = dateStr.split('-').map(Number);
  return new Date(2000 + yy, mm - 1, dd);
}

function parseDiaryContent(content: string): DiaryEntry[] {
  const lines = content.split('\n');
  const entries: DiaryEntry[] = [];
  let currentEntry: { date: string; content: string[] } | null = null;

  for (const line of lines) {
    if (DATE_REGEX.test(line.trim())) {
      // 이전 엔트리 저장
      if (currentEntry) {
        entries.push({
          date: currentEntry.date,
          content: currentEntry.content.join('\n').trim(),
          rawDate: parseDateString(currentEntry.date)
        });
      }
      // 새 엔트리 시작
      currentEntry = { date: line.trim(), content: [] };
    } else if (currentEntry) {
      currentEntry.content.push(line);
    }
  }

  // 마지막 엔트리 저장
  if (currentEntry) {
    entries.push({
      date: currentEntry.date,
      content: currentEntry.content.join('\n').trim(),
      rawDate: parseDateString(currentEntry.date)
    });
  }

  // 날짜 역순 정렬 (최신순)
  return entries.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
}

export function useDiaryParser() {
  const [state, setState] = useState<DiaryState>({
    isDecoded: false,
    entries: [],
    encodedContent: '',
    isLoading: true,
    error: null
  });

  // 인코딩된 diary.txt 불러오기
  useEffect(() => {
    const loadDiary = async () => {
      try {
        const response = await fetch('/diary.txt');
        if (!response.ok) {
          throw new Error('Failed to load diary');
        }
        const encodedContent = await response.text();
        setState(prev => ({
          ...prev,
          encodedContent,
          isLoading: false
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      }
    };

    loadDiary();
  }, []);

  // 디코딩 시도 (async)
  const attemptDecode = useCallback(async (userInput: string): Promise<DecoderResult> => {
    const result = await decodeDiary(state.encodedContent, userInput);

    if (result.success) {
      const entries = parseDiaryContent(result.content);
      setState(prev => ({
        ...prev,
        isDecoded: true,
        entries
      }));
    }

    return result;
  }, [state.encodedContent]);

  return {
    ...state,
    attemptDecode
  };
}

/**
 * Diary Decoder Example
 *
 * 이 파일을 decoder.ts로 복사하고 실제 디코딩 로직을 구현하세요.
 * decoder.ts는 .gitignore에 포함되어 있어 GitHub에 올라가지 않습니다.
 */

import { DecoderResult } from '../types';

// .env 파일에서 REACT_APP_DIARY_KEY를 설정하세요
const DIARY_KEY = process.env.REACT_APP_DIARY_KEY || '';

export function decodeDiary(encodedText: string, userInput: string): DecoderResult {
  // TODO: 실제 디코딩 로직 구현
  // userInput이 올바른 키인지 확인하고 디코딩된 내용 반환

  if (userInput !== DIARY_KEY) {
    return {
      success: false,
      content: '',
      error: 'Invalid decode key'
    };
  }

  // TODO: encodedText를 디코딩하는 로직 구현
  return {
    success: false,
    content: '',
    error: 'Not implemented - copy this file to decoder.ts and implement'
  };
}

export const DECODE_METHOD = DIARY_KEY;

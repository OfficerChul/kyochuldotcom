import { DecoderResult } from '../types';

/**
 * AES-GCM 기반 일기 디코더
 *
 * 암호화 방식: AES-256-GCM
 * 포맷: Base64(IV(12bytes) + Ciphertext + AuthTag(16bytes))
 *
 * 이 파일은 공개되어도 안전합니다.
 * 키만 비밀로 유지하면 됩니다 (환경변수 또는 사용자 입력).
 */

// Base64 디코딩 → Uint8Array
function base64ToBytes(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// 문자열 키를 AES-256 키로 변환 (SHA-256 해시 사용)
async function deriveKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = encoder.encode(password);

  // SHA-256으로 32바이트 키 생성
  const hashBuffer = await crypto.subtle.digest('SHA-256', keyMaterial);

  return crypto.subtle.importKey(
    'raw',
    hashBuffer,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );
}

// AES-GCM 복호화
async function aesDecrypt(encryptedData: Uint8Array, key: CryptoKey): Promise<string> {
  // IV는 처음 12바이트
  const iv = encryptedData.slice(0, 12);
  // 나머지는 암호문 + AuthTag
  const ciphertext = encryptedData.slice(12);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  return new TextDecoder('utf-8').decode(decrypted);
}

export async function decodeDiary(encodedText: string, userInput: string): Promise<DecoderResult> {
  if (!userInput) {
    return {
      success: false,
      content: '',
      error: 'Key is required'
    };
  }

  try {
    // 1. Base64 디코딩
    const encryptedData = base64ToBytes(encodedText);

    if (encryptedData.length < 28) { // 최소: IV(12) + AuthTag(16)
      return {
        success: false,
        content: '',
        error: 'Invalid encrypted data'
      };
    }

    // 2. 키 파생
    const key = await deriveKey(userInput);

    // 3. AES-GCM 복호화
    const decoded = await aesDecrypt(encryptedData, key);

    return {
      success: true,
      content: decoded
    };
  } catch (error) {
    return {
      success: false,
      content: '',
      error: 'Decryption failed - invalid key or corrupted data'
    };
  }
}

// 하위 호환성을 위한 동기 래퍼 (Promise 반환)
export { decodeDiary as decode };

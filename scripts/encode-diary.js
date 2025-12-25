/**
 * Diary Encoder Script (AES-256-GCM)
 *
 * 사용법:
 * 1. diary-raw.txt 파일에 일기를 작성 (프로젝트 루트)
 * 2. node scripts/encode-diary.js 실행
 * 3. public/diary.txt에 인코딩된 내용이 저장됨
 *
 * 암호화 방식: AES-256-GCM
 * 포맷: Base64(IV(12bytes) + Ciphertext + AuthTag(16bytes))
 *
 * 이 파일은 공개되어도 안전합니다.
 * 키만 비밀로 유지하면 됩니다 (.env 파일).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// .env에서 키 읽기
const envPath = path.join(__dirname, '..', '.env');
let DIARY_KEY = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/REACT_APP_DIARY_KEY=(.+)/);
  if (match) {
    DIARY_KEY = match[1].trim();
  }
}

if (!DIARY_KEY) {
  console.error('Error: REACT_APP_DIARY_KEY not found in .env file');
  console.log('Please create a .env file with REACT_APP_DIARY_KEY=your-secret-key');
  process.exit(1);
}

// 문자열 키를 AES-256 키로 변환 (SHA-256 해시 사용)
function deriveKey(password) {
  return crypto.createHash('sha256').update(password).digest();
}

// AES-256-GCM 암호화
function aesEncrypt(plaintext, keyBuffer) {
  // 랜덤 IV 생성 (12바이트)
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf-8'),
    cipher.final()
  ]);

  // AuthTag 가져오기 (16바이트)
  const authTag = cipher.getAuthTag();

  // IV + Ciphertext + AuthTag 결합
  return Buffer.concat([iv, encrypted, authTag]);
}

// 전체 인코딩 프로세스
function encode(text, key) {
  const keyBuffer = deriveKey(key);
  const encrypted = aesEncrypt(text, keyBuffer);
  return encrypted.toString('base64');
}

// 메인 실행
const rawPath = path.join(__dirname, '..', 'diary-raw.txt');
const outputPath = path.join(__dirname, '..', 'public', 'diary.txt');

if (!fs.existsSync(rawPath)) {
  console.log('diary-raw.txt not found. Creating sample file...');

  const sampleContent = `25-12-25
오늘은 크리스마스다. 가족들과 함께 즐거운 시간을 보냈다.
선물도 받고 맛있는 음식도 먹었다.

25-12-24
내일이 크리스마스라서 기대가 된다.
친구들과 파티 준비를 했다.

25-12-23
연말이 다가오니 한 해를 돌아보게 된다.
올해도 많은 일이 있었다.
`;

  fs.writeFileSync(rawPath, sampleContent, 'utf-8');
  console.log('Sample diary-raw.txt created!');
}

const rawDiary = fs.readFileSync(rawPath, 'utf-8');
const encoded = encode(rawDiary, DIARY_KEY);

fs.writeFileSync(outputPath, encoded, 'utf-8');

console.log('✅ Diary encrypted successfully with AES-256-GCM!');
console.log(`Input: ${rawPath}`);
console.log(`Output: ${outputPath}`);
console.log(`Key: ${DIARY_KEY.substring(0, 3)}${'*'.repeat(DIARY_KEY.length - 3)}`);

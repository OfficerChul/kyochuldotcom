import React, { useState } from 'react';
import { DecoderResult } from '../../types';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';

interface DiaryDecoderProps {
  encodedContent: string;
  onDecode: (userInput: string) => Promise<DecoderResult>;
  /**
   * Display mode:
   * - "full": show encoded blob + input (default)
   * - "inline": compact input-only controls for embedding elsewhere
   */
  mode?: 'full' | 'inline';
  placeholder?: string;
  buttonLabel?: string;
  buttonLoadingLabel?: string;
}

const DiaryDecoder: React.FC<DiaryDecoderProps> = ({
  encodedContent,
  onDecode,
  mode = 'full',
  placeholder = 'Enter decode key...',
  buttonLabel = 'Decode',
  buttonLoadingLabel = 'Decoding...'
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a decode key');
      return;
    }

    setIsDecoding(true);
    setError(null);

    try {
      const result = await onDecode(inputValue);

      if (!result.success) {
        setError(result.error || 'Invalid key');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } finally {
      setIsDecoding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {mode === 'full' && (
        <div className="relative bg-gray-900 rounded-md shadow-md border-2 border-purple-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="ml-2 text-xs text-gray-400 font-mono">encoded_diary.txt</span>
          </div>
          <div className="p-4 max-h-48 overflow-y-auto">
            <code className="text-green-400 font-mono text-sm break-all">
              {encodedContent}
            </code>
          </div>
        </div>
      )}

      <div className={`text-center space-y-4 ${mode === 'inline' ? 'sm:text-right' : ''}`}>
        {mode === 'full' && (
          <p className="text-gray-600 font-mono text-sm">
            Enter the decode key to view diary entries
          </p>
        )}

        <div
          className={`${
            mode === 'inline'
              ? 'flex flex-col sm:flex-row items-start sm:items-center justify-end gap-2'
              : 'flex justify-center gap-3 flex-wrap'
          } ${isShaking ? 'animate-shake' : ''}`}
        >
          <input
            type="password"
            className={`px-4 py-2 text-sm font-mono focus:outline-none transition-colors ${
              mode === 'inline'
                ? 'bg-transparent border-b-2 border-gray-300 focus:border-sky-400 w-48'
                : 'border-2 border-purple-200 rounded-full focus:border-purple-400 w-64'
            }`}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
          />
          <FancyButtonSmall
            onClick={isDecoding ? undefined : handleSubmit}
            className={`inline-block px-6 py-2 font-mono text-sm overflow-hidden ${
              mode === 'inline'
                ? 'text-sky-500 stroke-sky-400 hover:stroke-sky-600'
                : 'text-purple-600 stroke-purple-400 hover:stroke-purple-600'
            } ${isDecoding ? 'opacity-50 cursor-not-allowed' : ''}`}
            borderColor={mode === 'inline' ? 'rgba(56, 189, 248, 0.5)' : 'rgba(192, 132, 252, 0.5)'}
            noSvgBorder={true}
            shineColor={isDecoding ? '' : mode === 'inline' ? 'from-transparent via-sky-300/40 to-transparent' : 'from-transparent via-purple-300/40 to-transparent'}
            ariaLabel="Decode diary entry"
          >
            <i className="fa fa-unlock-alt"></i>
            <span>{isDecoding ? buttonLoadingLabel : buttonLabel}</span>
          </FancyButtonSmall>
        </div>

        {error && (
          <p className="text-red-500 font-mono text-sm animate-fadeIn">{error}</p>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DiaryDecoder;

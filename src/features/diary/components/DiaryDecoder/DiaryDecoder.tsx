import React, { useState } from 'react';
import { DecoderResult } from '../../types';

interface DiaryDecoderProps {
  encodedContent: string;
  onDecode: (userInput: string) => Promise<DecoderResult>;
}

const DiaryDecoder: React.FC<DiaryDecoderProps> = ({ encodedContent, onDecode }) => {
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
      {/* Encoded Content Display */}
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

      {/* Decode Input */}
      <div className="text-center space-y-4">
        <p className="text-gray-600 font-mono text-sm">
          Enter the decode key to view diary entries
        </p>

        <div className={`flex justify-center gap-3 flex-wrap ${isShaking ? 'animate-shake' : ''}`}>
          <input
            type="password"
            className="px-4 py-2 border-2 border-purple-200 rounded-full font-mono text-sm focus:outline-none focus:border-purple-400 transition-colors w-64"
            placeholder="Enter decode key..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSubmit}
            disabled={isDecoding}
            className="px-6 py-2 bg-purple-400 text-white font-mono text-sm rounded-full hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDecoding ? 'Decoding...' : 'Decode'}
          </button>
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

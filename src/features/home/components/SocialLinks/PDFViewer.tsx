import React, { useState, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { getRandomQuote } from '../../../../shared/data/loadingQuotes';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: string;
  width?: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, width }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Pick a random quote on each mount
  const randomQuote = useMemo(() => getRandomQuote(), []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Loading component with quote
  const LoadingComponent = (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center px-8 max-w-md">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600 mx-auto mb-6"></div>
        <p className="text-gray-600 italic text-lg leading-relaxed">
          "{randomQuote.quote}"
        </p>
        <p className="text-gray-500 mt-3 text-sm">
          — {randomQuote.author}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-auto">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={LoadingComponent}
        error={
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-500">Failed to load PDF</span>
          </div>
        }
        className="flex items-center justify-center"
      >
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          loading={LoadingComponent}
        />
      </Document>

      {numPages > 1 && (
        <div className="flex items-center gap-4 py-2 bg-white/90 sticky bottom-0 w-full justify-center">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;

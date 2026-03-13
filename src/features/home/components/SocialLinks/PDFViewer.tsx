import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const LoadingComponent = (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600 mx-auto"></div>
        <p className="text-gray-500 mt-3 text-sm">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-50">
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-6 pt-16 sm:px-4 sm:pt-20">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={LoadingComponent}
          error={
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-red-500">Failed to load PDF</span>
            </div>
          }
          className="mx-auto flex w-fit justify-center"
        >
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            loading={LoadingComponent}
          />
        </Document>
      </div>
      {numPages > 1 && (
        <div className="flex w-full shrink-0 items-center justify-center gap-4 border-t border-slate-200 bg-white/95 py-3 backdrop-blur">
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

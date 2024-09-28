// components/Pagination.tsx
import React from 'react';
import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = React.memo(({ page, totalPages, totalItems, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-4 mb-4">
      <div className="join grid grid-cols-3">
        <button
          className={`join-item btn btn-outline btn-sm ${page === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <BackwardIcon className="h-4 w-4" />
        </button>
        <button className="join-item btn btn-outline btn-sm">{page} / {totalPages} - {totalItems} Items</button>
        <button
          className={`join-item btn btn-outline btn-sm ${page === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          <ForwardIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <section aria-label="Product pagination" className="product-pagination">
      <nav className="product-pagination__nav" aria-label="Pagination">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="product-pagination__control"
        >
          Previous
        </button>

        <span className="product-pagination__current" aria-current="page">
          {page}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="product-pagination__control"
        >
          Next
        </button>
      </nav>
    </section>
  );
}

import { cls } from "@/libs/client/utils";
import Link from "next/link";

interface pageProps {
  currentPage: number;
  totalPage?: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  handlePageChange,
  totalPage,
  pageSize,
}: pageProps) => {
  const pages = totalPage
    ? Array.from({ length: totalPage }, (_, i) => i + 1)
    : [];
  const startIndex = Math.max(0, currentPage - 3);
  const visiblePages = pages.slice(startIndex, startIndex + 5);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  /*  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(totalPage || 1, currentPage + 2);
  const slicedPages = pages.slice(startPage - 1, endPage); */
  return (
    <div className="bg-gray-200 flex w-[55%] justify-center rounded-md">
      {isFirstPage ? (
        <span className="text-gray-400 flex items-center">prev</span>
      ) : (
        <Link legacyBehavior href={`/streams?page=${currentPage - 1}`}>
          <a
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center "
          >
            prev
          </a>
        </Link>
      )}
      {visiblePages.map((page) => (
        <div
          key={page}
          className="rounded-md flex items-center  hover:bg-sky-200 "
        >
          <Link
            onClick={() => handlePageChange(page)}
            href={`/streams?page=${page}`}
            className={cls(
              "font-semibold mx-1 px-3 py-2 border-blue-500",
              currentPage === page ? "text-red-500" : "cursor-pointer"
            )}
          >
            {page}
          </Link>
        </div>
      ))}
      {isLastPage ? (
        <span className="text-gray-400 flex items-center"> next</span>
      ) : (
        <Link legacyBehavior href={`/streams?page=${currentPage + 1}`}>
          <a
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex items-center "
          >
            next
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;

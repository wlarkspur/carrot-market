import { cls } from "@/libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

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
  const [isDisabled, setIsDisabled] = useState(true);
  const pages = totalPage
    ? Array.from({ length: totalPage }, (_, i) => i + 1)
    : [];
  const router = useRouter();
  const pageNow = router.query.page;
  const startIndex = Math.max(0, currentPage - 3);
  const visiblePages = pages.slice(startIndex, startIndex + 5);

  console.log(router.query.page);
  /*  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(totalPage || 1, currentPage + 2);
  const slicedPages = pages.slice(startPage - 1, endPage); */
  return (
    <div className="bg-gray-200 flex w-[50%] justify-center rounded-md">
      {/* <Link
        onClick={() => handlePageChange(+pageNow! - 1)}
        className="flex items-center"
        href={`/streams?page=${+pageNow! - 1}`}
        aria-disabled={+pageNow! === 0 ? isDisabled : false}
      >
        {"prev"}
      </Link> */}
      {visiblePages.map((page) => (
        <div key={page} className="rounded-sm py-2 px-3 ">
          <Link
            onClick={() => handlePageChange(page)}
            href={`/streams?page=${page}`}
            className={cls(
              "font-semibold px-1",
              currentPage === page ? "text-red-500" : "cursor-pointer"
            )}
          >
            {page}
          </Link>
        </div>
      ))}
      {/* <Link
        onClick={() => handlePageChange(+pageNow! + 1)}
        className="flex items-center"
        href={`/streams?page=${+pageNow! + 1}`}
        aria-disabled={+pageNow! === totalPage}
      >
        {"next"}
      </Link> */}
    </div>
  );
};

export default Pagination;

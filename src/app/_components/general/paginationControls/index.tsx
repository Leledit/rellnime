import styles from "./index.module.scss";

interface IProps {
  currentPage: number;
  setCurrentPage: any;
  totalRecords: number;
  limit: number;
}

export default function PaginationControls({
  currentPage,
  setCurrentPage,
  totalRecords,
  limit,
}: IProps) {
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage !== totalRecords / limit) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.containerPages}>
      <div className={styles.pages}>
        <div className={styles.pagePrev} onClick={prevPage}>
          Anterior
        </div>
        {renderPaginationButtons()}
        <div className={styles.pageNext} onClick={nextPage}>
          Próxima
        </div>
      </div>
    </div>
  );

  function renderPaginationButtons() {
    const numButtons = 4;
    const pageButtons = [];
    const start = Math.max(1, currentPage - Math.floor(numButtons / 2));
    const end = Math.min(totalRecords / limit, start + numButtons - 1);

    for (let i = start; i <= Math.ceil(end); i++) {
      pageButtons.push(
        <div
          className={`${styles.page} ${
            currentPage === i ? styles.selectPag : ""
          }`}
          key={i}
          onClick={() => goToPage(i)}
        >
          {i}
        </div>
      );
    }

    return pageButtons;
  }
}

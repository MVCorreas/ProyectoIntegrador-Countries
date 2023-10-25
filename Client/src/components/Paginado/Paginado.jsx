import React from "react";
import styles from './Paginado.module.css';

export default function Paginado({ countriesPerPage, allCountries, paginate, totalPages, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) { //ceil redondea para arriba
    pageNumbers.push(i);
  }

  const numButtons = 5;
  const range = Math.floor(numButtons / 2);

  const startPage = Math.max(1, currentPage - range);
  const endPage = Math.min(totalPages, currentPage + range);

  return (
    <nav>
      <ul className={styles.listStyles}>
        {currentPage > 1 && (
          <li key={'inicio'} className={styles.listItemStyles}>
            <a className={styles.linkStyles} onClick={() => paginate(1)}>
              First
            </a>
          </li>
        )}
        {currentPage > 1 && (
          <li key={'prev'} className={styles.listItemStyles}>
            <a className={styles.linkStyles} onClick={() => paginate(currentPage - 1)}>
              Prev
            </a>
          </li>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number} className={`${styles.listItemStyles} ${number === currentPage ? styles.activePage : ''}`}>
            <a
              className={styles.linkStyles}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
        {currentPage < totalPages && (
          <li key={'next'} className={styles.listItemStyles}>
            <a className={styles.linkStyles} onClick={() => paginate(currentPage + 1)}>
              Next
            </a>
          </li>
        )}
        {currentPage < totalPages && (
          <li key={'ultimo'} className={styles.listItemStyles}>
            <a className={styles.linkStyles} onClick={() => paginate(totalPages)}>
              Last
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}



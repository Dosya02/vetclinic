import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@components';

interface Column<T> {
  key: keyof T;
  label: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  noDataText?: string;
  className?: string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  itemsPerPage?: number;
}

export const Table = <T extends object>({
  data,
  columns,
  noDataText = 'No data',
  className = '',
  onEdit,
  onDelete,
  itemsPerPage = 10,
}: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (
                     currentPage - 1
                   ) * itemsPerPage;
  const paginatedData = data.slice(startIdx, startIdx + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (data.length === 0) {
    return <div>{noDataText}</div>;
  }

  return (
    <div className={clsx('c-table-wrapper', className)}>
      <table className={clsx('c-table', className)}>
        <thead>
        <tr>
          <th>№</th>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        {paginatedData.map((item, idx) => (
          <tr key={idx}>
            <td>{startIdx + idx + 1}</td>
            {columns.map((col) => (
              <td key={String(col.key)}>{String(item[col.key] ?? '-')}</td>
            ))}
            <td>
              <div className="c-table__buttons">
                <button
                  className="c-table__button c-table__button--edit"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="c-table__button c-table__button--delete"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <div className="c-table__pagination">
        <Button
          className="c-table__pagination-button c-table__pagination-button--next"
          text="Назад"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <Button
          className="c-table__pagination-button c-table__pagination-button--next"
          text="Вперёд"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};
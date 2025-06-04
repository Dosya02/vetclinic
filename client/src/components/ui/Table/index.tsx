import clsx from 'clsx';

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
}

export const Table = <T extends object>({
  data,
  columns,
  noDataText = 'No data',
  className = '',
  onEdit,
  onDelete,
}: Props<T>) => {
  if (data.length === 0) {
    return <div>{noDataText}</div>;
  }

  return (
    <table className={clsx('c-table', className)}>
      <thead>
      <tr>
        <th>№</th>
        {columns.map((col) => (
          <th key={String(col.key)}>{col.label}</th>
        ))}
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {data.map((item, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          {columns.map((col) => (
            <td key={String(col.key)}>{String(item[col.key] ?? '-')}</td>
          ))}
          <td>
            <div className="c-table__buttons">
              <button
                className="c-table__button c-table__button--edit"
                onClick={() => onEdit(item)}
              >Edit
              </button>
              <button
                className="c-table__button c-table__button--delete"
                onClick={() => onDelete(item)}
              >Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};
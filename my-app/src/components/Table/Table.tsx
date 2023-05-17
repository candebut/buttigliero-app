import styles from "./generic-table.module.css";

export type TableElement = {};

export type TableColumn<T extends TableElement> = {
  title: string;
  html: (e: T) => JSX.Element;
  width?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type TableModel<T extends TableElement> = {
  columns: TableColumn<T>[];
};

export type Props<T extends TableElement> = {
  model: TableModel<T>;
  elements: T[];
};

const Table = <T extends TableElement>({ model, elements }: Props<T>) => {
  const sumWidth = model.columns.reduce(
    (sum, column) => sum + (column.width || 1),
    0
  );
  const widthOf = (c: TableColumn<T>) => ((c.width || 1) / sumWidth) * 100;
  return (
    <div className={styles.genericTableContainer}>
      <div className={styles.genericTableHeader}>
        <div className={styles.genericTableRow}>
          {model.columns.map((c, index) => (
            <div
              key={`key-column-${index}`}
              className={styles.genericTableCell}
              style={{ width: `${widthOf(c)}%` }}
            >
              <span className={styles.genericTableCellText}>{c.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.genericTableBody}>
        {elements.map((e, index) => (
          <div className={styles.genericTableRow} key={`key-element-${index}`}>
            {model.columns.map((c, index) => (
              <div
                className={styles.genericTableCell}
                style={{ width: `${widthOf(c)}%` }}
                key={`key-element-column-${index}`}
              >
                {c.html(e)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;

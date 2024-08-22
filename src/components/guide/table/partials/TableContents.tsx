import React, { FC } from 'react'

interface TableContentProps {
    className?: string;
    listItems?: ContentItem[];
}

export interface ContentItem {
    value: React.ReactNode | string;
    className?: string;
}

const TableContents: FC<TableContentProps> = ({ className, listItems = [] }) => {

  const renderList = (listItems: ContentItem[]) => {
    return listItems.map((item: ContentItem, index: number) => (
      <td
        key={index}
        className={
          "px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap " +
          item.className
        }
      >
        {item.value}
      </td>
    ));
  };

  return (
    <tr className={className}>
        {renderList(listItems)}
    </tr>
  );
}

export default TableContents;

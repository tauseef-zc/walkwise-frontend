import React from 'react';

export interface HeadItem {
    title: string;
    className?: string;
    children?: React.ReactNode;
}

const TableHeading = ({ className, listItems }: { className?: string, listItems?: HeadItem[] }) => {

  const renderList = (listItems: HeadItem[]) => {
    return listItems.map((item: HeadItem, index: number) => (
      <th
        key={index}
        scope="col"
        className={
          "py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 " +
          item.className
        }
      >
        {item.children}
        {" "}
        {item.title}
      </th>
    ));
  };

  return (
    <tr>
        {renderList(listItems || [])}
    </tr>
  );
}

export default TableHeading

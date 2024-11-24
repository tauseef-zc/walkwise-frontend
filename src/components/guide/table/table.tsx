import React, { FC } from "react";
import TableHeading, { HeadItem } from "./partials/TableHeading";
import TableContents, { ContentItem } from "./partials/TableContents";

interface TableProps {
  headItems: HeadItem[];
  contents: ContentItem[][];
}
const Table: FC<TableProps> = ({ headItems, contents = [] }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-white dark:bg-neutral-800">
        <TableHeading listItems={headItems} />
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-neutral-900">
        {contents.length > 0 &&
          contents.map((content: ContentItem[], index: number) => (
            <TableContents listItems={content} key={index} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;

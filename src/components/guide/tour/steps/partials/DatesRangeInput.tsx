"use client";

import DatePicker from "react-datepicker";
import React, { FC, Fragment, useEffect, useState } from "react";
import DatePickerCustomHeaderTwoMonth from "@/components/inputs/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/inputs/DatePickerCustomDay";

export interface DatesRangeInputProps {
  className?: string;
  title?: string;
  onChangeAction?: (data: { from: Date | null; to: Date | null }) => void;
  defaultValue?: { from: Date | null; to: Date | null };
}

const DatesRangeInput: FC<DatesRangeInputProps> = ({
  title,
  className = "",
  onChangeAction,
  defaultValue = { from: new Date(), to: new Date() },
}) => {
  const [startDate, setStartDate] = useState<Date | null>(defaultValue.from);
  const [endDate, setEndDate] = useState<Date | null>(defaultValue.to);

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (onChangeAction && start && end) {
      onChangeAction({
        from: start,
        to: end,
      });
    }
  };

  return (
    <div>
      {title && (
        <div className="p-5">
          <span className="block font-semibold text-sm sm:text-lg">
            {title}
          </span>
        </div>
      )}
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default DatesRangeInput;

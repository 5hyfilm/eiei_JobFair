"use client";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { useState } from "react";

export default function DateReserve({
  initialDate,
  onDateChange,
}: {
  initialDate: Dayjs;
  onDateChange: Function;
}) {
  const [value, setValue] = useState<Dayjs>(dayjs(initialDate));

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Select Your Date
      </h1>
      <div className="w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => {
              setValue(newValue || dayjs());
              onDateChange(newValue);
            }}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#4CAF50 !important",
                color: "#FFF !important",
              },
              "& .Mui-selected:hover": {
                backgroundColor: "#388E3C !important",
              },
              "& .Mui-selected:focus": {
                backgroundColor: "#4CAF50 !important",
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <p className="mt-4 text-gray-600 text-sm">
        Selected Date:{" "}
        <span className="font-medium text-gray-800">
          {value ? value.format("YYYY-MM-DD") : "No date selected"}
        </span>
      </p>
    </div>
  );
}

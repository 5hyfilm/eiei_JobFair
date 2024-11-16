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
    <div className="flex flex-col items-center p-5 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Reserve Your Date
      </h1>
      <div className="w-full max-w-sm">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => {
              setValue(newValue || dayjs());
              onDateChange(newValue);
            }}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#4CAF50",
                color: "#FFF",
              },
              "& .Mui-selected:hover": {
                backgroundColor: "#388E3C",
              },
              "& .Mui-selected:focus": {
                backgroundColor: "#4CAF50",
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Selected Date:{" "}
        <span className="font-medium text-gray-800">
          {value ? value.format("YYYY-MM-DD") : "No date selected"}
        </span>
      </p>
    </div>
  );
}

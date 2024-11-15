'use client'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers';
export default function DateReserve({initialDate,onDateChange}:{initialDate:Dayjs,onDateChange:Function}){
  const [value, setValue] = useState<Dayjs>(dayjs(initialDate));
    return(
    <div className="flex flex-row">
      <div className='content-center'>
        <h1>Reserve Your Reservation:</h1>
      </div>
      <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateCalendar className="bg-white" value={value} onChange={(newValue) => {setValue(newValue);onDateChange(newValue)}} />
          </LocalizationProvider>
      </div>
    </div>
    )
}

// 
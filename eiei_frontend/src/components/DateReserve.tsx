import dayjs from "dayjs"
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
export default function DateReserve(){
    <LocalizationProvider>
        <DemoContainer>
        <DemoItem label="Static variant">
            <StaticDatePicker defaultValue={dayjs('2022-04-17')} />
        </DemoItem>  
        </DemoContainer>
    </LocalizationProvider>
    return<>
    </>
}
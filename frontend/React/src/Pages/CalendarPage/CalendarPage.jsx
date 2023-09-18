import React, { useState } from 'react';
import { Typography, LinearProgress } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [value, setValue] = React.useState(dayjs()); // 현재 날짜로 초기화
    const [data, setData] = React.useState({ /* 더미 데이터 혹은 서버에서 가져온 데이터 */ });
    return (
        <div className="gray-pages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2% 0' }}>
            
            {/* Box 1 - Placeholder for Calendar */}
            <div className="white-content-box" style={{ width: '80%', padding: '20px', marginBottom: '20px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        // 여기서 해당 날짜에 대한 세부 정보나 성과를 팝업, 모달 등의 형태로 보여줄 수 있는 로직 추가
      }}
      // 달력에 다양한 색상을 표시하기 위한 로직 (예: 렌더링 함수 오버라이드) 추가
    />
            </LocalizationProvider>
            </div>

            {/* Box 2 - Nutrient Information */}
            <div className="white-content-box" style={{ width: '80%', padding: '20px' }}>
                <Typography variant="h6">{selectedDate.toDateString()}</Typography>
                <Typography variant="body2" style={{ marginTop: 15 }}>오늘의 영양소 정보</Typography>
                {/* Example nutrient: Protein */}
                <Typography style={{ marginTop: 20 }}>Protein</Typography>
                <LinearProgress variant="determinate" value={50} />  {/* Example: 50% */}
            </div>
        </div>
    );
};

export default CalendarPage;

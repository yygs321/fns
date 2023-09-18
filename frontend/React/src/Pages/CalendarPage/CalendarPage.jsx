import React, { useState } from 'react';
import { Typography, LinearProgress, Badge } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // 더미 데이터
    const data = {
        '2023-09-15': 20,
        '2023-09-16': 50,
        '2023-09-17': 70,
        '2023-09-18': 100,
        // ... 추가적인 날짜와 데이터
    };

    const getIconByValue = (value) => {
        if (value <= 20) return '🔴';
        if (value <= 50) return '🔶';
        if (value <= 70) return '🟡';
        return '🟢';
    };    

    const CustomDay = (props) => {
        const { day, outsideCurrentMonth, ...other } = props;
        const formattedDate = day.format('YYYY-MM-DD');
        const value = data[formattedDate];
        const icon = value !== undefined ? getIconByValue(value) : null;

        return (
            <Badge
                key={formattedDate}
                overlap="circular"
                badgeContent={icon}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    };

    return (
        <div className="gray-pages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2% 0' }}>
            <div className="white-content-box" style={{ width: '80%', padding: '20px', marginBottom: '20px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slots={{ day: CustomDay }}
                    />
                </LocalizationProvider>
            </div>

            <div className="white-content-box" style={{ width: '80%', padding: '20px' }}>
                <Typography variant="h6">{selectedDate.format('YYYY-MM-DD')}</Typography>
                <Typography variant="body2" style={{ marginTop: 15 }}>오늘의 영양소 정보</Typography>
                <Typography style={{ marginTop: 20 }}>Protein</Typography>
                <LinearProgress variant="determinate" value={50} />
            </div>
        </div>
    );
};

export default CalendarPage;

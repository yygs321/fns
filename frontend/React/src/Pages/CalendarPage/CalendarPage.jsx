import React, { useState } from 'react';
import { Badge, Container } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import NutritionInfo from './NutritionInfo';
import {WeightChart} from './WeightChart';

const CalendarPage = () => {
    const [날짜, set날짜] = useState(dayjs());

    // 더미 데이터
    const data = {
        '2023-08-15': 45,
        '2023-08-20': 50,
        '2023-08-23': 60,
        '2023-08-30': 96,
        '2023-09-15': 20,
        '2023-09-16': 50,
        '2023-09-17': 70,
        '2023-09-18': 100,
        '2023-10-01': 15,
        '2023-10-03': 35,
        '2023-10-12': 50,
        '2023-10-14': 85,
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

    const 영양데이터 = {
        칼로리: {
            섭취량: 1500,
            권장량: 2000
        },
        탄수화물: {
            섭취량: 200,
            권장량: 300
        },
        단백질: {
            섭취량: 50,
            권장량: 80
        },
        지방: {
            섭취량: 60,
            권장량: 90
        }
    };
    
    return (
        <div className="gray-pages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2% 0' }}>
                
            {/* box1 */}
            <div className="white-content-box" style={{ width: '80%', padding: '20px', marginBottom: '20px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                        value={날짜}
                        onChange={(newValue) => set날짜(newValue)}
                        slots={{ day: CustomDay }}
                    />
                </LocalizationProvider>
            </div>

            {/* box2 */}
            <NutritionInfo 날짜={날짜} 영양데이터={영양데이터} 
            />
            <WeightChart 날짜={날짜}/>
            
        </div>
        
    );
};

export default CalendarPage;

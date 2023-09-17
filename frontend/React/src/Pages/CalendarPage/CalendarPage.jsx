import React, { useState } from 'react';
import { Typography, LinearProgress } from '@mui/material';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="gray-pages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2% 0' }}>
            
            {/* Box 1 - Placeholder for Calendar */}
            <div className="white-content-box" style={{ width: '80%', padding: '20px', marginBottom: '20px' }}>
                {/* Placeholder content can be added here if needed */}
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

import React, { useState } from 'react';
import { Typography, Slider, Button, Grid } from '@mui/material';

const MyCustomPage = () => {
    const [kcal, setKcal] = useState(2000);
    const [carbs, setCarbs] = useState(250);
    const [protein, setProtein] = useState(50);
    const [fat, setFat] = useState(70);

    const maxKcal = 3000;
    const maxCarbs = 400;
    const maxProtein = 100;
    const maxFat = 100;

    return (
        <div className="gray-pages" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="white-content-box" style={{ width: '80%', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Typography variant="h5" gutterBottom align="center" style={{marginBottom: '20px'}}>
                    나에게 맞는 영양소를 설정해보세요!
                </Typography>

                <Grid container spacing={3}>
                    {renderSlider("칼로리", kcal, setKcal, maxKcal)}
                    {renderSlider("탄수화물", carbs, setCarbs, maxCarbs)}
                    {renderSlider("단백질", protein, setProtein, maxProtein)}
                    {renderSlider("지방", fat, setFat, maxFat)}
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" 
           
                      style={{ marginTop: '20px', fontSize: '20px', padding: '5px 100px' }}
                        >저장
                    </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const renderSlider = (label, value, setValue, maxValue) => {
    return (
        <Grid item xs={12}>
            <Typography gutterBottom>
                {label}: {value}/{maxValue}
            </Typography>
            <Slider
             value={value}
             onChange={(e, newValue) => setValue(newValue)}
             max={maxValue}
             sx={{
                '& .MuiSlider-rail': {
                 backgroundColor: "#e7e7e7"
                }
                }}
                />

                </Grid>
            );
            }

export default MyCustomPage;

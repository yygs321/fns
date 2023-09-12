import React from 'react';
import { Typography, Button } from '@mui/material';

const MyCustomPage = () => {

    return (
        <div style={{ height: '100vh', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ 
                width: '80%', 
                backgroundColor: 'white', 
                borderRadius: '10px', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                padding: '20px', 
                textAlign: 'center',
                boxSizing: 'border-box',
                maxHeight: '80vh',
            }}>
                <Typography variant="h4" gutterBottom>
                    My Custom Page
                </Typography>
                <br/>

                {/* 페이지의 주 내용을 여기에 추가하세요. 예를 들어:
                <TextField 
                    fullWidth
                    margin="normal"
                    label="Some Input" 
                    // ... 나머지 TextField 설정 ...
                />
                */}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ fontSize: '20px', padding: '5px 100px' }}
                        // onClick={...} 버튼 클릭시 수행할 로직
                    >
                        Action Button
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyCustomPage;

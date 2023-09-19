import React, { useState, useRef } from 'react';
import { Typography, Slider, Button, Grid, Tooltip, IconButton, Modal, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';

const MyCustomPage = () => {
    // 더미 데이터
    const initialKcal = 2000;
    const initialCarbs = 250;
    const initialProtein = 50;
    const initialFat = 70;

    const [kcal, setKcal] = useState(initialKcal);
    const [carbs, setCarbs] = useState(initialCarbs);
    const [protein, setProtein] = useState(initialProtein);
    const [fat, setFat] = useState(initialFat);

    const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const [tooltipOpen, setTooltipOpen] = useState(false); // 툴팁의 상태를 관리

    const handleSave = () => {
        setOpenModal(true);
        timeoutRef.current = setTimeout(() => {
            navigate("/mypage");
        }, 1000);
    };

    const handleModalClose = () => {
        clearTimeout(timeoutRef.current);
        navigate("/mypage");
    };

    return (
        <div className="gray-pages" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="white-content-box" style={{ width: '80%', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <Typography variant="h5" gutterBottom align="center" style={{marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            나에게 맞는 영양소를 설정해보세요!
            <Tooltip title="내 추천 영양소의 0.5배 ~ 1.5배까지 조정 가능합니다!" open={tooltipOpen}>
                <IconButton size="small" style={{marginLeft: '10px'}} onClick={() => setTooltipOpen(!tooltipOpen)}>
                    <HelpOutlineIcon />
                </IconButton>
            </Tooltip>
            </Typography>

                <Grid container spacing={3}>
                    {renderSlider("칼로리", kcal, setKcal, initialKcal)}
                    {renderSlider("탄수화물", carbs, setCarbs, initialCarbs)}
                    {renderSlider("단백질", protein, setProtein, initialProtein)}
                    {renderSlider("지방", fat, setFat, initialFat)}
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" 
                      style={{ marginTop: '20px', fontSize: '20px', padding: '5px 100px' }}
                      onClick={handleSave}>
                        저장
                    </Button>
                    </Grid>
                </Grid>
                
            </div>
            <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                style={{
                    maxWidth: '400px', 
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                    border: '1px solid #ddd', 
                    p: 4,
                    textAlign: 'center',
                    padding: '20px'
                }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    저장되었습니다!
                </Typography>
                <Button style={{ marginTop: '12px' }} onClick={handleModalClose}>
                    확인
                </Button>
            </Box>
        </Modal>
        </div>
    );
    
};

const renderSlider = (label, value, setValue, initialValue) => {
    const minValue = initialValue * 0.5;
    const maxValue = initialValue * 1.5;

    return (
        <Grid item xs={12}>
            <Typography gutterBottom>
                {label}: {value}/{maxValue}
            </Typography>
            <Slider
             value={value}
             onChange={(e, newValue) => setValue(newValue)}
             min={minValue}
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

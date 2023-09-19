import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Modal, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const [nickname, setNickname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [openModal, setOpenModal] = useState(false); // 모달 상태 관리

    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const handleSave = () => {
        console.log({ nickname, height, weight });
        setOpenModal(true); // 저장 버튼을 클릭하면 모달 열기
        timeoutRef.current = setTimeout(() => {
            navigate("/mypage");
        }, 1000);
    };

    const handleModalClose = () => {
        clearTimeout(timeoutRef.current);  // setTimeout 취소
        navigate("/mypage");
    };

    const handleCheckNickname = () => {
        // 나중에 닉네임 중복 확인 API 연결
        console.log('닉네임 중복 확인');
    };

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
                    개인정보 수정
                </Typography>
                <br/>

                <TextField 
                fullWidth
                margin="normal"
                label="닉네임" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Typography variant="caption" style={{ whiteSpace: 'nowrap' }}>
                        2~16 글자 이내
                    </Typography>
                  ),
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                <Button 
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleCheckNickname}
                >
                    중복확인
                </Button>
            </div>

                <TextField 
                    fullWidth
                    margin="normal"
                    label="키" 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                    InputProps={{
                        endAdornment: <Typography variant="caption">cm</Typography>
                    }}
                />
                <TextField 
                    fullWidth
                    margin="normal"
                    label="체중" 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)}
                    InputProps={{
                        endAdornment: <Typography variant="caption">kg</Typography>
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ fontSize: '20px', padding: '5px 100px' }}
                        onClick={handleSave}
                    >
                        저장
                    </Button>
                </div>
            </div>
            <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
            <Grid container justifyContent="center">
                <Grid item xs={6}> 
                  <Box
                    style={{
                    maxWidth: '400px', 
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                    border: '1px solid #ddd', 
                    p: 4,
                    textAlign: 'center',
                    padding: '20px', 
                        }}
                        >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        저장되었습니다!
                    </Typography>
                    <Button style={{ marginTop: '12px' }} onClick={handleModalClose}>
                        확인
                    </Button>
                    </Box>
                </Grid>
                </Grid>
              </Modal>
            </div>
          );
        };

export default EditProfilePage;

import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Modal, Box, Grid, RadioGroup, FormControlLabel, Radio, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";

const EditProfilePage = () => {
    const [nickname, setNickname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
    const [프로필공개여부, set프로필공개여부] = useState(true);
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const [닉네임확인, set닉네임확인] = useState(false);
    // const [닉네임오류, set닉네임오류] = useState(undefined);
    const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
    const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });
    const 체크박스 = (e) => {
        set프로필공개여부(e.target.value);
      };
      const labelStyle = {
        whiteSpace: "nowrap",
      };  

      const handleSave = async () => {
        try {
          const res = await axios({
            method: "patch",
            url: `${SERVER_API_URL}/members/profile`,
            headers: {
              'X-FNS-ACCESSTOKEN': accessToken,
            },
            data: {
              nickname: nickname,
              age: age,
              height: height,
              weight: weight,
              isPublished: 프로필공개여부 === "true",
            },
          });
      
          if (res.data.success) {
            setOpenModal(true); // 저장에 성공하면 모달을 열어줍니다.
            timeoutRef.current = setTimeout(() => {
              navigate("/mypage");
            }, 1000);
          } else {
            // 저장에 실패했을 때의 로직을 작성합니다.
          }
        } catch (err) {
          console.log(err);
          // 에러 핸들링 로직을 작성합니다.
        }
      };
      

    const handleModalClose = () => {
        clearTimeout(timeoutRef.current);  // setTimeout 취소
        navigate("/mypage");
    };

    const handleCheckNickname = async () => {
      try {
        const 중복체크결과 = await axios({
          method: "post",
          url: `${SERVER_API_URL}/members/check-nickname-duplicate`,
          headers: {
            'X-FNS-ACCESSTOKEN': accessToken,
          },
          data: {
            nickname: nickname,
          },
        });
        if (중복체크결과.data.success) {
          set닉네임확인(true);
          // set닉네임오류(undefined);
        } else {
          set닉네임확인(false);
          // set닉네임오류(중복체크결과.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    

    return (
        <div style={{ height: '92vh', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                    disabled={닉네임확인}
                    size="small"
                    onClick={handleCheckNickname}
                    sx={{ color:"white", fontSize: "0.5rem",
                        borderRadius: "10px",  }}
                >
                    중복확인
                </Button>
            </div>
            <TextField 
                fullWidth
                margin="normal"
                label="나이" 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)}
                InputProps={{
                endAdornment: <Typography variant="caption">세</Typography>
                        }}
                />

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

                <RadioGroup row value={프로필공개여부} onChange={체크박스}>
                <Grid
                  item
                  container
                  justifyContent={"space-evenly"}
                  alignItems={"center"}
                >
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="프로필공개"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="프로필비공개"
                      sx={labelStyle}
                    />
                  </Grid>
                </Grid>
              </RadioGroup>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button 
                        variant="contained" 
                        sx={{ padding: '5px 100px', color:"white", fontSize: "1.5rem",
                        borderRadius: "10px",  }}
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

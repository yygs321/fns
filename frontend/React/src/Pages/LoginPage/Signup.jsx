import React from 'react';
// import {Grid, Container, FormControl, Box, TextField, Button} from '@mui/material';
import {Grid, Container, FormControl, TextField, Button} from '@mui/material';
import './CSS/Signup.scss';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Info from "./InfoPage";

const Signup = () => {

    const [유효한닉네임, set유효한닉네임] = useState(false)
    const [중복체크, set중복체크] = useState(false)
    const [인증, set인증] = useState(false)
    const 중복체크버튼 = () => {
        set중복체크(중복체크 => !중복체크)
    }
    const 인증확인버튼 = () => {
    }
    console.log(유효한닉네임); // 임시코드입니다. 나중에 지워주세요!
    console.log(set유효한닉네임); // 임시코드입니다. 나중에 지워주세요!
    console.log(인증); // 임시코드입니다. 나중에 지워주세요!
    console.log(set인증); // 임시코드입니다. 나중에 지워주세요!
    const [비밀번호, set비밀번호] = useState('');
    const [비밀번호확인, set비밀번호확인] = useState('');
    const [일치여부확인, set일치여부확인] = useState(true);
    const [비번양식확인, set비번양식확인] = useState(true);

    const 가입버튼 = () => {
        // 비밀번호 양식 확인
        const 비번체크결과 = 비번체크(비밀번호);
        set비번양식확인(비번체크결과);
    }

    function 비번체크(password) {
        const 비번조건 = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,16}$/;
        return 비번조건.test(password);
      }
      

    const 비밀번호입력 = e => {
        set비밀번호(e.target.value)
    }

    const 비밀번호확인입력 = e => {
        set비밀번호확인(e.target.value);
        set일치여부확인((e.target.value === 비밀번호) ? true : false);
    }

    const 최종확인 = 일치여부확인 && 비번양식확인;

    return (
        <Container maxWidth="xs" component="main">
            
            <div className='회원가입박스'>회원가입</div>
            <Grid sx={{mt : 6, ml : 4}} className="글자">
                <span>ID</span>
                <span id="이메일글씨크기">(이메일)</span>
            </Grid>
            <Grid container sx = {{ml : 4, mt : 1, mr : 2}} className="아이디입력컨테이너">
                <Grid item xs={8}>
                <TextField
                variant="outlined"
                color="primary"
                type="text"
                label="아이디"
                autoFocus
                required
                />
                </Grid>
                <Grid sx={{mt : 1}}>
                    <Button
                    onClick={중복체크버튼}
                    >
                        인증
                    </Button>
                </Grid>
            </Grid>

            <FormControl className="글자" sx={{ml : 4, mt : 4}}>
                인증번호 입력
            </FormControl>
            <Grid container sx={{ml : 4, mt : 1, mr : 2}}>
                <Grid xs={8}>
                <TextField
                disabled = {중복체크 ? true : false}
                variant="outlined"
                color="primary"
                type="text"
                label="인증번호"
                />
                </Grid>
                <Grid sx={{mt : 1}}>
                    <Button
                    onClick={인증확인버튼}
                    >
                        인증확인
                    </Button>
                </Grid>
            </Grid>
            <FormControl className="글자" sx={{ml : 4, mt : 4}}>
                비밀번호
            </FormControl>
            <Grid sx = {{ml : 4, mt : 1, mr : 4}}>
            <TextField
            variant='outlined'
            color = 'primary'
            fullWidth
            onChange={비밀번호입력}
            value={비밀번호}
            type="password"
            error={!비번양식확인}
            helperText={!비번양식확인 ? '비밀번호가 양식이 맞지 않습니다!' : ''}
            />
            </Grid>
            <FormControl className="글자" sx={{ml : 4, mt : 4}}>
                비밀번호 확인
            </FormControl>
            <Grid sx = {{ml : 4, mt : 1, mr : 4}}>
            <TextField
            variant='outlined'
            color = 'primary'
            fullWidth
            onChange={비밀번호확인입력}
            value={비밀번호확인}
            type="password"
            error={!일치여부확인}
            helperText={!일치여부확인 && '비밀번호가 일치하지 않습니다'}
            />
            </Grid>
            <Grid sx = {{mt : 8, ml : 4, mr : 4}}>
            <Button
            onClick={가입버튼}
            color='primary'
            variant='contained'
            className='가입버튼'
            fullWidth
            >
                {최종확인 ? <Link style={{textDecoration : 'none'}}to='/info' element={<Info/>}>가입</Link> : '가입'}
            </Button>
            </Grid>
        </Container>
    );
};

export default Signup;
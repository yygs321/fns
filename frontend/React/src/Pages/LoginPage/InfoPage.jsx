import React from "react";
// import {
//   Grid,
//   Container,
//   FormControl,
//   Box,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
import {
  Grid,
  Container,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./CSS/InfoPage.scss";
import { useState } from "react";
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import WomanRoundedIcon from '@mui/icons-material/WomanRounded';
import LoginPage from "./LoginPage";
import {Link} from 'react-router-dom';


function 닉네임확인함수(nickname) {
  const regex = /^[a-zA-Z0-9가-힣]{2,16}$/;
  return regex.test(nickname);
}

const InfoPage = () => {
  const [닉네임, set닉네임] = useState("");
  const [닉네임확인, set닉네임확인] = useState(true);
  const [프로필공개여부, set프로필공개여부] = useState(true);
  const [성별, set성별] = useState('');
  const 닉네임입력 = (e) => {
    set닉네임(e.target.value);
  };
  console.log(닉네임확인);  // 임시로 닉네임확인 사용. 나중에 지워주세요!
  console.log(닉네임입력);  // 임시로 닉네임입력 사용. 나중에 지워주세요!

  const 저장버튼 = () => {
    const 닉네임확인결과 = 닉네임확인함수(닉네임);
    set닉네임확인(닉네임확인결과);
  };

  const 남성버튼 = () => { 
    set성별(name => '남성');
  }
  const 여성버튼 = () => {
    set성별(name => '여성');
  }
  const 체크박스 = e => {
    set프로필공개여부(e.target.value);
  }
  const labelStyle = {
    whiteSpace: 'nowrap'
  };

  return (
    <Container maxWidth="xs" componenet="main">
      <div className="정보입력박스">정보 입력</div>
      <Grid sx={{ mt: 8, ml: 3, mr: 2 }} className="닉네임박스">
        <span className="닉네임글자">닉네임</span>
        <TextField
            variant="outlined"
            color="primary"
            type="text"
            label="닉네임"
            autoFocus
            required
            className="닉네임입력"
            
        />
      </Grid>
        <Grid sx={{ mt: 6, ml: 3, mr: 2 }} className="나이박스">
        <span className="나이글자">나이</span>
        <TextField
            variant="outlined"
            color="primary"
            type="number"
            label="나이"
            className="나이입력"
            />
        <span className="나이단위">(세)</span>
        </Grid>
        <Grid sx={{ mt: 2, ml: 3, mr: 2 }} className="키박스">
        <span className="키글자">키</span>    
        <TextField
            variant="outlined"
            color="primary"
            type="number"
            label="키"
            className="키입력"
            />
        <span className="키단위">(cm)</span>
        </Grid>
        <Grid sx={{ mt: 2, ml: 3, mr: 2 }} className="체중박스">
        <span className="체중글자">체중</span>    
        <TextField
            variant="outlined"
            color="primary"
            type="number"
            label="체중"
            className="체중입력"
            />
        <span className="체중단위">(kg)</span>
        </Grid>
        <Grid container sx={{mt : 8, ml : 3, mr : 2}} className="성별박스">
            <span className="성별글자">성별</span>
            <ManRoundedIcon
            sx={{fontSize:'5rem', mr : 6, backgroundColor : 성별 === '남성' && '#00E1AB'}}
            onClick={남성버튼}
            />
            <WomanRoundedIcon
            onClick={여성버튼}
            sx={{fontSize:'5rem',
            backgroundColor : 성별 === '여성' && '#00E1AB',
        }}
            />
            <Grid sx={{ml : 2}}>{성별}</Grid>
        </Grid>

        <Grid container sx={{mt : 8, ml : 2, mr : 2}}>
          <RadioGroup
          row
          value={프로필공개여부}
          onChange={체크박스}
          >
          <Grid xs={6}>
            <FormControlLabel value="프로필공개" control={<Radio/>} label="프로필공개"/>
          </Grid>
          <Grid xs={6}>
            <FormControlLabel value="프로필비공개" control={<Radio/>} label="프로필비공개" sx={labelStyle}/>
          </Grid>
          </RadioGroup>
          <span>{프로필공개여부}</span>
        </Grid>

        <Button sx={{mt : 8}} className="저장버튼" fullWidth variant="contained" onClick={저장버튼}>
          <Link to='/' style={{textDecoration : 'none'}} element={LoginPage}>저장</Link>
        </Button>
    </Container>
  );
};

export default InfoPage;

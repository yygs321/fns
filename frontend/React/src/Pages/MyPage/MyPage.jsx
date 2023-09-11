import React, { useState } from "react";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import "./MyPage.css"; 
import profileimg from "../../assets/Image/그만먹어.png";

const MyPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const profile = {
    image: uploadedImage || profileimg,
    nickname: "든든한 돼지국밥",
    age: 1,
    gender: "남",
    height: 134,
    weight: 200,
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img 
            src={profile.image} 
            alt="User's Profile" 
            className="profile-avatar" 
            />

            <label 
              style={{ 
                position: "absolute", 
                bottom: "2px", 
                right: "2px", 
                cursor: "pointer"
              }}
            >
              <PhotoCameraIcon 
                style={{ 
                  fontSize: 'small', 
                  color: '#FFFFFF', 
                  backgroundColor: '#00E1AB',
                  padding: '8px',
                  borderRadius: '50%'
                }}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
        </div>
        <div className="profile-details">
            <Typography variant="h5">{profile.nickname}</Typography>
            <br/>
            <Typography>나이: {profile.age}</Typography>
            <Typography>성별: {profile.gender}</Typography>
            <Typography>키: {profile.height} cm</Typography>
            <Typography>몸무게: {profile.weight} kg</Typography>
        </div>
      </div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>나만의 영양소 설정</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Details about Nutrition Settings.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>회원정보 수정</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Details about Editing Profile.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>로그아웃</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Details about Logout.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyPage;

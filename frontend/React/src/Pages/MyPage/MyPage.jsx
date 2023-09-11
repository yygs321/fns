import React, { useState } from "react";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Avatar, 
  Button 
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
          <Avatar 
            src={profile.image} 
            alt="Profile Picture" 
            className="profile-avatar" 
          />
          <Button
              variant="contained"
              component="label"
              style={{ position: "absolute", bottom: "20px", right: "20px" }}
            >
              <PhotoCameraIcon />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
          </Button>
        </div>
        <div className="profile-details">
            <Typography variant="h5">{profile.nickname}</Typography>
            <Typography>Age: {profile.age}</Typography>
            <Typography>Gender: {profile.gender}</Typography>
            <Typography>Height: {profile.height} cm</Typography>
            <Typography>Weight: {profile.weight} kg</Typography>
        </div>
      </div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Nutrition Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Details about Nutrition Settings.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Edit Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Details about Editing Profile.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Logout</Typography>
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

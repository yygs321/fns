import React, { useState } from "react";
import {
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import "./MyPage.css";
import profileimg from "../../assets/Image/cat.jpg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userLogout } from "../../Redux/actions/actions";

const MyPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [openNestedList, setOpenNestedList] = useState(false); // Nested List의 상태를 관리하는 state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = {
    image: uploadedImage || profileimg,
    nickname: "선글라스킹냥이",
    age: 1,
    gender: "남",
    height: 34,
    weight: 10,
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
    // 임시
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
              bottom: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          >
            <PhotoCameraIcon
              className="camera-icon"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#00E1AB",
                padding: "8px",
                borderRadius: "50%",
              }}
            />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="profile-details">
          <Typography variant="h5">{profile.nickname}</Typography>
          <br />
          <Typography>나이: {profile.age}</Typography>
          <Typography>성별: {profile.gender}</Typography>
          <Typography>키: {profile.height} cm</Typography>
          <Typography>몸무게: {profile.weight} kg</Typography>
        </div>
      </div>
      <Divider />

      <List>
        <ListItemButton component={Link} to="/mypage/mycustom">
          <ListItemText primary="나만의 영양소 설정" />
          <ListItemIcon>
            <ChevronRightIcon style={{ color: "#00E1AB" }} />
          </ListItemIcon>
        </ListItemButton>
        <Divider />

        <ListItemButton onClick={() => setOpenNestedList(!openNestedList)}>
          <ListItemText primary="회원정보 수정" />
          <ListItemIcon>
            {openNestedList ? (
              <ExpandMoreIcon style={{ color: "#00E1AB" }} />
            ) : (
              <ChevronRightIcon style={{ color: "#00E1AB" }} />
            )}
          </ListItemIcon>
        </ListItemButton>
        <Divider />
        <Collapse in={openNestedList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="/mypage/edit-profile"
              style={{ paddingLeft: 32 }}
            >
              {" "}
              {/* padding을 추가하여 중첩된 항목처럼 보이게 함 */}
              <ListItemText primary="개인정보 수정" />
              <ChevronRightIcon style={{ color: "#00E1AB" }} />
            </ListItemButton>
            <Divider />
            <ListItemButton style={{ paddingLeft: 32 }}>
              <ListItemText primary="회원탈퇴" />
              <ChevronRightIcon style={{ color: "#00E1AB" }} />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />

        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="로그아웃" />
          <ListItemIcon>
            <ChevronRightIcon style={{ color: "#00E1AB" }} />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </div>
  );
};

export default MyPage;

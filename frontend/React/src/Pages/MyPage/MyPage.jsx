import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";

import { userLogout } from "../../Redux/actions/actions";
import axiosInstance from "../Common/Component/AxiosInstance";
import Loading from "../Common/Component/Loading";
import "./MyPage.css";

const MyPage = () => {
  const [openNestedList, setOpenNestedList] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    image: null,
    nickname: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
  });

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const expirationTime = sessionStorage.getItem("expirationTime");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post(`${SERVER_API_URL}/members/image`, formData, {
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("이미지가 성공적으로 업로드되었습니다.");

      window.location.reload();
    } catch (error) {
      console.error("Error while uploading image:", error);
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("expirationTime");
    navigate("/");
  };

  const handleMemberWithdrawal = async () => {
    try {
      const response = await axiosInstance.delete(`${SERVER_API_URL}/members`, {
        headers: {
          "X-FNS-ACCESSTOKEN": accessToken,
        },
        data: {
          accessToken: accessToken,
          expirationTime: expirationTime,
          refreshToken: refreshToken,
        },
      });

      if (response.data.success) {
        alert("회원 탈퇴가 성공적으로 완료되었습니다.");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("expirationTime");
        dispatch(userLogout());
        navigate("/");
      } else {
        alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Error while withdrawing member:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`${SERVER_API_URL}/members`, {
          headers: {
            "X-FNS-ACCESSTOKEN": accessToken,
          },
        });

        if (response.data.success) {
          const { nickname, age, height, weight, gender, fileUrl } =
            response.data.data;

          setProfile((prevProfile) => ({
            ...prevProfile,
            nickname,
            age,
            height,
            weight,
            gender: gender === "FEMALE" ? "여" : "남",
            image: fileUrl || null,
          }));
        } else {
          console.error("Failed to fetch profile:", response.data.message);
        }
      } catch (error) {
        console.error("Error while fetching profile:", error);
      }
      setIsLoading(false);
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
            alt="User's Profile"
            src={profile.image}
            className="profile-avatar"
            sx={{ width: "10rem", height: "10rem" }}
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
            <ListItemButton
              component={Link}
              to="/mypage/changepassword"
              style={{ paddingLeft: 32 }}
            >
              <ListItemText primary="비밀번호 변경" />
              <ChevronRightIcon style={{ color: "#00E1AB" }} />
            </ListItemButton>
            <Divider />
            <ListItemButton
              onClick={handleMemberWithdrawal}
              style={{ paddingLeft: 32 }}
            >
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

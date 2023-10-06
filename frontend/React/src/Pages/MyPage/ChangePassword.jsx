import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button, TextField, Typography, Modal, Box, Grid } from "@mui/material";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      setOpenModal(true);
      timeoutRef.current = setTimeout(() => {
        navigate("/mypage");
      }, 1000);
    } else {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleModalClose = () => {
    clearTimeout(timeoutRef.current);
    navigate("/mypage");
  };

  return (
    <div
      style={{
        height: "92vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          textAlign: "center",
          boxSizing: "border-box",
          maxHeight: "80vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          비밀번호 변경
        </Typography>
        <br />
        <TextField
          fullWidth
          margin="normal"
          label="이전 비밀번호"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="새 비밀번호"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="새 비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              padding: "5px 100px",
              color: "white",
              fontSize: "1.5rem",
              borderRadius: "10px",
            }}
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <Box
              style={{
                maxWidth: "400px",
                backgroundColor: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
                border: "1px solid #ddd",
                p: 4,
                textAlign: "center",
                padding: "20px",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                비밀번호가 변경되었습니다!
              </Typography>
              <Button style={{ marginTop: "12px" }} onClick={handleModalClose}>
                확인
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ChangePassword;

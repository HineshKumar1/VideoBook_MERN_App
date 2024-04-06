import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    avatar: null // Added file field to store uploaded file
  });

  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setFormData({ ...formData, avatar: info.file.originFileObj }); 
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Form validation
      if (!formData.fullName || !formData.userName || !formData.email || !formData.password || !formData.avatar) {
        setError("All fields are required.");
        return;
      }
  
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("fullName", formData.fullName);
      formDataToSubmit.append("userName", formData.userName);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("avatar", formData.avatar); // Append the file data with the correct field name
  
      const response = await axios.post(
        "https://example.com/api/v1/users/register", // Change to your actual backend endpoint
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.status === "success") {
        message.success("User registered successfully");
      } else {
        setError("User registration failed");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  onChange={handleChange}
                  required
                  fullWidth
                  value={formData.fullName}
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  onChange={handleChange}
                  value={formData.userName}
                  label="User Name"
                  name="userName"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  value={formData.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={formData.password}
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Upload
                  name="avatar"
                  action="https://example.com/api/upload" 
                  onChange={handleFileChange}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Grid>
            </Grid>
            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

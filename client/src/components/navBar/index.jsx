import { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  Stack
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const mLocation = useLocation();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const toLogin = () => {
    navigate('/login');
  };
  const toReg = () => {
    navigate('/reg');
  };

  useEffect(() => {
    const mUserInfo = JSON.parse(localStorage.getItem('user') || '{}')
    if (mUserInfo.user) {
      setUserInfo(mUserInfo.user)
    }
  }, [mLocation])

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 30px", borderBottom: "1px solid #e0e0e0" }}>
        <div className="col-10">
          <Typography variant="h6" sx={{ cursor: "pointer", marginBottom: "10px" }} onClick={() => navigate("/")}>
            Logo Placeholder
          </Typography>
        </div>
        <div className="col-2">
          <Stack direction={'row'}>
            {userInfo ? 
              (
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Typography>{userInfo.username}</Typography>
                  <Button
                    onClick={() => {
                      localStorage.clear()
                      setUserInfo()
                    }}
                    variant="outlined"
                    sx={{ margin: "0 3px" }}
                  >
                    Logout
                  </Button>
                </Stack>
              ) :
              (
                <Stack direction={'row'}>
                  <Button onClick={toLogin} variant="contained" sx={{ margin: "0 3px" }}>Login</Button>
                  <Button onClick={toReg} variant="outlined" sx={{ margin: "0 3px" }}>Sign Up</Button>
                </Stack>
              )
            }
          </Stack>
        </div>
      </Box>

      {isMobileMenuToggled && !isNonMobile && (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 30px", borderBottom: "1px solid #e0e0e0" }}>
          <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <Close />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ cursor: "pointer", marginBottom: "10px" }} onClick={()=> navigate("/")}>Home</Typography>
            <Typography variant="h6" sx={{ cursor: "pointer", marginBottom: "10px" }} onClick={() => navigate("/login")}>Login</Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default NavBar;
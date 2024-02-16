import {useState} from "react";
import {Box, IconButton, InputBase, Typography, Select, MenuItem,FormControl, useTheme, useMediaQuery} from "@mui/material";
import {Search, Menu,Message,DarkMode,LightMode,Notifications,Help,Close} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setMode} from "../../state";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user);
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;

  return (
    <div>
      <h1>navBar</h1>
    </div>
  );
}
export default NavBar;
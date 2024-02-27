import {useState} from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Button
} from "@mui/material";
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

    const toLogin = ()=>{
        navigate('/login')
    }

  return (
    <div>
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 30px", borderBottom:"1px solid #e0e0e0"}}>
            <div className="col-10">
                <Typography variant="h6" sx={{cursor:"pointer", marginBottom:"10px"}} onClick={()=>navigate("/")}>Logo Placeholder</Typography>
            </div>
            <div className="col-2">
                <Button onClick={toLogin} variant="contained" sx={{margin: "0 3px"}}>Login</Button>
                <Button variant="outlined" sx={{margin: "0 3px"}}>Sign Up</Button>
            </div>
        </Box>
        {isMobileMenuToggled && !isNonMobile && (
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 30px", borderBottom:"1px solid #e0e0e0"}}>
            <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Close/>
            </IconButton>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Typography variant="h6" sx={{cursor:"pointer", marginBottom:"10px"}} onClick={()=>navigate("/")}>Home</Typography>
                <Typography variant="h6" sx={{cursor:"pointer", marginBottom:"10px"}} onClick={()=>navigate("/login")}>Login</Typography>
            </Box>
            </Box>
        )}
    </div>
  );
}
export default NavBar;
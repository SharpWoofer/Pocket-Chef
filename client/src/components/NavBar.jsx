import {Box, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';

const LinkWrapper = styled(Box)(({theme}) => ({
    position: "relative",
    "::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 0,
        height: "2px",
        backgroundColor: theme.palette.primary.main,
    },
    ":hover": {
        color: theme.palette.primary.main,
        transition: "color 0.25s ease-in-out",
    },
    ":hover::after": {
        width: "100%",
        transition: "width 0.25s ease-in-out",
    }
}))

const NavBar = () => {
    const user = useSelector((state) => state.auth)
    const links = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Recipes",
            path: "/recipes"
        },
        {
            name: "Fitness",
            path: "/fitness"
        },
        {
            name: "Gyms",
            path: "/gyms"
        },
        {
            name: "Calories Tracker",
            path: "/calorietracker"
        },
        {
            name: "Calculator",
            path: "/calculator"
        }
    ]

    return (
        <Box sx={{
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Add a subtle shadow for depth
        }}>
            <Stack style={{height: "13vh"}}>
                <Stack padding={2} direction="row" justifyContent="space-between" alignItems="center"
                       style={{height: "100%"}}>
                    <Stack direction="row" spacing={2} alignItems="center" style={{height: "100%", width: "14em"}}>
                        <img src="logo.png" alt="Logo" style={{width: '100%', height: '180%'}}/>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center"
                           style={{width: "70em", justifyContent: "space-around"}}>
                        {links.map(({name, path}) => (
                            <NavLink key={name} to={path} style={{
                                fontSize: "1.1em",
                                textDecoration: "none",
                                color: "black",
                                transition: "color 0.2s ease-in-out", // Smooth transition for color change
                                fontWeight: 500,
                            }}>
                                <LinkWrapper paddingX={1} paddingY={2} style={{
                                    ":hover": {
                                        color: "#1c7b00", // Enhanced hover effect
                                    }
                                }}>
                                    {name}
                                </LinkWrapper>
                            </NavLink>
                        ))}
                    </Stack>
                    <Stack direction="row"
                           style={{height: "100%", width: "10em", display: "flex", justifyContent: "center"}}>
                        <NavLink to={user.token ? "/profile" : "/login"}>
                            <Stack justifyContent="center" sx={{
                                padding: 2,
                                position: "relative",
                                color: "black",
                                ":hover": {
                                    color: "#1c7b00",
                                    transition: "color 0.25s ease-in-out",
                                },
                                ":hover::after": {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 0,
                                    height: '2px',
                                    backgroundColor: '#1c7b00', // Underline effect on hover
                                }
                            }} style={{width: "100%", height: "100%"}}>
                                <img src={"man.png"} style={{height: "140%"}}/>
                            </Stack>
                        </NavLink>
                    </Stack>
                </Stack>
            </Stack>
        </Box>

    );
}

export default NavBar;

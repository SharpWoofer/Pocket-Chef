import {Box, createTheme, CssBaseline, Stack, ThemeProvider} from "@mui/material";
import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";

const theme = createTheme({
    palette: {
        text: {
            main: "#0f0909",
        },
        background: {
            main: "#ededed",
        },
        primary: {
            main: "#1c7b00",
            contrastText: "#ededed",
        },
        secondary: {
            main: "#a8ccc5",
            contrastText: "#0f0909",
        },
        accent: {
            main: "#8e9abc",
            contrastText: "#0f0909",
        },
    },
});

function Root() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Stack>
                    <NavBar/>
                    <Box>
                        <Outlet/>
                    </Box>
                </Stack>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default Root;
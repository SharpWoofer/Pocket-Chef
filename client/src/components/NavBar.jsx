import { Box, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';

const LinkWrapper = styled(Box)(({ theme }) => ({
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
  const links = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Recipe",
      path: "/recipes"
    },
    {
      name: "Community",
      path: "/community"
    },
    {
      name: "About Us",
      path: "/aboutus"
    }
  ]

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="lg" >
        <Stack padding={2} direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center" >
            <img src={logo} alt="Logo" style={{ width: '48px', height: '48px' }} />
            <Typography variant="h1" sx={{
              fontSize: '1.5rem',
              letterSpacing: '-0.025rem',
              fontWeight: 'bold',
            }}>
              Pocket Chef
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            {links.map(({ name, path }) => (
              <NavLink key={name} to={path} style={{
                textDecoration: "none",
                color: "black"
              }}>
                <LinkWrapper paddingX={1} paddingY={2}>
                  {name}
                </LinkWrapper>
              </NavLink>
            ))}
          </Stack>
          <Stack direction="row">
            <NavLink to="/login">
              <Stack justifyContent="center" sx={{
                padding: 2,
                position: "relative",
                color: "black",
                ":hover": {
                  color: "#1c7b00",
                  transition: "color 0.25s ease-in-out",
                },
                ":hover::after": {
                  width: "100%",
                  transition: "width 0.25s ease-in-out",
                }
              }}>
                <AccountIcon fontSize="large" />
              </Stack>
            </NavLink>
          </Stack>
        </Stack>
      </Container >
    </Box>
  );
}

export default NavBar;
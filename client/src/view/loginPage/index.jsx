import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import request from "../../utils/request"
import { Google, Facebook, Apple } from "@mui/icons-material"

const LoginPage = () => {
  const mNavigate = useNavigate()

  return (
    <Box
      display={'flex'}
      width={'100vw'}
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack
        spacing={2}
        padding={1}
        width={'500px'}
      >
        <Stack>
          <Typography
            marginBottom={2}
            textAlign={'center'}
            fontSize={40}
            color={'#666'}
            fontWeight={'bold'}
          >
            Welcome Back
          </Typography>
          <Box
            marginBottom={2}
            textAlign={'center'}
            fontWeight={'bold'}
          >
            <Typography fontSize={19}><Link to="/login">Sign in</Link> to track your progress, or <Link to="/reg">register</Link> to personalize</Typography>
            <Typography fontSize={19}>Your fitness journey with custom workout plans, calorie</Typography>
            <Typography fontSize={19}>tracking, and more.</Typography>
          </Box>
        </Stack>
        <form
          onSubmit={async(event) => {
            event.preventDefault()
            const mELements = event.target.elements
            const { data } = await request.post('/auth/login', {
              email: mELements.email.value,
              password: mELements.password.value
            })
            localStorage.setItem('user', JSON.stringify(data))
            alert('Login success')
            mNavigate('/')
          }}
          >
          <Stack spacing={6}>
            <Stack paddingLeft={4} spacing={5} paddingRight={4}>
              <TextField
                size="small"
                name="email"
                required
                label='User name,Email & Phone number'
              />
              <TextField
                size="small"
                name="password"
                required
                label='Password'
                type='password'
              />
            </Stack>
            <Stack spacing={2}>
              <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
                <Typography
                  fontSize={14}
                  fontWeight={'bold'}
                  color={'grey'}
                  onClick={() => mNavigate('/forget')}
                  sx={{ cursor: 'pointer' }}
                >
                  Forget Password?
                </Typography>
              </Stack>
              <Stack alignItems={'center'} justifyContent={'center'}>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    width: '300px',
                    background: '#a4be9b'
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
        <Stack spacing={2}>
          <Stack
            padding={2}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              textAlign={'center'}
              sx={{
                padding: '1px',
                position: 'relative',
                background: 'linear-gradient(to right,#fff,#000,#fff)'
              }}
            >
              <Typography
                position={'absolute'}
                sx={{ background: '#fff', padding: '0 20px' }}
              >
                Or sign up with
              </Typography>
            </Box>
          </Stack>
          <Stack
            justifyContent={'center'}
            direction={'row'}
            spacing={2}
          >
            <IconButton>
              <Google></Google>
            </IconButton>
            <IconButton>
              <Facebook></Facebook>
            </IconButton>
            <IconButton>
              <Apple></Apple>
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default LoginPage

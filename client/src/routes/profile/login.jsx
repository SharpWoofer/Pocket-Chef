import {Box, Button, IconButton, Snackbar, Stack, TextField, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {Apple, Facebook, Google} from "@mui/icons-material"
import {useState} from "react"
import {useLoginMutation} from "../../store/apis/auth.js"
import Link from "../../components/Link.jsx"
import {setCredentials} from "../../store/authSlice.js"
import {useDispatch} from "react-redux"

const Login = () => {
  const mNavigate = useNavigate()
  const [message, setMessage] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()
  const mDispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const { data, error } = await login({ username, password })
    if (data) {
      mDispatch(setCredentials(data))
      setMessage({ msg: 'login successful!!!' })
      setTimeout(() => {
        mNavigate('/profile')
      }, 1500);
    } else {
      setMessage({ msg: error.data.error })
    }
  }

  return (
    <Box
      display={'flex'}
      width={'100vw'}
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message ? true : false}
        autoHideDuration={1500}
        message={message?.msg}
        onClose={() => setMessage(null)}
      />
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
            <Typography fontSize={19}><Link to="/login">Sign in</Link> to track your progress, or <Link to="/register">register</Link> to personalize</Typography>
            <Typography fontSize={19}>Your fitness journey with custom workout plans, calorie</Typography>
            <Typography fontSize={19}>tracking, and more.</Typography>
          </Box>
        </Stack>
        <form
          onSubmit={handleLogin}
        >
          <Stack spacing={6}>
            <Stack paddingLeft={4} spacing={5} paddingRight={4}>
              <TextField
                size="small"
                id="email"
                name="email"
                value={username}
                required
                label='Username, Email or Phone number'
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                size="small"
                id="password"
                name="password"
                value={password}
                required
                label='Password'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
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

export default Login;

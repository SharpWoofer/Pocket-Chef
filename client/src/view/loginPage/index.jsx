import { Box, Button, FormLabel, Stack, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import request from "../../utils/request"

const LoginPage = () => {
  const mNavigate = useNavigate()

  return (
    <Box
      display={'flex'}
      width={'100%'}
      paddingTop={4}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack
        padding={1}
        width={'800px'}
      >
        <Typography marginBottom={2} textAlign={'center'} fontSize={40} fontWeight={'bold'}>Welcome - Please Login</Typography>
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
          <Stack spacing={2}>
            <Stack spacing={1}>
              <FormLabel>Email</FormLabel>
              <TextField value={'admin@admin.com'} name="email" required label='email' />
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Password</FormLabel>
              <TextField value={'123456'} name="password" required label='password' type='password' />
            </Stack>
            <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
              <Typography>no account?</Typography>
              <Link to={'/reg'}>Go Reg</Link>
            </Stack>
            <Stack spacing={1}>
              <Button type='submit' variant='contained'>Login</Button>
              <Typography
                fontSize={14}
                color={'grey'}
                onClick={() => mNavigate('/forget')}
                sx={{ cursor: 'pointer' }}
              >
                forget the password?
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
}

export default LoginPage

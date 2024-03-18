import { Box, Button, FormLabel, Stack, TextField, Typography } from "@mui/material"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const RegPage = () => {
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
        <Typography marginBottom={2} textAlign={'center'} fontSize={40} fontWeight={'bold'}>Welcome - Please Reg</Typography>
        <form
          onSubmit={async(event) => {
            event.preventDefault()
            await axios.post('http://localhost:5000/auth/reg', event.target)
            alert('Reg success')
            mNavigate('/login')
          }}
          >
          <Stack spacing={2}>
            <Stack spacing={1}>
              <FormLabel>Username</FormLabel>
              <TextField required name="username" label='username' />
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Email</FormLabel>
              <TextField required name="email" label='email' />
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Password</FormLabel>
              <TextField required name="password" label='password' type='password' />
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Avater</FormLabel>
              <input name="picture" required type="file" />
            </Stack>
            <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
              <Typography>Already have an account?</Typography>
              <Link to={'/login'}>Go Login</Link>
              {/* <Typography color={'blue'} onClick={() => }>Go Reg</Typography> */}
            </Stack>
            <Button type='submit' variant='contained'>Login</Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
}

export default RegPage

import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Google, Facebook, Apple } from "@mui/icons-material"
import { useState } from "react"
import { useLoginMutation } from "../store/apis/auth"
import Link from "../components/Link"

const Login = () => {
    const mNavigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, { data }] = useLoginMutation()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await login({ email, password })
            console.log(response)
        } catch (error) {
            console.log(error)
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
                    onSubmit={handleLogin}
                >
                    <Stack spacing={6}>
                        <Stack paddingLeft={4} spacing={5} paddingRight={4}>
                            <TextField
                                size="small"
                                id="email"
                                name="email"
                                value={email}
                                required
                                label='Username, Email or Phone number'
                                onChange={(event) => setEmail(event.target.value)}
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

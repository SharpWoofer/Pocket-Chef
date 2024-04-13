import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import * as echatrs from 'echarts'
//import CalorieGraph from "../calorietracker/calorieGraph"
import "./profile.css"
import { useEffect, useRef, useState } from "react"
import { useAddUserWeightMutation, useGetUserWeightListMutation, useSetUserInfoMutation } from "../../store/apis/auth"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useUploadFileMutation } from "../../store/apis/common"
import { clearUserInfo, setLocalUserInfo } from "../../store/authSlice"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth)
  const [message, setMessage] = useState()
  const [setUserInfo] = useSetUserInfoMutation()
  const [addUserWeight] = useAddUserWeightMutation()
  const [getUserWeightList] = useGetUserWeightListMutation()
  const [uploadFile] = useUploadFileMutation()
  const mDispatch = useDispatch()
  const mNavigate = useNavigate()
  const mLine = useRef()

  async function init() {
    const mDom = mLine.current
    if (mDom) {
      const { data } = await getUserWeightList({ token })
      const mCharts = echatrs.init(mDom)
      mCharts.setOption({
        title: {
          text: 'Weight Line Chart'
        },
        grid: {
          left: '4%',
          right: '6%',
          bottom: '5%'
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.datetime)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: data.map(item => item.weight)
          }
        ]
      })
    }
  }

  useEffect(() => {
    init()
  }, [])

  const onSubmit = async(event) => {
    event.preventDefault()
    const mForm = event.target.elements
    const mBody = JSON.parse(JSON.stringify(user || {}))
    for (const item of mForm) {
      if (item.name) {
        mBody[item.name] = item.value
      }
    }
    await setUserInfo({
      ...mBody,
      token
    })
    mDispatch(setLocalUserInfo({
      user: mBody
    }))
    setMessage({ msg: 'update successful!!!' })
  }

  const onLogout = () => {
    if (!confirm('Rally logout?')) {
      return
    }
    mDispatch(clearUserInfo())
    mNavigate('/login')
  }

  /**
   * add user weight
   * @param {Event} event 
   */
  const onAddWeight = async(event) => {
    event.preventDefault()
    
    const mForm = event.target.elements
    const mBody = {}
    for (const item of mForm) {
      if (item.name) {
        mBody[item.name] = item.value
      }
    }
    await addUserWeight({ ...mBody, token })
    await init()
  }

  /**
   * upload user avatar
   */
  const uploadAvatar = () => {
    const mDom = document.createElement('input')
    mDom.type = 'file'
    mDom.click()
    mDom.onchange = async({ target }) => {
      const [mFile] = target.files
      const mFormData = new FormData()
      mFormData.append('file', mFile)
      const { data } = await uploadFile(mFormData)
      const picture = import.meta.env.VITE_BACKEND_URL + data.path
      await setUserInfo({ picture, token })
      
      mDispatch(setLocalUserInfo({
        user: {
          ...user,
          picture
        }
      }))
      setMessage({ msg: 'update successful!!!' })
    }
    mDom.remove()
  }

  return (
    <Stack direction="row" alignItem="center" justifyContent="space-around" >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message ? true : false}
        autoHideDuration={1500}
        message={message?.msg}
        onClose={() => setMessage(null)}
      />
      <Box
        width="45%"
      >
        <Grid item direction="row" alignItem="center" xs={2} marginLeft={2} marginTop={3} justifyContent="space-around" sx={{ display: "flex" }}>
          <Box sx={{
            width: "13rem",
            height: "16rem",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            boxShadow: "-5px 12px 20px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)",
          }}>
            <Stack direction="row" padding={3} sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormLabel sx={{ width: '40%', textAlign: "start", paddingTop: '5%' }}>STEPS</FormLabel>
              <Select
                sx={{ width: "55%" }}
                name="Date Selector"
                size="small"
                defaultValue="Daily"
              >
                <MenuItem value={1}>Daily</MenuItem>
                <MenuItem value={2}>Weekly</MenuItem>
                <MenuItem value={3}>Monthly</MenuItem>
              </Select>
            </Stack>
            <Stack>
              <Box className="box" sx={{ marginLeft: '1.5em' }}>
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: "calc(440 - (440 * 57) / 100)", stroke: "#27A468" }}></circle>
                  </svg>
                  <div className="num">
                    <h2>57<span>%</span></h2>
                  </div>
                </div>
              </Box>
            </Stack>
          </Box>
          <Box sx={{
            width: "13rem",
            height: "16rem",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            boxShadow: "-5px 12px 20px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)",
          }}>
            <Stack direction="row" padding={3} sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormLabel sx={{ width: '40%', textAlign: "start", paddingTop: '5%' }}>SLEEP</FormLabel>
              <Select
                sx={{ width: "55%" }}
                name="Date Selector"
                size="small"
                defaultValue="Daily"
              >
                <MenuItem value={1}>Daily</MenuItem>
                <MenuItem value={2}>Weekly</MenuItem>
                <MenuItem value={3}>Monthly</MenuItem>
              </Select>
            </Stack>
            <Stack>
              <Box className="box" sx={{ marginLeft: '1.5em' }}>
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: "calc(440 - (440 * 28) / 100)", stroke: "#E53761" }}></circle>
                  </svg>
                  <div className="num">
                    <h2>28<span>%</span></h2>
                  </div>
                </div>
              </Box>
            </Stack>
          </Box>
          <Box sx={{
            width: "13rem",
            height: "16rem",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            boxShadow: "-5px 12px 20px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)",
          }}>
            <Stack direction="row" padding={3} sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormLabel sx={{ width: '40%', textAlign: "start", paddingTop: '5%' }}>GOALS</FormLabel>
              <Select
                sx={{ width: "55%" }}
                name="Date Selector"
                size="small"
                defaultValue="Daily"
              >
                <MenuItem value={1}>Daily</MenuItem>
                <MenuItem value={2}>Weekly</MenuItem>
                <MenuItem value={3}>Monthly</MenuItem>
              </Select>
            </Stack>
            <Stack>
              <Box className="box" sx={{ marginLeft: '1.5em' }}>
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className="num">
                    <h2>87<span>%</span></h2>
                  </div>
                </div>
              </Box>
            </Stack>
          </Box>

        </Grid>
        
        {/* <Stack alignItems="center" gap={12} paddingY={10}>
                <CalorieGraph />
        </Stack> */}
        <Box
          marginTop={3}
          padding={2}
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            boxShadow: "-5px 12px 20px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)",
          }}
        >
          <form onSubmit={onAddWeight}>
            <Stack direction={'row'} spacing={2}>
              <Box flex={1}>
                <TextField required fullWidth name="weight" label="Weight" />
              </Box>
              <Box flex={1}>
                <DateTimePicker required sx={{ width: '100%' }} name="datetime" label="Date Time" />
              </Box>
              
              <Button
                type="submit"
                variant="contained"
              >
                Add Weight
              </Button>
            </Stack>
          </form>
          <div style={{ width: '100%', height: 600, marginTop: 20 }} ref={mLine}></div>
        </Box>
      </Box>
      <Box
        width="50%"
        padding="10px"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          boxShadow: "-5px 12px 20px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)",
        }}
      >
        <Typography
          // sx={{ display: 'inline-block' }}
          borderBottom="1px solid #e0e0e0"
          marginBottom="20px"
          // paddingLeft="2%"
          paddingTop="2%"
          paddingBottom="10px"
        >
          User Info
        </Typography>

        <form onSubmit={onSubmit}>
          {/* <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
          >
            <Stack direction="row" spacing="10px" alignItems="center">
              <Avatar sx={{ width: 100, height: 100 }} src={user.picture} />
              <Stack>
                <Typography>{user.username}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Button variant="contained" onClick={uploadAvatar}>Upload New Photo</Button>
              <Button variant="contained" color="error">Delete</Button>
            </Stack>
          </Stack> */}

          <Stack
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
          >
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack flex="1">
                  <FormLabel>First Name</FormLabel>
                  <TextField name="firstName" defaultValue={user.firstName} size="small"></TextField>
                </Stack>
                <Stack flex="1">
                  <FormLabel>Last Name</FormLabel>
                  <TextField name="lastName" defaultValue={user.lastName} size="small"></TextField>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack flex="1">
                  <FormLabel>User Name</FormLabel>
                  <TextField name="username" defaultValue={user.username} size="small"></TextField>
                </Stack>
                <Stack flex="1">
                  <FormLabel>Email</FormLabel>
                  <TextField name="email" defaultValue={user.email} size="small"></TextField>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
          >
            <Stack spacing={2}>
              <Stack direction={'row'} spacing={2}>
                <Stack flex="1">
                  <FormLabel>Goals</FormLabel>
                  <Select
                    name="goals"
                    size="small"
                    defaultValue={user.goals}
                  >
                    <MenuItem value={1}>Lose Fat</MenuItem>
                    <MenuItem value={2}>Gain Muscle</MenuItem>
                    <MenuItem value={3}>Maintain Weight</MenuItem>
                  </Select>
                </Stack>
                <Stack flex="1">
                  <FormLabel>Daily Activities</FormLabel>
                  <Select
                    label="Daily Activities"
                    name="activities"
                    size="small"
                    defaultValue={user.activities}
                  >
                    <MenuItem value={1}>Low</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </Stack>
              </Stack>

              <Stack direction={'row'} spacing={2}>
                <Stack flex="1">
                  <FormLabel>Height / cm</FormLabel>
                  <TextField
                    size="small"
                    name="height"
                    defaultValue={user.height}
                  />
                </Stack>
                <Stack flex="1">
                  <FormLabel>Weight / kg</FormLabel>
                  <TextField
                    size="small"
                    name="weight"
                    defaultValue={user.weight}
                  />
                </Stack>
              </Stack>

              <Stack direction={'row'} spacing={2}>
                <Stack flex="1">
                  <FormLabel>Age</FormLabel>
                  <TextField
                    size="small"
                    name="age"
                    defaultValue={user.age}
                  />
                </Stack>
                <Stack flex="1">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    size="small"
                    defaultValue={user.gender}
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                    <MenuItem value={3}>Other</MenuItem>
                  </Select>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
            direction="row"
            justifyContent="flex-end"
            spacing={4}
          >
            {/* <Button type="reset" variant="contained" color="secondary">Cancel</Button> */}
            <Button type="submit" variant="contained" color="warning">Save Changes</Button>
          </Stack>
        </form>



        <Stack
          paddingBottom={5}
          borderBottom="1px solid #e0e0e0"
          marginBottom="50px"
        >
          <Button variant="contained" color="error" onClick={onLogout}>Logout</Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Profile

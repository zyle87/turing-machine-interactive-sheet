import HashIcon from '@mui/icons-material/NumbersRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import Box from '@mui/material/Box'
import TextField from 'components/TextField'
import { FC } from 'react'

const Register: FC = () => {
  return (
    <Box component="section" mb={2}>
      <TextField iconRender={<PersonIcon />} withStackRadius />
      <TextField iconRender={<HashIcon />} withStackRadius />
    </Box>
  )
}

export default Register

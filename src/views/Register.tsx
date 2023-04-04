import HashIcon from '@mui/icons-material/NumbersRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import Box from '@mui/material/Box'
import TextField from 'components/TextField'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { registerActions } from 'store/slices/registerSlice'

const Register: FC = () => {
  const dispatch = useAppDispatch()
  const { name, hash } = useAppSelector(state => state.register)

  return (
    <Box component="section" width={320} margin="0 auto 16px">
      <TextField
        iconRender={<PersonIcon />}
        withStackRadius
        value={name}
        onChange={value =>
          dispatch(registerActions.updateName(value.toUpperCase()))
        }
        withReset
        onReset={() => dispatch(registerActions.updateName(''))}
      />
      <TextField
        iconRender={<HashIcon />}
        withStackRadius
        value={hash}
        maxChars={10}
        onChange={value =>
          dispatch(registerActions.updateHash(value.toUpperCase()))
        }
        withReset
        onReset={() => dispatch(registerActions.updateHash(''))}
      />
    </Box>
  )
}

export default Register

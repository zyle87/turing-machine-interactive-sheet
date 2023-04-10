import HashIcon from '@mui/icons-material/NumbersRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import Box from '@mui/material/Box'
import TextField from 'components/TextField'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { registrationActions } from 'store/slices/registrationSlice'

const Registration: FC = () => {
  const dispatch = useAppDispatch()
  const registration = useAppSelector(state => state.registration)

  return (
    <Box
      id="registration-section"
      component="section"
      width={320}
      margin="0 auto 16px"
    >
      <TextField
        prefixId="registration__name"
        iconRender={<PersonIcon />}
        withStackRadius
        value={registration.name}
        onChange={value =>
          dispatch(registrationActions.updateName(value.toUpperCase()))
        }
        withReset
        onReset={() => dispatch(registrationActions.updateName(''))}
      />
      <TextField
        prefixId="registration__hash"
        iconRender={<HashIcon />}
        withStackRadius
        value={registration.hash}
        maxChars={10}
        onChange={value =>
          dispatch(registrationActions.updateHash(value.toUpperCase()))
        }
        withReset
        onReset={() => dispatch(registrationActions.updateHash(''))}
      />
    </Box>
  )
}

export default Registration

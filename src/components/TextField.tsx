import Clear from '@mui/icons-material/CloseRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { alpha, useTheme } from '@mui/material/styles'
import { FC, ReactNode } from 'react'

type Props = {
  customFontSize?: string
  customRadius?: string
  iconRender?: ReactNode
  id?: string
  maxChars?: number
  onChange?: (value: string) => void
  onReset?: () => void
  type?: 'text' | 'number' | 'password'
  value?: Nullable<number | string>
  withReset?: boolean
  withStackRadius?: boolean
}

const TextField: FC<Props> = props => {
  const theme = useTheme()

  return (
    <Box
      position="relative"
      sx={
        props.withStackRadius
          ? {
              '&:not(:last-child)': {
                mb: 0.5,
              },
              '&:first-of-type': {
                input: {
                  borderRadius: theme.spacing(2, 2, 0, 0),
                },
              },
              '&:last-child': {
                input: {
                  borderRadius: theme.spacing(0, 0, 2, 2),
                },
              },
            }
          : null
      }
    >
      <input
        id={`${props.id}-text-field`}
        type={props.type}
        min={1}
        max={5}
        maxLength={props.maxChars}
        value={props.value === null ? '' : props.value}
        onChange={event => {
          props.onChange && props.onChange(event.target.value)
        }}
        style={{
          ...theme.typography.body1,
          background: alpha(theme.palette.primary.main, 0.1),
          border: 'none',
          borderRadius: props.customRadius,
          color: theme.palette.text.primary,
          height: 48,
          paddingLeft: props.iconRender ? theme.spacing(5) : undefined,
          textAlign: props.iconRender ? undefined : 'center',
          fontSize: props.customFontSize || theme.spacing(3),
          width: '100%',
        }}
      />
      {props.iconRender && (
        <Box
          alignItems="center"
          display="flex"
          height={48}
          left={0}
          ml={1}
          position="absolute"
          top={0}
          sx={{ color: theme.palette.primary.main }}
        >
          {props.iconRender}
        </Box>
      )}
      {props.value && props.withReset && (
        <Box
          alignItems="center"
          display="flex"
          height={48}
          right={4}
          ml={1}
          position="absolute"
          top={0}
        >
          <IconButton
            id={`${props.id}-text-field__delete-button`}
            color="primary"
            onClick={props.onReset}
          >
            <Clear />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

export default TextField

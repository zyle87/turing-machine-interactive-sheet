import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { FC, ReactNode } from 'react'

type Props = {
  iconRender?: ReactNode
  withStackRadius?: boolean
  type?: 'text' | 'number' | 'password'
  customRadius?: string
  value?: Nullable<number | string>
  onChange?: (value: string) => void
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
        className="text-field"
        type={props.type}
        min={1}
        max={5}
        value={props.value === null ? '' : props.value}
        onChange={event => {
          props.onChange && props.onChange(event.target.value)
        }}
        style={{
          ...theme.typography.body1,
          color: theme.palette.text.primary,
          background: '#e9f8f0',
          border: 'none',
          borderRadius: props.customRadius,
          height: 48,
          paddingLeft: props.iconRender ? theme.spacing(5) : undefined,
          textAlign: props.iconRender ? undefined : 'center',
          fontSize: theme.spacing(3),
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
        >
          {props.iconRender}
        </Box>
      )}
    </Box>
  )
}

export default TextField

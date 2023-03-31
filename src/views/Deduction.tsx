import Box from '@mui/material/Box'
import Clear from '@mui/icons-material/FormatClearRounded'
import Drag from '@mui/icons-material/DragIndicatorRounded'
import Check from '@mui/icons-material/CheckBoxRounded'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import SingleCharLabel from 'components/SingleCharLabel'
import TextField from 'components/TextField'
import { FC } from 'react'
import Button from '@mui/material/Button'

const Deduction: FC = () => {
  const theme = useTheme()

  return (
    <Paper sx={{ width: 320, p: 2, mb: 2 }}>
      <Button fullWidth color="secondary" size="large">
        <Clear />
      </Button>
      <Box py={2}>
        <Divider />
      </Box>
      {(['A', 'B', 'C', 'D', 'E', 'F'] as Verifier[]).map(verifier => (
        <Box key={verifier} position="relative">
          <Box
            position="absolute"
            left={theme.spacing(1)}
            right={theme.spacing(1)}
          >
            <SingleCharLabel>{verifier}</SingleCharLabel>
          </Box>
          <textarea
            style={{
              ...theme.typography.body1,
              color: theme.palette.text.primary,
              background: '#e9f8f0',
              borderRadius: theme.shape.borderRadius,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              border: 'none',
              display: 'block',
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: theme.spacing(12),
              padding: theme.spacing(5, 1, 1),
              fontSize: theme.spacing(2.5),
            }}
          />
          <Box
            position="absolute"
            width={24}
            height={28}
            right={0}
            bottom={69}
            sx={{ pointerEvents: 'none', background: '#e9f8f0' }}
          >
            <Drag color="primary" />
          </Box>
          <Box mt={0.5}>
            <TextField
              iconRender={<Check fontSize="small" color="primary" />}
              customRadius={theme.spacing(0, 0, 2, 2)}
              customFontSize={theme.spacing(2.5)}
            />
          </Box>
          {verifier !== 'F' && (
            <Box my={2}>
              <Divider />
            </Box>
          )}
        </Box>
      ))}
    </Paper>
  )
}

export default Deduction

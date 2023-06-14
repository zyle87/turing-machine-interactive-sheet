import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Comment from 'components/Comment'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { FC } from 'react'
import { useMount } from 'react-use'
import { commentsActions } from 'store/slices/commentsSlice'

const Comments: FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  useMount(() => {
    dispatch(commentsActions.encodeAllComments())
  })

  return (
    <Paper
      component="section"
      sx={{ width: isUpMd ? 656 : 320, margin: theme.spacing(0, 'auto', 2) }}
    >
      {/* <ClearButton
        prefixId="comments"
        iconRender={<Replay />}
        onClick={() => {
          dispatch(commentsActions.clearComments())
          setCommentKey(Date.now())
        }}
      /> */}
      <Box p={2} width={1}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            {(isUpMd
              ? (['A', 'C', 'E'] as Verifier[])
              : (['A', 'B', 'C', 'D', 'E', 'F'] as Verifier[])
            ).map(verifier => (
              <Comment
                key={verifier}
                verifier={verifier}
                noDivider={isUpMd ? verifier === 'E' : verifier === 'F'}
              />
            ))}
          </Grid>
          {isUpMd && (
            <Grid item md={6} xs={12}>
              {(['B', 'D', 'F'] as Verifier[]).map(verifier => (
                <Comment
                  key={verifier}
                  verifier={verifier}
                  noDivider={verifier === 'F'}
                />
              ))}
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}

export default Comments

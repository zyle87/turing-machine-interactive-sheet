import Undo from '@mui/icons-material/UndoRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { alpha, useTheme } from '@mui/material/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC, useMemo, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { useMeasure, useMount, useUpdateEffect } from 'react-use'
import { commentsActions } from 'store/slices/commentsSlice'

type Props = {
  verifier: Verifier
}

const DrawingComment: FC<Props> = ({ verifier }) => {
  const [isMounted, setIsMounted] = useState(false)
  const canvasRef = useRef<CanvasDraw>(null)

  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments)
  const theme = useTheme()
  const [ref, { width: canvasWidth, height: canvasHeight }] = useMeasure()

  const drawing = useMemo(
    () => comments.find(comment => comment.verifier === verifier)?.drawing,
    [comments, verifier]
  )

  useMount(() => {
    setIsMounted(true)
  })

  useUpdateEffect(() => {
    drawing && canvasRef.current?.loadSaveData(drawing)
  }, [isMounted])

  return (
    <Box>
      <Box
        ref={ref}
        sx={{
          border: `1.5px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          height: 304,
          backgroundSize: '20px 20px',
          backgroundImage: `linear-gradient(to right, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 1px, transparent 1px), linear-gradient(to bottom, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 1px, transparent 1px);`,
          marginBottom: theme.spacing(0.5),
          borderRadius: theme.spacing(2),
        }}
      >
        {canvasWidth && canvasHeight ? (
          <CanvasDraw
            onChange={draw =>
              dispatch(
                commentsActions.updateDrawing({
                  verifier,
                  drawing: draw.getSaveData(),
                })
              )
            }
            saveData={drawing}
            ref={canvasRef}
            brushColor={theme.palette.primary.main}
            brushRadius={1.5}
            immediateLoading
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            catenaryColor={theme.palette.primary.main}
            gridColor={'rgba(150,150,150,1'}
            hideGrid
            hideInterface
            lazyRadius={0.5}
            style={{
              background: 'none',
            }}
          />
        ) : null}
      </Box>
      <Box
        position="absolute"
        top={theme.spacing(0.5)}
        right={theme.spacing(1)}
      >
        <IconButton
          aria-label="undo"
          color="secondary"
          size="small"
          disabled={
            !comments.find(comment => comment.verifier === verifier)?.drawing ||
            comments
              .find(comment => comment.verifier === verifier)
              ?.drawing.split('[]').length === 2 ||
            false
          }
          onClick={() => {
            canvasRef.current?.undo()
          }}
        >
          <Undo />
        </IconButton>
      </Box>
    </Box>
  )
}

export default DrawingComment

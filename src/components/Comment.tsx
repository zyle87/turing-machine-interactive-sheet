import CardIcon from '@mui/icons-material/CreditCardRounded'
import DrawIcon from '@mui/icons-material/GestureRounded'
import TextIcon from '@mui/icons-material/KeyboardRounded'
import NumbersIcon from '@mui/icons-material/NumbersRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCriteriaCard } from 'hooks/useCriteriaCard'
import { FC, useState } from 'react'
import { useMount } from 'react-use'
import DrawingComment from './DrawingComment'
import InputComment from './InputComment'
import SingleCharLabel from './SingleCharLabel'
import TextField from './TextField'

type Props = {
  verifier: Verifier
  noDivider?: boolean
}

const Comment: FC<Props> = ({ verifier, noDivider }) => {
  const [showCard, setShowCard] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [showDrawing, setShowDrawing] = useState(false)

  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const { card, cardImage, poolLength, setCardFormId, toggleCriteria } =
    useCriteriaCard(verifier)

  useMount(() => {
    setShowInput(true)
  })

  const strippedBackground = `linear-gradient(45deg, #000000 16.67%, transparent 16.67%, transparent 50%, #000000 50%, #000000 66.67%, transparent 66.67%, transparent 100%);
  background-size: 16.97px 16.97px;;
  `

  return (
    <Box mb={!noDivider ? 4 : undefined}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={0.5}
      >
        <Box ml={1.75}>
          <SingleCharLabel>{verifier}</SingleCharLabel>
        </Box>
        <Box display="flex">
          <IconButton
            onClick={() => {
              setShowInput(true)
              setShowDrawing(false)
              setShowCard(false)
            }}
            color={showInput ? 'primary' : 'default'}
          >
            <TextIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowInput(false)
              setShowDrawing(false)
              setShowCard(true)
            }}
            color={showCard ? 'primary' : 'default'}
          >
            <CardIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowInput(false)
              setShowDrawing(true)
              setShowCard(false)
            }}
            color={showDrawing ? 'primary' : 'default'}
          >
            <DrawIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={showCard}>
        <Box position="relative">
          <Box mb={2}>
            <TextField
              iconRender={<NumbersIcon />}
              min={0}
              max={poolLength}
              type="number"
              onChange={value => {
                setCardFormId(Number(value))
              }}
              value={card?.id || null}
              customRadius={theme.spacing(2)}
            />
          </Box>
          {card && (
            <Box>
              <img
                src={cardImage}
                alt={cardImage}
                style={{
                  display: 'block',
                  width: '100%',
                }}
              />
              <Box position="absolute" top={0} display="flex" width={1}></Box>
              <Box
                position="absolute"
                bottom={10}
                display="flex"
                width={1}
                px={1.0}
                pb={1.2}
              >
                {Array(card?.criteriaSlots)
                  .fill(null)
                  .map((_, index) => (
                    <Button
                      key={index}
                      sx={{
                        flexGrow: 1,
                        backgroundImage: card?.irrelevantCriteria.includes(
                          index + 1
                        )
                          ? strippedBackground
                          : undefined,
                        height: isDownMd ? 50 : 54,
                        minWidth: 0,
                        borderRadius:
                          index === 0
                            ? theme.spacing(1, 0, 0, 1)
                            : index === card?.criteriaSlots - 1
                            ? theme.spacing(0, 1, 1, 0)
                            : 0,
                        '&:hover': {
                          background: card?.irrelevantCriteria.includes(
                            index + 1
                          )
                            ? strippedBackground
                            : undefined,
                        },
                      }}
                      onClick={() => {
                        toggleCriteria(index + 1)
                      }}
                    />
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
      <Collapse in={showInput}>
        <InputComment verifier={verifier} />
      </Collapse>
      <Collapse in={showDrawing} sx={{ position: 'relative' }}>
        <DrawingComment verifier={verifier} />
      </Collapse>
    </Box>
  )
}

export default Comment

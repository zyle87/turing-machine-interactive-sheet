import CardIcon from '@mui/icons-material/CreditCardRounded'
import DrawIcon from '@mui/icons-material/GestureRounded'
import TextIcon from '@mui/icons-material/KeyboardRounded'
import LooksOneIcon from '@mui/icons-material/LooksOneRounded'
import LooksTwoIcon from '@mui/icons-material/LooksTwoRounded'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import { useCriteriaCard } from 'hooks/useCriteriaCard'
import { FC, useState } from 'react'
import { useMount } from 'react-use'
import Card from './Card'
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
  const {
    card: firstCard,
    cardImage: firstCardImage,
    poolLength,
    setCardFormId: setFirstCardFormId,
    toggleCriteria: toggleFirstCardCriteria,
  } = useCriteriaCard(verifier, 0)
  const {
    card: secondCard,
    cardImage: secondCardImage,
    setCardFormId: setsecondCardFormId,
    toggleCriteria: togglesecondCardCriteria,
  } = useCriteriaCard(verifier, 1)

  useMount(() => {
    setShowInput(true)
  })

  return (
    <Box>
      <Box mb={noDivider ? undefined : 2}>
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
            <Box mb={0.5}>
              <TextField
                iconRender={<LooksOneIcon />}
                min={0}
                max={poolLength}
                type="number"
                onChange={value => {
                  setFirstCardFormId(Number(value))
                }}
                value={firstCard?.id || null}
                customRadius={theme.spacing(2, 2, 0, 0)}
              />
            </Box>
            <Box mb={1}>
              <TextField
                iconRender={<LooksTwoIcon />}
                min={0}
                max={poolLength}
                type="number"
                onChange={value => {
                  setsecondCardFormId(Number(value))
                }}
                value={secondCard?.id || null}
                customRadius={theme.spacing(0, 0, 2, 2)}
              />
            </Box>
            {firstCard && (
              <Box mb={1}>
                <Card
                  card={firstCard}
                  cardImage={firstCardImage}
                  onToggleCriteria={toggleFirstCardCriteria}
                />
              </Box>
            )}
            {secondCard && (
              <Card
                card={secondCard}
                cardImage={secondCardImage}
                onToggleCriteria={togglesecondCardCriteria}
              />
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
      {noDivider ? null : (
        <Box mb={2}>
          <Divider />
        </Box>
      )}
    </Box>
  )
}

export default Comment

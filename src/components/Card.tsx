import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CriteriaCard } from 'hooks/useCriteriaCard'
import { FC } from 'react'

type Props = {
  card: Undefinable<CriteriaCard>
  cardImage: string
  onToggleCriteria: (criteria: number) => void
}

const Card: FC<Props> = props => {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const strippedBackground = `linear-gradient(45deg, #000000 16.67%, transparent 16.67%, transparent 50%, #000000 50%, #000000 66.67%, transparent 66.67%, transparent 100%);
  background-size: 8px 8px;
  `

  const getRadius = (slot: number, rows: 1 | 2 | 3) => {
    if (rows === 1) {
      if (slot === 1) {
        return theme.spacing(1, 0, 0, 1)
      }
      if (slot === props.card?.criteriaSlots) {
        return theme.spacing(0, 1, 1, 0)
      }
    }

    if (rows === 2) {
      if (slot === 1) {
        return theme.spacing(1, 0, 0, 0)
      }
      if (slot === 2) {
        return theme.spacing(0, 0, 0, 1)
      }
      if (props.card?.criteriaSlots && slot === props.card?.criteriaSlots - 1) {
        return theme.spacing(0, 1, 0, 0)
      }
      if (slot === props.card?.criteriaSlots) {
        return theme.spacing(0, 0, 1, 0)
      }
    }

    if (rows === 3) {
      if (slot === 1) {
        return theme.spacing(1, 0, 0, 0)
      }
      if (slot === 3) {
        return theme.spacing(0, 0, 0, 1)
      }
      if (props.card?.criteriaSlots && slot === props.card?.criteriaSlots - 2) {
        return theme.spacing(0, 1, 0, 0)
      }
      if (slot === props.card?.criteriaSlots) {
        return theme.spacing(0, 0, 1, 0)
      }
    }

    return 0
  }

  const getStrippedStyles = (slot: number, rows: 1 | 2 | 3 = 1) => ({
    flexGrow: 1,
    backgroundImage: props.card?.irrelevantCriteria.includes(slot)
      ? strippedBackground
      : undefined,
    height:
      rows === 3
        ? isDownMd
          ? 21
          : 23
        : rows === 2
        ? isDownMd
          ? 30
          : 32
        : isDownMd
        ? 64
        : 68,
    width: '100%',
    borderRadius: getRadius(slot, rows),
    '&:hover': {
      background: props.card?.irrelevantCriteria.includes(slot)
        ? strippedBackground
        : undefined,
    },
  })

  const renderRowButtons = (large: boolean) => {
    if (!props.card?.criteriaSlots || props.card.criteriaSlots < 6) {
      return
    }

    const items = []

    for (let i = 0; i < props.card?.criteriaSlots; i += large ? 3 : 2) {
      items.push(
        <Box
          key={i}
          sx={{
            flexGrow: 1,
            lineHeight: isDownMd ? 1.1 : 1.2,
          }}
        >
          <Button
            key={i}
            sx={getStrippedStyles(i + 1, large ? 3 : 2)}
            onClick={() => {
              props.onToggleCriteria(i + 1)
            }}
          />
          <Button
            key={i + 1}
            sx={getStrippedStyles(i + 2, large ? 3 : 2)}
            onClick={() => {
              props.onToggleCriteria(i + 2)
            }}
          />
          {large && (
            <Button
              key={i + 1}
              sx={getStrippedStyles(i + 3, 3)}
              onClick={() => {
                props.onToggleCriteria(i + 3)
              }}
            />
          )}
        </Box>
      )
    }

    return items
  }

  return (
    <Box position="relative">
      <img
        src={props.cardImage}
        alt={props.cardImage}
        style={{
          display: 'block',
          width: '100%',
        }}
      />
      <Box position="absolute" top={0} display="flex" width={1}></Box>
      <Box
        position="absolute"
        bottom={5}
        display="flex"
        width={1}
        px={1.0}
        pb={1.2}
      >
        {props.card?.criteriaSlots && props.card?.criteriaSlots < 6
          ? Array(props.card?.criteriaSlots)
              .fill(null)
              .map((_, index) => (
                <Button
                  key={index}
                  sx={getStrippedStyles(index + 1)}
                  onClick={() => {
                    props.onToggleCriteria(index + 1)
                  }}
                />
              ))
          : renderRowButtons(
              !!(props.card?.criteriaSlots && props.card?.criteriaSlots === 9)
            )}
      </Box>
    </Box>
  )
}

export default Card

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
  background-size: 16.97px 16.97px;;
  `

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
        bottom={10}
        display="flex"
        width={1}
        px={1.0}
        pb={1.2}
      >
        {Array(props.card?.criteriaSlots)
          .fill(null)
          .map((_, index) => (
            <Button
              key={index}
              sx={{
                flexGrow: 1,
                backgroundImage: props.card?.irrelevantCriteria.includes(
                  index + 1
                )
                  ? strippedBackground
                  : undefined,
                height: isDownMd ? 50 : 54,
                minWidth: 0,
                borderRadius:
                  index === 0
                    ? theme.spacing(1, 0, 0, 1)
                    : props.card && index === props.card?.criteriaSlots - 1
                    ? theme.spacing(0, 1, 1, 0)
                    : 0,
                '&:hover': {
                  background: props.card?.irrelevantCriteria.includes(index + 1)
                    ? strippedBackground
                    : undefined,
                },
              }}
              onClick={() => {
                props.onToggleCriteria(index + 1)
              }}
            />
          ))}
      </Box>
    </Box>
  )
}

export default Card

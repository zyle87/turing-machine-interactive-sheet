import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useCriteriaCard } from 'hooks/useCriteriaCard'
import { FC } from 'react'
import Card from './Card'
import SingleCharLabel from './SingleCharLabel'

type Props = {
  verifier: Verifier
  noDivider?: boolean
}

const Comment: FC<Props> = ({ verifier, noDivider }) => {
  const {
    card: firstCard,
    cardImage: firstCardImage,
    toggleCriteria: toggleFirstCardCriteria,
  } = useCriteriaCard(verifier, 0)
  const {
    card: secondCard,
    cardImage: secondCardImage,
    toggleCriteria: togglesecondCardCriteria,
  } = useCriteriaCard(verifier, 1)

  return (
    <Box>
      <Box mb={noDivider ? undefined : 2}>
        <Box position="relative">
          {firstCard && (
            <>
              <Box
                position="absolute"
                zIndex={1}
                px={2}
                sx={theme => ({
                  background: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  borderTopLeftRadius: theme.spacing(1),
                  borderBottomRightRadius: theme.spacing(3),
                })}
              >
                <SingleCharLabel white>{verifier}</SingleCharLabel>
              </Box>
              <Box mb={1}>
                <Card
                  card={firstCard}
                  cardImage={firstCardImage}
                  onToggleCriteria={toggleFirstCardCriteria}
                />
              </Box>
            </>
          )}
          {secondCard && (
            <>
              <Box
                position="absolute"
                zIndex={1}
                px={2}
                sx={theme => ({
                  background: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  borderTopLeftRadius: theme.spacing(1),
                  borderBottomRightRadius: theme.spacing(3),
                })}
              >
                <SingleCharLabel white>{verifier}</SingleCharLabel>
              </Box>
              <Card
                card={secondCard}
                cardImage={secondCardImage}
                onToggleCriteria={togglesecondCardCriteria}
              />
            </>
          )}
        </Box>
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

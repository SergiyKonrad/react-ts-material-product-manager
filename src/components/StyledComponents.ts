import { styled } from '@mui/material/styles'
import { Box, Card, Button } from '@mui/material'

// Styled components
export const Container = styled(Box)({
  padding: '32px',
})

export const StyledCard = styled(Card)({
  marginBottom: '16px',
  textAlign: 'center',
  position: 'relative',
})

export const StyledImage = styled('img')({
  height: '300px',
  width: '200px',
  objectFit: 'contain',
  margin: '10px auto 0',
})

export const DeleteCross = styled(Button)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: '#fff',
  backgroundColor: '#f44336',
  borderRadius: '50%',
  minWidth: '24px',
  height: '24px',
  lineHeight: '24px',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: 0,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
})

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '8px !important',
  marginBottom: '32px !important',
})

// export const LoadNextButton = styled(Button)({
//   marginTop: '16px',
// })

export const ItalicSmallText = styled('p')({
  fontStyle: 'italic',
  fontSize: '0.875rem', // 14px
  color: '#666', // Optional: A lighter color
})

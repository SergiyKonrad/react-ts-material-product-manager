import styled from '@mui/material/styles/styled'
import Button, { ButtonProps } from '@mui/material/Button'

interface DynamicButtonProps extends ButtonProps {
  isEmpty: boolean
}

const DynamicButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isEmpty', // Prevent `isEmpty` from being passed to DOM
})<DynamicButtonProps>(({ theme, isEmpty }) => ({
  backgroundColor: isEmpty ? 'green !important' : theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: isEmpty
      ? 'darkgreen !important'
      : theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: 'grey',
    color: 'white',
  },
}))

export default DynamicButton

//  In the styled-components or Material-UI styled utility, shouldForwardProp determines which props should not be forwarded to the DOM element.
//  Props like isEmpty are used for styling and are not valid DOM attributes. shouldForwardProp ensures that isEmpty doesn't get passed down to the DOM, avoiding errors and keeping your components clean.

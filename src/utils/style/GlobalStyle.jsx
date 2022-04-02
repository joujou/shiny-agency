import { createGlobalStyle } from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../Context'

const StyledGlobalStyle = createGlobalStyle`
* {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
 
    body {
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? 'black' : 'white'};
        margin: 0;  
    }
`

const GlobalStyle = () => {
  const { theme } = useContext(ThemeContext)
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle

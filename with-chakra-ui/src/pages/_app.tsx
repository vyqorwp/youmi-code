import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import theme from '../theme'
import { Provider, createClient } from 'urql'

const client = createClient({
  url: 'http://localhost:4444/graphql', fetchOptions: {
  credentials:"include",
} });
 

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
    <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
      </Provider>
  )
}

export default MyApp

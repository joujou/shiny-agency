import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Header from './components/Header'
import Error from './components/Error'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'antd/dist/antd.css'
import { SurveyProvider, ThemeProvider } from './utils/context'
import Footer from './components/Footer'
import GlobalStyle from './utils/style/GlobalStyle'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <SurveyProvider>
            <GlobalStyle />
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/survey/:questionNumber">
                <Survey />
              </Route>
              <Route path="/results">
                <Results />
              </Route>
              <Route path="/freelances">
                <Freelances />
              </Route>
              <Route>
                <Error />
              </Route>
            </Switch>
          </SurveyProvider>
          <Footer />
        </ThemeProvider>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

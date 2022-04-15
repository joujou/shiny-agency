import { useContext } from 'react'
import { SurveyContext, ThemeContext } from '../../utils/context'
import { useFetch } from '../../utils/hooks'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader, StyledLink } from '../../utils/style/Atoms'
import config from '../../utils/config'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
`

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === 'light' ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export function formatQueryParams(answers) {
  const answerNumbers = Object.keys(answers)

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0
    const separator = isFirstParam ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

export function formatJobList(title, listLength, index) {
  if (index === listLength - 1) {
    return title
  }
  return `${title},`
}

function Results() {
  const { answers } = useContext(SurveyContext)
  const { theme } = useContext(ThemeContext)
  const queryParams = formatQueryParams(answers)
  /* custom hook useFetch */
  const { isLoading, data, error } = useFetch(
    `${config.apiBaseUrl}/results?${queryParams}`
  )
  console.log(answers)

  if (error) {
    return <span>Il y a un problème</span>
  }

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader></Loader>
      </LoaderWrapper>
    )
  }

  const resultsData = data?.resultsData
  console.log(resultsData)

  return (
    <ResultsContainer>
      <ResultsTitle>
        Les compétences dont vous avez besoin :
        {resultsData &&
          resultsData.map((result, index) => (
            <JobTitle key={`result-title-${index}-${result.title}`}>
              {formatJobList(result.title, resultsData.length, index)}
            </JobTitle>
          ))}
      </ResultsTitle>
      <StyledLink $isFullLink to="/freelances">
        Découvrez nos profils
      </StyledLink>
      <DescriptionWrapper>
        {resultsData &&
          resultsData.map((result, index) => (
            <JobDescription key={`result-detail-${index}-${result.title}`}>
              <JobTitle>{result.title}</JobTitle>
              <p>{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
    </ResultsContainer>
  )
}

export default Results

import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { message, Alert, notification } from 'antd'
import { SurveyContext } from '../../utils/context'
import { useQuery } from 'react-query'
import axios from 'axios'
import config from '../../utils/config'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: red;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  /* const [surveyData, setSurveyData] = useState({}) */
  /* const [isDataLoading, setDataLoading] = useState(false) */
  /* const [error, setError] = useState(false)*/
  const { answers, saveAnswers } = useContext(SurveyContext)

  /* Hook perso */
  /*const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
    const { surveyData } = data*/

  /*  useEffect(() => {
      async function fetchSurvey() {
        setDataLoading(true)
        try {
          const response = await fetch(`http://localhost:8000/survey`)
          const { surveyData } = await response.json()
          setSurveyData(surveyData)
        } catch (err) {
          console.log('===== error =====', err)
          setError(true)
        } finally {
          setDataLoading(false)
        }
      }
      fetchSurvey()
    }, [])

    if (error) {
      return <span>Oups il y a eu un problème</span>
    }
   */

  const {
    data: surveyData,
    status,
    isFetching,
    isRefetching,
  } = useQuery(
    'survey',
    async () => {
      const res = await axios(`${config.apiBaseUrl}/survey`)
      return res['data']['surveyData']
    },
    {
      onError: (err) => {
        message.error('Erreur de chargement')
        openNotification('topRight', 'error', 'Erreur', 'Pb de chargement')
      },
    }
  )

  const openNotification = (placement, type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement,
      duration: 4,
      style: {
        backgroundColor: '#fff',
      },
      onClick: () => {},
    })
  }

  const saveReply = (answer) => {
    saveAnswers({ [questionNumber]: answer })
  }

  if (surveyData) {
    return (
      <SurveyContainer>
        <QuestionTitle>Question {questionNumber}</QuestionTitle>
        {!surveyData[nextQuestionNumber] && (
          <Alert type="error" message="Dernière question" />
        )}
        <QuestionContent>
          {surveyData && surveyData[questionNumber]}
        </QuestionContent>

        <ReplyWrapper>
          <ReplyBox
            isSelected={answers[questionNumber]}
            onClick={() => saveReply(true)}
          >
            Oui
          </ReplyBox>
          <ReplyBox
            isSelected={answers[questionNumber] === false}
            onClick={() => saveReply(false)}
          >
            Non
          </ReplyBox>
        </ReplyWrapper>

        <LinkWrapper>
          {prevQuestionNumber > 0 && (
            <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
          )}

          {surveyData && surveyData[questionNumberInt + 1] ? (
            <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
          ) : (
            <Link to="/results">Résultats</Link>
          )}
        </LinkWrapper>
      </SurveyContainer>
    )
  }

  if (status === 'error') {
    //return openNotification('topRight', 'error', 'Erreur', 'Erreur chargement')
    return <Alert message="Erreur de chargement des questions" type="error" />
  }

  if (status === 'loading') {
    return (
      <SurveyContainer>
        <Loader />
      </SurveyContainer>
    )
  }
}

export default Survey

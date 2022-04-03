import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { Button, notification, Alert } from 'antd'
import { SurveyContext } from '../../utils/context'
import { useFetch } from '../../utils/hooks'
import { useQuery } from 'react-query'
import axios from 'axios'

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
    color: black;
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

  useEffect(() => {
    if (surveyData && !surveyData[questionNumberInt + 1]) {
      {
        openNotification('topRight', 'info')
      }
    }
  })
  const { data: surveyData, status } = useQuery('survey', async () => {
    const res = await axios(`http://localhost:8000/survey`)
    return res['data']['surveyData']
  })

  const openNotification = (placement, type) => {
    notification[type]({
      message: 'Dernière question',
      description: '',
      placement,
      duration: 4,
      style: {
        backgroundColor: '#fff',
      },
      onClick: () => {
        console.log('notif clicked')
      },
    })
  }

  const saveReply = (answer) => {
    saveAnswers({ [questionNumber]: answer })
  }

  if (status === 'error') {
    return <Alert message="Erreur de chargement des questions" type="error" />
  }

  if (status === 'loading') {
    return <Loader />
  }

  if (status === 'success') {
    return (
      <SurveyContainer>
        <QuestionTitle>Question {questionNumber}</QuestionTitle>
        <>
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
        </>

        <LinkWrapper>
          {prevQuestionNumber > 0 && (
            <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
          )}

          {surveyData && surveyData[questionNumberInt + 1] ? (
            <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
          ) : (
            <Link
              onClick={() => openNotification('topRight', 'info')}
              to="/results"
            >
              Résultats
            </Link>
          )}
        </LinkWrapper>
      </SurveyContainer>
    )
  }
}

export default Survey

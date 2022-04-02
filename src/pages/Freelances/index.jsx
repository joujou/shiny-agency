import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Loader } from '../../utils/style/Atoms'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Freelances() {
  const {
    isLoading,
    isSuccess,
    isFetching,
    isError,
    data: freelances,
    error,
    refetch,
  } = useQuery(
    'freelances',
    async () => {
      const { data } = await axios.get('http://localhost:8000/freelances')
      return data
    },
    { cacheTime: 0 }
  )

  /*const [freelances, setFreelances] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getFreelances = async function () {
      setIsLoading(true)
      try {
        const { data } = await axios.get('http://localhost:8000/fsreelances')
        setFreelances(data[['freelancersList']])
      } catch (err) {
        console.log('erreur : ' + err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getFreelances()
  }, [])*/

  if (isError) {
    return <span>Erreur : {error}</span>
  }

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  }

  if (isFetching) {
    return <span>Fetching...</span>
  }

  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubtitle>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      <CardsContainer>
        {freelances['freelancersList'].map(function (profile, index) {
          return (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.name}
              title={profile.job}
              picture={profile.picture}
            />
          )
        })}
      </CardsContainer>
    </div>
  )
}

export default Freelances

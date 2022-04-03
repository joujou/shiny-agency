import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return

    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      }catch(err) {
        console.log(err)
        setError(true)
      }
      finally {
        setIsLoading(false)
      }

    }

    setIsLoading(true)
    fetchData()
  }, [url])

  return { isLoading, data, error }
}

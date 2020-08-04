import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoopingRhombusesSpinner } from 'react-epic-spinners'

export const loader = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url) => url !== router.pathname && setLoading(true)
    // handleComplete event was not firing
    const handleComplete = (url) => url === router.asPath && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    loading && (
      <div className="asdh2jj">
        <LoopingRhombusesSpinner color="#ae00ff" size={12} />
      </div>
    )
  )
}

// export const loader = () => (
//   <div className="asdh2jj">
//     <LoopingRhombusesSpinner color="#ae00ff" size={12} />
//   </div>
// )

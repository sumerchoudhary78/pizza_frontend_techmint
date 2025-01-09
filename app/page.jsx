'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateStageTime } from '@/store/features/PizzaSlice'
import PizzaShop from '@/components/PizzaShop'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateStageTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [dispatch])

  return (
    <main className="p-6">
      <PizzaShop />
    </main>
  )
}

export default Home
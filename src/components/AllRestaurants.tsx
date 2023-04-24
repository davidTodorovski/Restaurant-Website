import { useRestaurants } from '../context/RestaurantContext'

// components
import RestaurantCard from './RestaurantCard'

// styles
import './all-restaurants.scss'



export default function AllRestaurants() {
  const { restaurants } = useRestaurants()
  return (
    <section className='all-restaurants'>
      <h2 className='heading'>All Restaurants</h2>
      <div className='restaurants-container'>
        {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r}/>)}
      </div>
    </section>
  )
}
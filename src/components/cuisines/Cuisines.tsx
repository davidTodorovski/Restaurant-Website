import { Link } from "react-router-dom";
import { useRestaurants } from "../../context/RestaurantContext";



// styles
import './cuisines.scss'

export default function Cuisines() {
    const { restaurants } = useRestaurants()

    const restaurantTypes = [] as string[]
    restaurants && restaurants.forEach(r => {
        if (!restaurantTypes.includes(r.restauranttype)) {
            restaurantTypes.push(r.restauranttype)
        }
    })


  return (
    <div className='cuisines'>
        <h2 className='heading'>Cuisines</h2>
        <div className="cuisines-buttons">
          {restaurantTypes.map(r => <Link to={`cuisines/${r}`} key={r}>{r}</Link>)}
        </div>
    </div>
  )
}
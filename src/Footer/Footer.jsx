import useClock from '../Clock/clock.jsx';
import './Footer.css'

const Footer = () => {

     const {time, today} = useClock();


     return (

       <div className="clock">

            <h3>{time}</h3><p>-</p><h3>{today}</h3>    

        </div>

     )
}

export default Footer;
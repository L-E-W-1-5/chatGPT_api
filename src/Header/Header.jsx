import useClock from '../Clock/clock.jsx';
import './Header.css';


const Header = () => {

    const {time, today} = useClock();


    return (

        <div className="nav-bar">

            <h1 className="main-title">ChatGPT API</h1>

            <div className="clock">

                <h3>{time}</h3><p>-</p><h3>{today}</h3>    

            </div>

        </div>
    );
}

export default Header;
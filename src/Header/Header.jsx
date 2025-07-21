import './Header.css';
import right_logo from '../assets/right-arrow.png';
import left_logo from '../assets/left-arrow.png';


const Header = ({requestType, setRequestType}) => {


    return (

        <div className="nav-bar">

            <h1 className="main-title">LuluGPT</h1>

            {/* <div className="form-change-button" onClick={() => setRequestType(current => !current)}>Change</div> */}

            <img className="form-change-icon"  onClick={() => setRequestType(current => !current)} src={requestType === true ? right_logo : left_logo} alt="image failed to load"></img>
            
        </div>
    );
}

export default Header;
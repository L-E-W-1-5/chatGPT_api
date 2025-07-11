
import './Header.css';


const Header = ({setRequestType}) => {

   


    return (

        <div className="nav-bar">

            <h1 className="main-title">ChatGPT API</h1>

            <div className="form-change-button" onClick={() => setRequestType(current => !current)}>Change</div>

        </div>
    );
}

export default Header;
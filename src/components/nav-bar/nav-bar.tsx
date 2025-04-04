import './nav-bar.css'

function NavBar(){
    return (
        <div className="nav">
            <h3 className="logo">Percie</h3>
            <div className="lists">
                <a href="#about" className="list">About</a>
            </div>
        </div>
    )
}

export default NavBar;
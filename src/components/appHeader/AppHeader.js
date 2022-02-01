import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#temp">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#temp">Characters</a></li>
                    /
                    <li><a href="#temp">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
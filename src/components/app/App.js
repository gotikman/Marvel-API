
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';

// import { MainPage, ComicsPage, SingleComicPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

//? динамічні імпорти підкл. після статичних 
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
// const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));



const App = () => {

    return (
        <HashRouter basename="/www-react-api">
            <div className="app">
                <AppHeader />
                <main>

                    <Suspense fallback={<Spinner />}>

                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic' />} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character' />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>

                    </Suspense>

                </main>
            </div>
        </HashRouter >
    )
}

export default App;
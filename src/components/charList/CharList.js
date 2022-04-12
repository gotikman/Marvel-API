import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMassage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        // break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
        // break;
        case 'confirmed':
            return <Component />;
        // break;
        case 'error':
            return <ErrorMessage />;
        // break;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);                      // 1539 тестування останніх
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, process, setProcess } = useMarvelService();  //!

    useEffect(() => {
        onRequest(offset, true);                          // викликаєм без значення, в сервісі підставиться дефолтний
        // eslint-disable-next-line
    }, [])                                                // [] - запускаєм 1 раз

    const onRequest = (offset, initial) => {              // загрузка і дозагрузка персонажів
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }


    const onCharListLoaded = (newcharList) => {

        let ended = false;
        if (newcharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newcharList]);  //? розгортаєм старі і дозагружені персонажі

        setNewItemLoading(newItemLoading => false);              // включаєм кнопку після дозагрузки 
        setOffset(offset => offset + 9);                         //? зміщуєм діапазон дозагрузки персонажів   
        setCharEnded(charEnded => ended)
    }


    //! Створюю масив для Ref і функцію для добавлення call-back ref
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const checkCover = item.thumbnail.search('not_available') > 0 ? { objectFit: 'unset' } : null;

            return (
                <CSSTransition key={item.key} timeout={500} classNames="char__item">
                    <li
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        key={item.key}
                        onClick={() => {
                            props.onCharSelected(item.key)
                            focusOnItem(i)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.key);
                                focusOnItem(i);
                            }
                        }}
                    >

                        <img src={item.thumbnail} alt="abyss" style={checkCover} />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    // __________________________________________________________________

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
        // eslint-disable-next-line 
    }, [process])


    return (
        <div className="char__list">

            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

//? валідація пропса onCharSelected на тип - функція та наявність в цілому
CharList.protoTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;


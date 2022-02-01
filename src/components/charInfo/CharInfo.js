import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMassage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelServise = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {        //! має 2 аргумента проп і стейт для порівняння
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelServise
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)

    }

    onCharLoaded = (char) => {          //! відповідає за кінцевий результат
        this.setState({
            char: char,
            loading: false
        })
    }

    onCharLoading = () => {           //! відповідає за проміжний результат
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // _________________________________________________________

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMassage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info" >
                {skeleton}
                {errorMassage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const checkCover = thumbnail.search('not_available') > 0 ? { objectFit: 'contain' } : null;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}
                    style={checkCover} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {comics.length > 0 ? null : "There is no comics with this characters"}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
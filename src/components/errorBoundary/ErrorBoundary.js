import { Component } from "react";
import ErrorMessage from "../errorMassage/ErrorMessage";


class ErrorBoundary extends Component {          //! клас запобіжник
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) {  //! використовуєм якщо потрібно тільки обновити state
    //     return { error: true }
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />       //! рендеримо повідомлення про помилку
        }

        return this.props.children;          //! рендеримо компонент якщо все гуд
    }
}

export default ErrorBoundary;
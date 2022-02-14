import ErrorMessage from "../errorMassage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />

            <p
                style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}
            > Page doesn't exist </p>

            {/* тут розміщуєм повернення на головну або попередню сторінку */}
            <Link
                style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px' }}
                to="/">Back to main page</Link>

        </div>
    )
}

export default Page404;
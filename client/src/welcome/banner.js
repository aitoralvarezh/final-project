import './banner.css'
import Carousel from './Carousel';
import Register from '../routes/users/register-login/register'
import { useUser } from '../usercontext';
import Account from '../routes/users/register-login/login-menu';
import LastArticles from '../routes/articles/lastarticle'

function Banner({ children }) {
    const me = useUser();

    if (!me) {
        return (
            <div className="banner">
                <div>
                    <Register />
                    <Account />
                </div>
            </div>
        )
    }

    return (
        <div className="banner banner-articles">
            <LastArticles />
        </div>
    )
}


export default Banner;
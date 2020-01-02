
// -- Landing Routes
import PAMap from './pages/PAMap'
import Logout from './pages/Logout'
import NoMatch from './pages/404.js'
import Landing from './pages/Landing'
import Public from './pages/Public/Home'
import Login from './pages/Landing/Login'
import Signup from './pages/Landing/SignUp'

const routes = [

        //Landing,
        ...Public,
        Login,
        Signup,
        PAMap,
        Logout,
        NoMatch,


];
export default {
    routes: routes
}


//AssetsTable,
import config from '~/config/';

//Layout

import Home from '~/pages/Home';
import RegisterPage from '~/pages/Register';
import RestaurantPage from '~/pages/Restaurant';
import RestaurantsPage from '~/pages/Restaurants';
import CheckOutPage from '~/pages/CheckOut';
import ContactPage from '~/pages/Contact';
import BranchPage from '~/pages/Branch';
import ManageCartPage from '~/pages/ManageCart';
import FollowOrderPage from '~/pages/FollowOrder';
import ManageDriverPage from '~/pages/ManageDriver';
import EarningTrackingPage from '~/pages/EarningTracking';
import ManageCoopPage from '~/pages/ManageCoop';
import LoginPage from '~/pages/Login';
import ListCoopPage from '~/pages/ListCoop';
import ManageDataPage from '~/pages/ManageData';
import StatisticsPage from '~/pages/Statistics';

const publicRoutes = [
    { path: config.routes.home, components: Home },
    { path: config.routes.restaurants, components: RestaurantsPage },
    { path: config.routes.restaurant, components: RestaurantPage },
    { path: config.routes.register, components: RegisterPage },
    { path: config.routes.checkout, components: CheckOutPage },
    { path: config.routes.contact, components: ContactPage },
    { path: config.routes.branch, components: BranchPage },
    { path: config.routes.manageCart, components: ManageCartPage },
    { path: config.routes.manageDriver, components: ManageDriverPage },
    { path: config.routes.followOrder, components: FollowOrderPage },
    { path: config.routes.earningTracking, components: EarningTrackingPage },
    { path: config.routes.manageCoop, components: ManageCoopPage },
    { path: config.routes.manageData, components: ManageDataPage },
    { path: config.routes.listCoop, components: ListCoopPage },
    { path: config.routes.login, components: LoginPage },
    { path: config.routes.statistics, components: StatisticsPage },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };

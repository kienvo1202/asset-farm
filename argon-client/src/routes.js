/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Reports from "views/Reports.jsx";
import Records from "views/Records.jsx";
import Asset from "views/Asset.jsx";
import IO from "views/IO.jsx";
import Budget from "views/Budget.jsx";
import Marketplace from "views/Marketplace.jsx";
import Wealth from "views/Wealth.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/Login.jsx";
import PartnerLogin from "views/PartnerLogin.jsx";
import Tables from "views/examples/Tables.jsx";
import Icons from "views/examples/Icons.jsx";

var routes = [
  {
    path: "/index",
    name: "Record Transactions",
    icon: "ni ni-tv-2 text-primary",
    component: Records,
    layout: "/admin"
  },
  {
    path: "/io",
    name: "Income & Expense",
    // icon: "ni ni-chart-bar-32 text-purple",
    icon: "ni ni-credit-card text-orange",
    component: IO,
    layout: "/admin"
  },
  {
    path: "/budget",
    name: "Budget",
    icon: "fas fa-wallet text-blue",
    component: Budget,
    layout: "/admin"
  },
  {
    path: "/asset",
    name: "Assets",
    // icon: "ni ni-planet text-blue",
    icon: "ni ni-money-coins text-yellow",
    component: Asset,
    layout: "/admin"
  },
  {
    path: "/wealth",
    name: "Wealth Planning",
    icon: "ni ni-chart-bar-32 text-green",
    component: Wealth,
    layout: "/admin"
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    icon: "ni ni-shop text-purple",
    component: Marketplace,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/partner",
    name: "Partner",
    icon: "ni ni-key-25 text-info",
    component: PartnerLogin,
    layout: "/auth"
  },
  {
    path: "/product",
    name: "Product",
    icon: "ni ni-key-25 text-info",
    component: Icons,
    layout: "/partner"
  },
  {
    path: "/lead",
    name: "Leads",
    icon: "ni ni-key-25 text-info",
    component: Icons,
    layout: "/partner"
  }
];
export default routes;

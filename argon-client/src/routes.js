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
import Wealth from "views/Wealth.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/Login.jsx";
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
    icon: "ni ni-chart-bar-32 text-purple",
    component: IO,
    layout: "/admin"
  },
  {
    path: "/asset",
    name: "Asset",
    icon: "ni ni-planet text-blue",
    component: Asset,
    layout: "/admin"
  },
  {
    path: "/budget",
    name: "Budget & Planning",
    icon: "ni ni-planet text-blue",
    component: Budget,
    layout: "/admin"
  },
  {
    path: "/wealth",
    name: "Wealth Planning",
    icon: "ni ni-single-02 text-yellow",
    component: Wealth,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  }
];
export default routes;

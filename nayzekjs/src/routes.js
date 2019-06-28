// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import MyCollections from "views/MyCollections/MyCollections.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Collection from "views/Collection/Collection.jsx";
import CreateNewCollection from "views/MyCollections/CreateNewCollection";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/"
  },
  {
    path: "/my_collections",
    name: "My Collections",
    rtlName: "",
    icon: Person,
    component: MyCollections,
    layout: "/"
  },
  {
    path: "/collection/:id",
    name: "Collection",
    rtlName: "",
    icon: Person,
    component: Collection,
    layout: "/"
  },
  {
    path: "/create_new_collection",
    name: "Create New Collection",
    rtlName: "",
    icon: Person,
    component: CreateNewCollection,
    layout: "/"
  },
  {
    path: "/my_templates",
    name: "My Templates",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/"
  },
  {
    path: "/my_nfts",
    name: "My NFTs",
    rtlName: "",
    icon: LibraryBooks,
    component: Typography,
    layout: "/"
  }
];

export default dashboardRoutes;

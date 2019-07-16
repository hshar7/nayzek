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
import CreateNewTemplate from "views/Template/CreateNewTemplate";
import Template from "views/Template/Template";
import MyTemplates from "views/Template/MyTemplates";
import MyNfts from "views/Nft/MyNfts";

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
    path: "/collection/:id/details",
    name: "Collection",
    rtlName: "",
    icon: Person,
    component: Collection,
    layout: "/",
    visible: false
  },
  {
    path: "/create_new_collection",
    name: "Create New Collection",
    rtlName: "",
    icon: Person,
    component: CreateNewCollection,
    layout: "/",
    visible: false
  },
  {
    path: "/my_templates",
    name: "My Templates",
    rtlName: "",
    icon: "content_paste",
    component: MyTemplates,
    layout: "/"
  },
  {
    path: "/collection/:id/create_new_template",
    name: "Create New Template",
    rtlName: "",
    icon: Person,
    component: CreateNewTemplate,
    layout: "/",
    visible: false
  },
  {
    path: "/template/:id/details",
    name: "Template",
    rtlName: "",
    icon: Person,
    component: Template,
    layout: "/",
    visible: false
  },
  {
    path: "/my_nfts",
    name: "My NFTs",
    rtlName: "",
    icon: LibraryBooks,
    component: MyNfts,
    layout: "/"
  },
  {
    path: "/create_new_nft",
    name: "Create New NFT",
    rtlName: "",
    icon: Person,
    component: CreateNewCollection,
    layout: "/",
    visible: false
  },
];

export default dashboardRoutes;

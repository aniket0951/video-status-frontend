import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./components/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AdminHome from "./components/AdminHome";
import VideoCategoryHome from "./components/VideoCategoryHome";
import AddVideoCategory from "./components/AddVideoCategory";
import UserProfile from "./components/UserProfile";
import AdminUsers from "./userscomponent/AdminUsers";
import AddUsers from "./userscomponent/AddUsers";
import UpdateUsers from "./userscomponent/UpdateUsers";
import WallPaperHome from "./components/InActiveWallPaper";
import ActiveWallPaper from "./components/ActiveWallPaper";
import InActiveVideos from "./components/InActiveVideos";
import { Menu } from "antd";
import {
  DashOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

function App() {
  return (
    <>
      {window.location.pathname === "/" ? (
        <div>
          <Landing/>
          <Content/>
        </div>
      ) : (
        <div className="AppMain">
          {/* <Header /> */}
          <div className="App">
            <AppSideBar />
            <Content />
          </div>
          {/* <Footer /> */}
        </div>
      )}
      
    </>
  );
}

function Header() {
  return (
    <div className="header" style={{backgroundColor:'ActiveBorder', position:'fixed', top:0, width:'100%', zIndex:1000}}>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <h1>Footer</h1>
    </div>
  );
}

function AppSideBar() {
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        defaultSelectedKeys={[window.location.pathname]}
        items={[
          { label: "Home", style:{fontWeight:'bold'}, key: "/admin-home", icon: <HomeOutlined />},
          { label:"InActive Videos", style:{fontWeight:'bold'},  key:"/inactive-videos"},
          { label: "Users", style:{fontWeight:'bold'},  key: "/users", icon: <DashOutlined />,
          children: [
            {label: "Show Users", style:{fontWeight:'bold'},  key: "/show-users"},
            {label: "Add User", style:{fontWeight:'bold'},  key: "/add-user"},
          ]
          },
          {
            label: "Video Category",
            key: "/userlist",
            style:{fontWeight:'bold'}, 
            icon: <UnorderedListOutlined />,
            children: [
              { label: "Show Category", style:{fontWeight:'bold'},  key: "/show-category" },
              { label: "Add Category", style:{fontWeight:'bold'},  key: "/add-category" },
            ],
          },
          { label: "Profile", style:{fontWeight:'bold'},  key: "/profile", icon: <UserOutlined /> },
          {label:"WallPaper", style:{fontWeight:'bold'},  key:"/wallpaper", icon:<UserOutlined/>, 
            children:[
              {label:"Active WallPaper", style:{fontWeight:'bold'},  key:"/active-wallpaper"},
              {label:"InActive WallPaper", style:{fontWeight:'bold'},  key:"/inactive-wallpaper"}
            ],
          },
          {
            label: "Video Cat",
            key: "/video_cat",
            icon: <PoweroffOutlined />,
            danger: true,
          },
          { label: "", key: "/admin-home1" },
          { label: "", key: "/admin-home2" },
          { label: "", key: "/admin-home3" },
          { label: "", key: "/admin-home4" },
          { label: "", key: "/admin-home5" },
          { label: "", key: "/admin-home6" },
          { label: "", key: "/admin-home7" },
        ]}
      ></Menu>
    </div>
  );
}

function Content() {
  return (
    <div>
      <Routes>
        <Route path="/admin-home" element={<AdminHome />}></Route>
        <Route path="/inactive-videos" element={<InActiveVideos />}></Route>
        <Route path="/show-users" element={<AdminUsers />}></Route>
        <Route path={"/add-user"} element={<AddUsers/>} />
        <Route path={"/update-user"} element={<UpdateUsers/>} />
        <Route path="/userlist" element={<div>UserList</div>}></Route>
        <Route path="/profile" element={<UserProfile/>}></Route>
        <Route path="/video_cat" element={<div>Signout</div>}></Route>
        <Route path="/show-category" element={<VideoCategoryHome/>}></Route>
        <Route path="/add-category" element={<AddVideoCategory/>}></Route>
        <Route path="/inactive-wallpaper" element={<WallPaperHome/>}></Route>
        <Route path="/active-wallpaper" element={<ActiveWallPaper/>}></Route>

      </Routes>
    </div>
  );
}

export default App;

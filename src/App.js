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
import VideoVerification from "./videocomponent/VideoVerification";
import { Menu } from "antd";
import {
  DashOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UnorderedListOutlined,
  UserOutlined,
  VideoCameraOutlined
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
          <Header />
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
    <div className="header" >
      <hq>Header</hq>
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
          { label: "Home", key: "/admin-home", icon: <HomeOutlined /> },
          { label: "Users", key: "/users", icon: <DashOutlined />,
          children: [
            {label: "Show Users", key: "/show-users"},
            {label: "Add User", key: "/add-user"},
          ]
          },
          {
            label: "Video Category",
            key: "/userlist",
            icon: <UnorderedListOutlined />,
            children: [
              { label: "Show Category", key: "/show-category" },
              { label: "Add Category", key: "/add-category" },
            ],
          },
          { label: "Videos", key: "/admin-home1", icon: <VideoCameraOutlined /> ,
          children: [
            {label: "Video Verification", key: "/video-verification"},
            {label: "Publish Video", key: "/publish-video"},
          ]
          },
          { label: "Profile", key: "/profile", icon: <UserOutlined /> },
          {
            label: "Video Cat",
            key: "/video_cat",
            icon: <PoweroffOutlined />,
            danger: true,
          },

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
        <Route path="/show-users" element={<AdminUsers />}></Route>
        <Route path={"/add-user"} element={<AddUsers/>} />
        <Route path={"/update-user"} element={<UpdateUsers/>} />
        <Route path="/userlist" element={<div>UserList</div>}></Route>
        <Route path="/profile" element={<UserProfile/>}></Route>
        <Route path="/video_cat" element={<div>Signout</div>}></Route>
        <Route path="/show-category" element={<VideoCategoryHome/>}></Route>
        <Route path="/add-category" element={<AddVideoCategory/>}></Route>
        <Route path={"/video-verification"} element={<VideoVerification/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

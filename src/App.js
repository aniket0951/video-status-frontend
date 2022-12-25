import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./components/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AdminHome from "./components/AdminHome";
import VideoCategoryHome from "./components/VideoCategoryHome";
import AddVideoCategory from "./components/AddVideoCategory";
import { Menu } from "antd";
import {
  DashOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {window.location.pathname == "/" ? (
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
          <Footer />
        </div>
      )}
      
    </>
  );
}

function Header() {
  return (
    <div className="header">
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
          { label: "Dashboard", key: "/dashoboard", icon: <DashOutlined /> },
          {
            label: "Video Category",
            key: "/userlist",
            icon: <UnorderedListOutlined />,
            children: [
              { label: "Show Category", key: "/show-category" },
              { label: "Add Category", key: "/add-category" },
            ],
          },
          { label: "Profile", key: "/profile", icon: <UserOutlined /> },
          {
            label: "Video Cat",
            key: "/video_cat",
            icon: <PoweroffOutlined />,
            danger: true,
          },
          { label: "", key: "/admin-home" },
          { label: "", key: "/admin-home" },
          { label: "", key: "/admin-home" },
          { label: "", key: "/admin-home" },
          { label: "", key: "/admin-home" },
          { label: "", key: "/admin-home" },
          { label: "", key: "/admin-home" },
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
        <Route path="/dashoboard" element={<div>Dashboard</div>}></Route>
        <Route path="/userlist" element={<div>UserList</div>}></Route>
        <Route path="/profile" element={<div>Profile</div>}></Route>
        <Route path="/video_cat" element={<div>Signout</div>}></Route>
        <Route path="/show-category" element={<VideoCategoryHome/>}></Route>
        <Route path="/add-category" element={<AddVideoCategory/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

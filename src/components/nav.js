import { Layout, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Link to="/home">Home</Link>
          <Link to="/create" style={{ marginLeft: 20 }}>
            Create todo
          </Link>
          <Link to="/profile" style={{ marginLeft: 20 }}>
            Profile
          </Link>
          {/* <Link to = '/' style={{marginTop=100}}>Login</Link> */}
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;

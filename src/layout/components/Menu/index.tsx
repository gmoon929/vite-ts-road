import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { queryMenuData } from "@/api/layout";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const LayoutMenu = (props: any) => {
  // 面包屑数据
  // const [crumbsList, setCrumbsList] = useState([]);
  // 菜单数据
  const [menuList, setMenuList] = useState([]);
  // loading
  // const [loading, setLoading] = useState(false);
  // 获取菜单数据
  const getMenuData = async () => {
    // setLoading(true);
    const res = await queryMenuData({ user: "admin" }).finally(() => {
      // setLoading(false);
    });
    withMenuList(res.data);
  };
  const withMenuList = (data: any) => {
    const menuData = data.map((item: any) => {
      return {
        key: item.path,
        label: item?.label,
        children: item.children.map((ch: any) => {
          return {
            key: ch.path,
            label: ch?.label,
          };
        }),
      };
    });
    setMenuList(menuData);
  };
  useEffect(() => {
    getMenuData();
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const selectNode = ({ key}: any) => {
    navigate(key);
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={crumbsList}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
      </Header>
      <Layout>
        <Sider
          className="overflow-auto"
          width={200}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuList}
            onClick={selectNode}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <Content
            className="overflow-auto"
            style={{
              padding: 24,
              margin: 0,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              border: "1px solid red",
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default LayoutMenu;

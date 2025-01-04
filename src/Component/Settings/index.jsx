import React, { useState, useEffect } from "react";
import { Layout, Input, List, Avatar, Typography, Drawer, Menu } from "antd";
import {
  SettingOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import BillingDashboard from "./Billing";
import Calendar from "./Calendar";

const { Sider } = Layout;
const { Text, Title } = Typography;

const SettingsSideBar = [
  {
    key: "billing",
    label: "Billing",
    icon: <CreditCardOutlined />,
    component: <BillingDashboard />,
  },
  {
    key: "calendar",
    icon: <CalendarOutlined />,
    label: "Calendar",
    component: <Calendar />,
  },
];

const Settings = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(
    <BillingDashboard />
  );

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Handle menu item click
  const handleMenuClick = (key) => {
    const selectedItem = SettingsSideBar.find((item) => item.key === key);
    setSelectedComponent(selectedItem?.component || null); // Set the corresponding component
  };

  const SidebarContent = (
    <div style={{ height: "100%" }}>
      <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Settings
          </Title>
        </div>
      </div>
      <List
        dataSource={SettingsSideBar}
        renderItem={(item) => (
          <List.Item
            key={item.key}
            style={{ padding: "12px 16px" }}
            onClick={() => handleMenuClick(item.key)}
          >
            <List.Item.Meta avatar={item.icon} title={item.label} />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Menu
            mode="horizontal"
            style={{ borderBottom: "1px solid #f0f0f0" }}
            onClick={toggleDrawer}
          >
            <Menu.Item key="inbox" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
          <Drawer
            title="Settings"
            placement="left"
            closable
            onClose={toggleDrawer}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            {SidebarContent}
            {selectedComponent} {/* Render selected component */}
          </Drawer>
        </>
      ) : (
        <Sider
          theme="light"
          width={300}
          style={{ borderRight: "1px solid #f0f0f0", height: "100vh" }}
        >
          {SidebarContent}
          {/* Render selected component */}
        </Sider>
      )}
      {selectedComponent}
    </>
  );
};

export default Settings;

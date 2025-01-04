import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Tabs, Typography, Space, Spin, Layout } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  LockOutlined,
  EditOutlined,
} from "@ant-design/icons";
import WorkingHoursModal from "./WorkingHoursModal";
import { fetchWorkingHours } from "../../../features/workingHours/workingHourSlice";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, workingHours } = useSelector((state) => state);
  const { data: profileData, status } = profile;
  const { workingHours: workingHoursData } = workingHours;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchWorkingHours());
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const convertTo24HourFormat = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const isCurrentTimeInRange = (start, end) => {
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();

    const startMinutes = convertTo24HourFormat(start);
    const endMinutes = convertTo24HourFormat(end);

    // If the end time is earlier than the start time, it means the time range crosses midnight
    if (startMinutes > endMinutes) {
      // Current time is either after the start time or before the end time (midnight cross)
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    }

    // Otherwise, the time range doesn't cross midnight
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  };

  // Get the current day of the week (e.g., Monday, Tuesday)
  const getCurrentDay = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = new Date().getDay();
    return daysOfWeek[currentDayIndex];
  };

  const currentDay = getCurrentDay();

  // Get working hours for the current day or set to empty array if not available
  const currentDayWorkingHours = workingHoursData.find(
    (day) => day.day === currentDay
  ) || { times: [] };

  if (status === "loading") {
    return <Spin size="large" />;
  }

  if (!profileData) {
    return <Text type="danger">Failed to load profile data.</Text>;
  }

  return (
    <Layout style={{ background: "white", padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <Space size={16}>
          <Avatar size={64}>{profileData.name[0]}</Avatar>
          <div>
            <Title level={2} style={{ marginBottom: 0 }}>
              {profileData.name}
            </Title>
            <Text type="secondary">
              {profileData.role} · {profileData.location} · {profileData.time}
            </Text>
          </div>
        </Space>
        <Button icon={<EditOutlined />} onClick={showModal} />
      </div>

      <Tabs defaultActiveKey="about">
        <TabPane tab="About" key="about">
          <Space direction="vertical" size={16}>
            <Space>
              <PhoneOutlined />
              <Text>{profileData.phone}</Text>
            </Space>
            <Space direction="vertical" size={4}>
              {profileData.emails.map((email, index) => (
                <Space key={index}>
                  <MailOutlined />
                  <Text>{email}</Text>
                </Space>
              ))}
            </Space>
            <Space>
              <ClockCircleOutlined />
              <Text>
                Today: {currentDay}
                {currentDayWorkingHours.times.length > 0 ? (
                  <ul style={{ paddingLeft: "20px" }}>
                    {currentDayWorkingHours.times.map((time, index) => {
                      const isOpen = isCurrentTimeInRange(time.start, time.end);
                      return (
                        <li key={index} style={{ margin: "5px 0" }}>
                          {time.start} - {time.end}:{" "}
                          <span
                            style={{
                              color: isOpen ? "green" : "red",
                              fontWeight: "bold",
                              fontSize: "14px",
                            }}
                          >
                            {isOpen ? "Open Now" : "Closed"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <Text type="danger" style={{ marginLeft: "5px" }}>
                    Closed today (No working hours specified).
                  </Text>
                )}
              </Text>
            </Space>
            <Space>
              <LockOutlined />
              <Text>{profileData.ownership}</Text>
            </Space>
          </Space>
        </TabPane>

        <TabPane tab="Working hours" key="working-hours">
          <ul style={{ paddingLeft: "20px" }}>
            {workingHoursData.map((day, index) => {
              return (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <strong>{day.day}</strong>
                  <ul>
                    {day.times.length > 0 ? (
                      day.times.map((time, timeIndex) => {
                        const isOpen = isCurrentTimeInRange(
                          time.start,
                          time.end
                        );
                        return (
                          <li key={timeIndex} style={{ margin: "5px 0" }}>
                            {time.start} - {time.end}:{" "}
                            <span
                              style={{
                                color: isOpen ? "green" : "red",
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {isOpen ? "Open Now" : "Closed"}
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <Text type="danger" style={{ fontSize: "14px" }}>
                        Closed (No working hours specified)
                      </Text>
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </TabPane>

        <TabPane tab="Updates" key="updates">
          Updates content
        </TabPane>
      </Tabs>

      <WorkingHoursModal visible={isModalVisible} onCancel={handleCancel} />
    </Layout>
  );
};

export default ProfilePage;

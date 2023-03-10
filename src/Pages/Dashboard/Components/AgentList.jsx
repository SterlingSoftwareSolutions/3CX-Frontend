import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfilePic from "./ProfilePic";

const AgentList = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch("/api/users/agents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token,
      },
    }).then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.data]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        width: "90%",
        margin: "15px 40px 0 0",
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
        borderRadius: "6px",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          header={<h1 className="agent-title">Agents</h1>}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<ProfilePic agentName={item.name} />}
                title={item.name}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default AgentList;

import React, { useEffect, useState } from "react";
import Table from "../../Components/table/table";
import { fetchArray, getDate } from "../../Utils/utils";

const Users = () => {
  const [data, setData] = useState([
    {
      id: 1,
      email: "",
      name: "",
      created_at: "",
    },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "User Created Date",
      dataIndex: "created_at",
      render: (key, record) => {
        return <span>{getDate(record)}</span>;
      },
    },
  ];
  //Get api url
  const api = "/api/users";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  return (
    <div className="table-container">
      <h2 className="inquiries-title">Users</h2>
      <Table users={data} columns={columns} />
    </div>
  );
};

export default Users;

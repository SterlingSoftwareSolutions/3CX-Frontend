import React, { useEffect, useState } from "react";
import Table from "../../Components/table/table";
import { fetchArray } from "../../Utils/utils";

const CustomerTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      email: "",
      name: "",
      created_at: "",
      location:"",
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
      title: "Phone",
      dataIndex: "phone",
      key: "address",
    },
    {
      title: "Remarks",
      dataIndex: "comment",
      key: "address",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "address",
    },

  ];
  //Get api url
  const api = "/api/customers";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  return (
    <div className="table-container">
      <h2 className="inquiries-title">Customers</h2>
      <Table users={data} columns={columns} />
    </div>
  );
};
export default CustomerTable;

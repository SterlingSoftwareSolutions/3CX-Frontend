import React, { useEffect, useState } from "react";
import Table from "../table/table";
import "./Inquiry.css";
import { fetchArray, getDate } from "../../Utils/utils";

const AllInquiries = () => {
  //popup the page in this section
  const [data, setData] = useState([
    {
      id: 1,
      brand: "",
      brand_availability: "",
      product_category: "",
      action: "",
      status_remark: "",
      open: "",
      user_id: "",
      customer_id: "",
      call_type_id: "",
      created_at: "",
    },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "age",
    },
    {
      title: "Brand Availability",
      dataIndex: "brand_availability",
      key: "address",
    },
    {
      title: "Product Category",
      dataIndex: "product_category",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "address",
    },
    {
      title: "Status Remark",
      dataIndex: "status_remark",
      key: "address",
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "address",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "address",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "address",
    },
    {
      title: "Call Type ID",
      dataIndex: "call_type_id",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "address",
      render: (key, record) => {
        return <span>{getDate(record)}</span>;
      },
    },
  ];
  //Get api url
  const api = "/api/inquiries";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  return (
    <div className="table-container">
      <h2 className="inquiries-title">Inquiries</h2>
      <Table users={data} columns={columns} />
    </div>
  );
};

export default AllInquiries;

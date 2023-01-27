import React, { useEffect, useState } from "react";
import Table from "../../Components/table/table";
import { fetchArray } from "../../Utils/utils";
import "./index.css";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Button,Popconfirm,Space,Form } from "antd";
import {MdDelete} from 'react-icons/md';
import {FiEdit} from 'react-icons/fi';



const CustomerTable = () => {
  const [editRowKey, setEditRowKey] = useState("")
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm()
  const [data, setData] = useState([
    {
      id: 1,
      email: "",
      name: "",
      created_at: "",
      location: "",
    },
  ]);

  const isEditing = (record) => {
    return record.key === editRowKey; 
  }

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      message: "", 
      ...record
    });
    setEditRowKey(record.key); 
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      
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
    {
      title: "Action",
      dataIndex: "action",
      render: (key, record) =>{
        const editable = isEditing(record);
        return data.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Are you sure want to delete?"
              onConfirm={() => handleDelete(record)}
            >
           {/* delete button */}
          <Button style={{ width: '47px', height: '47px',border:'none' }}>
            <MdDelete  style={{ width: '40px', height: '40px' }}/>
          </Button>

            </Popconfirm>
            {editable ?(
              <span>
                <Space size={"middle"}>
                 
        {/* edit button */}
         <Button  style={{ width: '50px', height: '50px',border:'none' }}>
          <FiEdit style={{ width: '40px', height: '40px' }}/>
          </Button>
                                   
                </Space>
              </span>
            ):(
              <Button onClick={() => edit(record)} style={{ width: '50px', height: '50px',border:'none' }} >
                <FiEdit style={{ width: '40px', height: '40px' }}/>
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];
  //Get api url
  const api = "/api/customers";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  //delete action row 
  const handleDelete = (value) => {
    const dataSource = [...data];
    const filteredData = dataSource.filter((record) => record.id !== value.id);
    setData(filteredData);
  }

  //serach text
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="table-container">
      <div className="table-head">
        <h6> Home / Customer</h6>
        <div className="table-name">
          <h3>Customers</h3>
          <form className="search">
            <input
              type="text"
              name="text"
              placeholder="Search Name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="serach-icon">
            <Button>
              <BsSearch />
            </Button>
            </div>
          </form>

          <div className="btn">
            <input type="button" value="Add Customer" />
          </div>
          <div className="btn-icon">
            <MdPersonAddAlt1  style={{ width: '25px', height: '25px' }} />
          </div>
        </div>

        <Table className='data-table' dataSource={filteredData} users={data} columns={columns} />
       
      </div>
     
    </div>
   
  );
};
export default CustomerTable;

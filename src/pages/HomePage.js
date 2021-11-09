import { Table } from "antd";
import { useState, useEffect } from "react";
import { Space } from "antd";
import { useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Services from "../Services/services";

const _apiURL = "https://jsonplaceholder.typicode.com/todos/";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const history = useHistory();

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, object) => (
        <Space size="middle">
          <a>
            <EditOutlined
              style={{ color: "blue" }}
              onClick={() => onEditAction(object)}
            />
          </a>
          <a>
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => onDeleteAction(object)}
            />
          </a>
        </Space>
      ),
    },
  ];

  const api_call = async (apiurl) => {
    try {
      const response = await fetch(apiurl);
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    api_call(_apiURL);
  }, []);

  const onEditAction = (e) => {
    console.log(e["id"]);
    history.push(`/create/${e["id"]}`);
  };

  const onDeleteAction = async (e) => {
    console.log(e);
    if (window.confirm("Are you sure!!!")) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${e["id"]}`
      );

      if (response.status === 201) {
        console.log("Object deleted successfully!");
      }
    } else {
      console.log("Delete Request Canceled!!!");
    }
  };

  return (
    <div style={{ paddingTop: 80 }}>
      <h1 style={{ fontFamily: "serif" }}>TODOS</h1>
      <Table
        style={{ marginLeft: 100, marginRight: 100 }}
        columns={columns}
        dataSource={todos}
      ></Table>
    </div>
  );
};

export default Home;

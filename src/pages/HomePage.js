import { Spin, Table } from "antd";
import { useState, useEffect } from "react";
import { Space } from "antd";
import { useHistory } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
  EyeOutlined,
} from "@ant-design/icons";
const _apiURL = "https://jsonplaceholder.typicode.com/todos/";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
          {/* <a>
            <a>
              <EyeFilled onClick={() => onViewAction(object)} />
            </a>
          </a> */}
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
      setIsLoading(true);
      const response = await fetch(apiurl);
      const data = await response.json();
      console.log(data);
      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    api_call(_apiURL);
  }, []);

  // const onViewAction = (a = {
  //   //history.push(`/profile/${e}`)
  // });

  const onEditAction = (e) => {
    //console.log(e["id"]);
    history.push(`/create/${e["id"]}`);
  };

  const onDeleteAction = async (e) => {
    //console.log(e);
    if (window.confirm("Are you sure!!!")) {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${e["id"]}`
      ).catch((e) => alert(e));
      setIsLoading(false);
      if (response.status === 200) {
        alert("Todo deleted successfully!");
        setIsLoading(false);
      }
    } else {
      console.log("Delete Request Canceled!!!");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 80 }}>
      <h1 style={{ fontFamily: "serif" }}>TODOS</h1>
      {isLoading ? (
        <Spin />
      ) : (
        <Table
          key={Math.random()}
          style={{ marginLeft: 100, marginRight: 100 }}
          columns={columns}
          dataSource={todos}
        ></Table>
      )}
    </div>
  );
};

export default Home;

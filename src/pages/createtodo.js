import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { Form, Input, Button, Checkbox } from "antd";

// const CreateTodo = ({ match }) => {
//   console.log(match.params.id);
//   const [todo, setTodo] = useState([]);
//   const [todoTitleVal, setTodoTitleval] = useState("");
//   const [todocomp, setTodocomp] = useState("");

//   const gettodo = async () => {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/todos/${match.params.id}`
//     );

//     const todo = await response.json();
//     console.log(todo);
//     setTodo(todo);
//   };

//   useEffect(() => {
//     gettodo();
//   }, []);

//   return (
//     <div>
//       <Card style={{ width: 500 }}>
//         <p>
//           <input
//             type="text"
//             name="title"
//             value={todoTitleVal}
//             onChange={setTodoTitleval}
//           />
//         </p>
//         <p>
//           <Checkbox name="completed" value={todocomp} onChange={setTodocomp}>
//             Completed
//           </Checkbox>
//         </p>
//       </Card>
//     </div>
//   );
// };

const CreateTodo = ({ match }) => {
  console.log(match.params.id);
  const [todo, setTodo] = useState([]);
  const [todoTitleVal, setTodoTitleval] = useState("");
  const [todocomp, setTodocomp] = useState("");

  const gettodo = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${match.params.id}`
    );

    const todo = await response.json();
    console.log(todo);
    setTodo(todo);
  };

  useEffect(() => {
    gettodo();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ padding: 300 }}
    >
      <Form.Item
        label="Title"
        name={todoTitleVal}
        onChange={setTodoTitleval}
        rules={[{ required: true, message: "Please input Todo Title" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="completed"
        value={todocomp}
        onChange={setTodocomp}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Completed</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTodo;

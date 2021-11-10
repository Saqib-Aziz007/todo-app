import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { Form, Input, Button, Checkbox, DatePicker, Spin } from "antd";

const EditTodod = ({ match }) => {
  console.log(match.params.id);
  const [todo, setTodo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const onFinish = async (values) => {
    console.log("Success:", values);
    setIsLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/`,
      {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return isLoading ? (
    <Spin style={{ marginTop: 80 }} />
  ) : (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ padding: 300 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input Todo Title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="description"
        name="description"
        rules={[{ required: true, message: "Please input Todo Description" }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item label="DatePicker" name="date">
        <DatePicker />
      </Form.Item> */}

      <Form.Item
        name="completed"
        valuePropName="checked"
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

export default EditTodod;

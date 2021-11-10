import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { Form, Input, Button, Checkbox, Spin } from "antd";

const CreateTodo = ({ match }) => {
  const [form] = Form.useForm();

  //console.log(match.params.id);
  const matchID = match.params.id;
  const finishButton = matchID ? "Update" : "Submit";
  const [todo, setTodo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const gettodo = async (method, data) => {
    setIsLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${match.params.id}`,
      {
        method: method,
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const todos = await response.json();
    if (matchID) {
      form.setFieldsValue({
        title: todos.title,
        description: "Description is not provided in Api",
        completed: todos.completed,
        userId: todos.userId,
        id: todo.id,
      });
    } else {
      form.setFieldsValue({
        title: "",
        description: "",
        completed: false,
        userId: "1255",
      });
    }
    setTodo(todos);
    setIsLoading(false);
  };

  useEffect(() => {
    gettodo();
  }, []);

  const onFinish = (values) => {
    // console.log("Success:", values);
    // console.log("previous:", todo);
    if (!matchID) {
      alert("Todo created Successfully");
      setIsLoading(true);
      const response = fetch(`https://jsonplaceholder.typicode.com/todos/`, {
        method: "post",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        //.then((todos) => console.log(todos))
        .catch((e) => console.log(e));
      setIsLoading(false);
    } else {
      alert("Updated Successfully!");
      setIsLoading(true);
      const response = fetch(
        `https://jsonplaceholder.typicode.com/todos/${match.params.id}`,
        {
          method: "PATCH",
          body: values,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then((res) => res.json());
      //.then((todos) => console.log(todos));
      setIsLoading(false);
    }
    form.setFieldsValue({
      title: "",
      description: "",
      completed: false,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return isLoading ? (
    <Spin style={{ marginTop: 80 }} />
  ) : (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ padding: 300 }}
    >
      <Form.Item label="userId" name="userId" value="1" hidden={true}>
        <Input />
      </Form.Item>
      <Form.Item label="id" name="id" hidden={true}>
        <Input />
      </Form.Item>
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
          {finishButton}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTodo;

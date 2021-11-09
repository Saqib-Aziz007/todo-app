import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { Card, Checkbox } from "antd";

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

  return (
    <div style={{}}>
      <Card style={{ width: 500 }}>
        <p>
          <input
            type="text"
            name="title"
            value={todoTitleVal}
            onChange={setTodoTitleval}
          />
        </p>
        <p>
          <Checkbox name="completed" value={todocomp} onChange={setTodocomp}>
            Completed
          </Checkbox>
        </p>
      </Card>
    </div>
  );
};

export default CreateTodo;

import "./App.css";
import "antd/dist/antd.css";
import Login from "./pages/Login";
import Navbar from "./components/nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import CreateTodo from "./pages/createtodo";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/create" exact component={CreateTodo} />
          <Route path="/create/:id" exact component={CreateTodo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

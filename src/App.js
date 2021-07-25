import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <div className="w-full min-h-screen bg-indigo-900 flex flex-col items-center">
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/room/:id" component={ChatRoom}></Route>
      </Switch>
    </div>
  );
}

export default App;

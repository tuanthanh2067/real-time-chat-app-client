import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="w-full min-h-screen bg-indigo-900 flex flex-col items-center">
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <ProtectedRoute path="/room/:id" component={ChatRoom}></ProtectedRoute>

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

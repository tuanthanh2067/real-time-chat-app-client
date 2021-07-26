import { Switch, Route } from "react-router-dom";

import { UserProvider } from "./context/userContext";
import { SocketProvider } from "./context/socketContext";

import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <SocketProvider>
      <UserProvider>
        <div className="w-full min-h-screen bg-indigo-900 flex flex-col items-center">
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <ProtectedRoute
              path="/room/:id"
              component={ChatRoom}
            ></ProtectedRoute>

            <Route component={NotFound} />
          </Switch>
        </div>
      </UserProvider>
    </SocketProvider>
  );
}

export default App;

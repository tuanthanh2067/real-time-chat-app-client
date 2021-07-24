import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [counter, setCounter] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [userId, setUserId] = useState("");
  const [started, setStarted] = useState(false);

  const timer = useRef();

  const startHandler = () => {
    setClicked((prevState) => !prevState);
  };

  // get user id from server
  useEffect(() => {
    axios
      .get("/user/sign-up")
      .then((res) => {
        setUserId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setCounter(0);

    console.log("in use effect");

    if (clicked) {
      setStarted(true);
      timer.current = setInterval(() => {
        axios
          .post("/user/search", { userId: userId })
          .then((res) => {
            console.log(res.data.roomId);
          })
          .catch((err) => {
            console.log(err);
          });
        setCounter((prevCount) => prevCount + 1);
      }, 1000);
    }

    if (!clicked && started) {
      axios
        .post("/user/stop", { userId: userId })
        .then(() => {
          console.log("stopped");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [clicked, userId, started]);

  return (
    <div className="w-full h-screen bg-indigo-900 flex flex-col items-center">
      <div className="text-center my-3">
        <h1 className="text-4xl font-bold text-gray-200">
          Welcome to quick chat
        </h1>

        <h1 className="text-xl text-gray-300">
          Click START to look for a stranger
        </h1>
      </div>

      <div className="my-7">
        <button
          className={`w-52 h-52 border-2 ${
            clicked
              ? "border-purple-500 text-purple-500"
              : "border-gray-100 text-gray-100"
          } text-3xl font-bold rounded-full hover:border-purple-500 hover:text-purple-500`}
          onClick={startHandler}
        >
          {clicked ? "Stop" : "Start"}
        </button>
      </div>

      {clicked && (
        <div className="my-3 text-center">
          <h1 className="text-gray-100 text-2xl font-bold">
            Searching for stranger
          </h1>
          <h1 className="text-gray-300 text-xl ">{counter} seconds</h1>
        </div>
      )}

      <div className="my-3 flex items-center">
        <div className="flex flex-col items-end text-gray-100">
          <h1 className="text-2xl font-bold">Person</h1>
          <h1 className="text-sm text-gray-400">${userId}</h1>
        </div>

        <div className="mx-2">
          <FaUserCircle className="text-gray-400 w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export default App;

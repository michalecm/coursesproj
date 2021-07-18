import "./App.css";
import Courses from "./components/Courses";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "../src/store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Courses />
      </div>
    </Provider>
  );
}

export default App;

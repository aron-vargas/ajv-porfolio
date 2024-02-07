import * as ReactDOM from "react-dom/client";
import App from "App";
import reportWebVitals from "./reportWebVitals";
import "include/style/custom-bootstrap.scss";
import "include/style/index.css";

// Find the root element
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// User root to render the reate Application (App)
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);

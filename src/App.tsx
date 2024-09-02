import { HashRouter, Route, Routes } from "react-router-dom";
import { UserTable } from "./components/UserTable/UserTabele";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route path="/" element={<UserTable />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;

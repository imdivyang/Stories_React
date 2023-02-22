import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import SignUp from "./screens/SignUp/SignUp";
import SignIn from "./screens/SignIn/SignIn";
import MyStories from "./screens/MyStories/MyStories";
import AddStories from "./screens/AddStories/AddStories";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/MyStories/addstories">
              <Route index element={<AddStories />} />
              <Route
                path="/MyStories/addstories/:id"
                element={<AddStories />}
              />
            </Route>
            <Route path="/MyStories" exact element={<MyStories />} />

            <Route path="/">
              <Route index element={<Dashboard />} />
              <Route path="/user/:params1" exact element={<Dashboard />} />
              {/* <Route path="/:params1/:params2" exact element={<Dashboard />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  );
}

export default App;

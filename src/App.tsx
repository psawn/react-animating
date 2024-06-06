import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import ChallengesPage from "./pages/Challenges";
import { Playground } from "./playground/playground";

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage /> },
  { path: "/challenges", element: <ChallengesPage /> },
  { path: "/playground", element: <Playground /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

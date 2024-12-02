import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout"; 
import Login from "./component/Login";
import Register from "./component/Register";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import CreatePost from "./component/CreatePost";
import SinglePost from "./component/SinglePost";
import Post from "./component/Post";
import UpdatePost from "./component/UpdatePost";
import About from "./component/About";
import Contact from "./component/Contact";
import Services from "./component/Service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/CreatePost",
        element: <CreatePost />,
      },
      {
        path: "/edit/:postId",
        element: <UpdatePost />,
      },
      {
        path: '/posts/:postId',
        element: <SinglePost />,
      },
      {
        path: '/posts/category/:categoryId',
        element: <Post />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/services',
        element: <Services />,
      },
    ],
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

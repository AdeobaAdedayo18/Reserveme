import logo from "../assets/pexels-pixabay-269140.jpg";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen grid md:grid-cols-2 lg:grid-cols-2 grid-cols-none overflow-hidden">
      <div className="hidden md:block lg:block">
        <img
          className="h-screen w-full object-cover object-center"
          src={logo}
          alt=""
        />
      </div>
      <div className="h-96 object-center align-item justify-item">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;

import logo from "../assets/pexels-pixabay-269140.jpg";
import calendarlogo from "../assets/Black and Red Minimal Calendar with Clock Logo (2).svg"
import LoginForm from "../components/LoginForm";


const LoginPage = () => {
  return (
   <div className="h-screen w-screen grid grid-cols-2 overflow-hidden">
    <div >
      <img className="h-screen w-full object-cover object-center" src={logo} alt="" />
    </div>
    <div className="h-96 object-center align-item justify-item">
      <LoginForm></LoginForm>
      </div>
   </div>
  );
};

export default LoginPage;

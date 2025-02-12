import logo from "../assets/pexels-pixabay-269140.jpg";
import SignupForm from "../components/SignupForm";
import calendarlogo from "../assets/Black and Red Minimal Calendar with Clock Logo (2).svg";

const SignupPage = () => {
  return (
    <div className="h-screen w-screen grid md:grid-cols-2 lg:grid-cols-2 grid-cols-none overflow-hidden">
      <div className="h-96 object-center align-item justify-item">
        <div className="flex justify-end mx-4 align-center">
          <div className="flex justify-center items-center space-x-1">
            <img className="h-16" src={calendarlogo} alt="Calendar Logo" />
            <p className="text-3xl font-bold text-[#B32406]">ReserveMe</p>
          </div>
        </div>
        <SignupForm></SignupForm>
      </div>
      <div className="hidden md:block lg:block">
        <img
          className="h-screen w-full object-cover object-center"
          src={logo}
          alt=""
        />
      </div>
    </div>
  );
};

export default SignupPage;

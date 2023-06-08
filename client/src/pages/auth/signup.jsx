import React,{useEffect} from "react";
import SignupForm from "../../components/Auth/SignupForm";
import HomeLayout from "../../layouts/HomeLayout";

const Signup = () => {

   useEffect(() => {
        document.title = "Signup";
      }, []);

    return(
        <>
        <HomeLayout>
            <SignupForm/>
        </HomeLayout>
        </>
    )
}

export default Signup
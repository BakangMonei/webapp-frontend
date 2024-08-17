import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { showPassword } from "../redux/actions/passwordActions"
import { useNavigate } from "react-router-dom";
import googleImage from "../assets/images/google_image.png";
import facebookImage from "../assets/images/facebook_image.png";
import Check from "../components/Checkbox/Check";
import Trefoill from "../components/loaders/Trefoill";

export const LoginPage = ({ showPasswordToggle, showPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [response, setResponse] = useState(true);

    const clearFields = () => {
        setEmail("");
        setPassword("");
    }

    const siteKey = "6LcgtOIfAAAAAPKY4tPJouA-7ujrn7IHYJNvuOk6"; // Hardcode the site key
    // const siteKey = process.env.REACT_APP_API_SITE_KEY;

    const [loginClicked, setLoginClicked] = useState(false); // Add this state variable

    const [isCaptchaVerified, setCaptchaVerified] = useState(false);
    const verifyCaptcha = () => {
        setCaptchaVerified(true);
    };

    const resetCaptcha = () => {
        setCaptchaVerified(false);
    };

    const checkCaptcha = () => {
        if (!isCaptchaVerified) {
            alert(`Verify you're human`);
            return false;
        }
        return true;
    };

    //   const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/users/signin', {
    //             email,
    //             password,
    //         });

    //         if (response.status === 200) {
    //             alert("Sign in successful");
    //             navigate('/'); // Navigate to home or dashboard page after successful sign-in
    //         } else {
    //             console.error("Error signing in:", response.data.message);
    //             alert(response.data.message);
    //         }
    //     } catch (error) {
    //         console.error("Error signing in:", error.response?.data?.message || error.message);
    //         alert(error.response?.data?.message || "Error signing in");
    //     }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email !== "" && password !== "") {
                alert("Sign in successful");
                clearFields();
                // navigate('/'); // Navigate to home or dashboard page after successful sign-in
            } else {
                console.error("Error signing in:", response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error signing in:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "Error signing in");
        }
    };

    useEffect(() => {
        // Any required setup or cleanup
    }, []);

    return (
        <div className="bg_image flex items-center justify-center min-h-screen ">
            <div className="login_container p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-4xl font-sans mb-1 text-center">Log In</h1>
                <h1 className="text-center font-thin mb-4">
                    Don’t have an account?{" "}
                    <a href="/RegistrationPage" className="text-black underline">
                        Sign up
                    </a>
                </h1>

                <div className="">
                    <button className="rounded-3xl border-2 border-gray-500 flex items-center px-4 py-2 justify-center w-full mb-4 bg-white">
                        <img
                            src={facebookImage}
                            alt="Facebook Icon"
                            className="w-6 h-6 mr-2"
                        />
                        Log in with Facebook
                    </button>
                    <button className="rounded-3xl border-2 border-gray-500 flex justify-center items-center px-4 py-2 w-full mb-4 bg-white">
                        <img src={googleImage} alt="Google Icon" className="w-6 h-6 mr-2" />
                        Log in with Google
                    </button>
                </div>

                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-500 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-500">
                    <p className="mx-4 mb-0 text-center font-semibold text-gray-500 dark:text-white">
                        OR
                    </p>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium mb-1">
                            Password
                            <button
                                type="button"
                                className="float-right text-gray-500 text-sm font-medium focus:outline-none hover:text-gray-700 transition duration-200"
                                onClick={() => showPassword()}
                            >
                                {showPasswordToggle ? "Hide" : "Show"}
                            </button>
                        </label>
                        <input
                            placeholder="Password"
                            className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            id="pass"
                            type={showPasswordToggle ? "text" : "password"} // Use showPasswordToggle instead of showPassword
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row mb-4 mt-1 text-end">
                        <div className="">
                            {/* Added margin-right to create space */}
                            <Check />
                        </div>
                        <div className="ml-auto">
                            <a href="/ForgotPassword" className="text-gray-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    {/* <div className="justify-center items-center flex p-3">
            <ReCAPTCHA
              sitekey={siteKey}
              // sitekey="6Lcmd9EpAAAAAB-OWZucytCG02_mFrByM5sJDEid"
              onChange={verifyCaptcha}
              onExpired={resetCaptcha}
            />
          </div> */}
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white py-2 rounded-3xl hover:bg-gray-800 transition duration-200"
                    >
                        Log in
                    </button>
                    <div className="justify-center items-center flex">
                        {loginClicked && <Trefoill />}
                    </div>
                </form>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    showPasswordToggle: state.password.showPassword,
});

export default connect(mapStateToProps, { showPassword })(LoginPage);
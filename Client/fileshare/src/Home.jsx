import bgimage from "./assets/wwwatercolor.png";
import { gsap, Power3 } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Components/Logout";
import Login from "./Components/Login";
import Transfer from "./Transfer";
import Pricing from "./Components/Pricing";

function Home() {
  gsap.registerPlugin(useGSAP, TextPlugin, Flip);
  //for logout
  const { user, isAuthenticated } = useAuth0();
  let timeline = new gsap.timeline();
  let ease = Power3.easeOut();

  let box = useRef(null);
  let text1 = useRef(null);
  let text2 = useRef(null);
  let text3 = useRef(null);

  useEffect(() => {
    isAuthenticated && console.log(user);

    timeline.from(box, 1, {
      opacity: 0,
      x: 200,
      ease: ease,
    });

    timeline.from([text1, text2, text3], 2, {
      opacity: 0,
      x: -50,
      stagger: {
        amount: 0.4,
      },
      ease: ease,
    });
  });
  //for navigaton
  useGSAP(() => {
    gsap.from(".navbar", { opacity: 0, y: 100, duration: 1 });
    gsap.from(".subheading2", { opacity: 0, y: 100, duration: 1 });
  });

  //for mobile view hunberger
  const [isOpen, setIsOpen] = useState(false);
  const [SignOpen, SetSignOpen] = useState(false);
  const [RegOpen, setRegOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" w-full max-h-screen">
      <div
        className="h-screen w-full text-black p-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="navbar  pt-4 h-10 flex items-center justify-between">
          <div className="logo font-mono text-violet-700 text-4xl font-bold cursor-pointer">
            MyShare
          </div>
          <div className="links hidden md:flex justify-center space-x-6">
            <a href="#" className=" p-4 font-mono hover:text-gray-400">
              Pricing
            </a>
            {!isAuthenticated && (
              <a
                href="#"
                className=" font-mono font-bold p-4 hover:text-gray-400"
                onClick={() => SetSignOpen(!SignOpen)}
              >
                <Login />
              </a>
            )}

            <a href="" className=" p-4 font-mono hover:text-gray-400">
              <Logout />
            </a>
            {isAuthenticated && (
              <a
                href="#"
                className="text-black bg-white p-4 rounded-sm hover:rounded-lg hover:text-gray-400"
                onClick={(el) => setRegOpen(!RegOpen)}
              >
                Profile
              </a>
            )}
          </div>

          <button className="md:hidden" aria-label="Menu" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <>
            <div
              className="backdrop md:hidden fixed inset-0 bg-black opacity-50 z-40"
              onClick={toggleMenu}
            ></div>

            <div
              className="mobile-menu md:hidden absolute top-[20%] left-0 right-0 z-50 bg-orange-300 rounded-lg shadow-md flex flex-col mt-2 p-2 gap-4"
              onClick={toggleMenu}
              ref={(el) => (box = el)}
            >
              <a
                href="#"
                className="w-full block py-2 pl-3 pr-4 text-center text-[1.5rem] text-gray-700  rounded bg-gray-300 hover:text-white"
                ref={(el) => (text1 = el)}
              >
                Pricing
              </a>
              {!isAuthenticated && (
                <a
                  href="#"
                  className="w-full block py-2 pl-3 pr-4 text-center text-[1.5rem] text-gray-700 rounded bg-gray-300 hover:bg-gray-100 hover:text-white"
                  ref={(el) => (text2 = el)}
                  onClick={() => SetSignOpen(!SignOpen)}
                >
                  <Login />
                </a>
              )}
              <a
                href=""
                className="text-white p-4 font-mono hover:text-gray-400"
              >
                <Logout />
              </a>

              {isAuthenticated && (
                <a
                  href="#"
                  className="w-full block py-2 pl-3 pr-4 text-center text-[1.5rem]  text-black bg-white rounded hover:bg-gray-100 hover:text-white"
                  onClick={(el) => setRegOpen(!RegOpen)}
                  ref={(el) => (text3 = el)}
                >
                  Profile
                </a>
              )}
            </div>
          </>
        )}

        {RegOpen && (
          <>
            <div
              className=" fixed inset-0 bg-black opacity-50 z40 "
              onClick={(el) => setRegOpen(!RegOpen)}
            />
            <div className=" absolute right-0 top-18 w-[400px] h-[480px] ">
              <Profile />
            </div>
          </>
        )}
        <Transfer />
      </div>
      <div className=" w-full h-[100vh] bg-black text-white">
        <div className="">
          <h2 className=" flex justify-center items-center text-center pt-10 text-2xl md:text-[3.5rem] font-Anton font-bold">
            Free To Share And Download Your Important File.
          </h2>
          <div className="flex justify-center items-center">
            <Pricing />
          </div>
          <div className=" w-full bg-[#d6fb41] h-10 mt-12"></div>
        </div>
      </div>
      <div className=" w-full min-h-screen bg-black text-white">
        <div className=" pt-10">
          <h2
            className="subheading2 flex justify-center items-center text-center mt-40 text-6xl font-Anton font-bold 
           text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-yellow-500 to-amber-400 "
          >
            Send big files, hassle-free
          </h2>

          <p className=" flex justify-center items-center text-center font-bold font-mono mt-20 ">
            WeTransfer makes it easy to quickly share your files without
            limitations, getting your ideas where they need to go.
          </p>

          <div className=" flex justify-center  items-center text-center mt-10 font-Popins">
            <a
              href=" "
              className=" w-[300px] h-14 rounded-full text-3xl animate-bounce duration-150  bg-red-700 hover:bg-gradient-to-r from-gray-300 via-yellow-500 to-amber-400"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

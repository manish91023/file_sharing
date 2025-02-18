import React, { useState,useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuth0 } from "@auth0/auth0-react";
gsap.registerPlugin(useGSAP)
function Register() {
  const {user} = useAuth0();
  
 useGSAP(() => {
  gsap.from(".register", { opacity: 0, x: 100, duration: 1 });
});
  return (
    
    <div className="register text-white w-full  md:w-[380px] h-screen md:h-auto bg-white fixed right-0 top-18 rounded-tl-md rounded-bl-md overflow-hidden" >
    <div className="container bg-[#344874] mx-auto p-4 pt-6 md:p-6 lg:p-12 relative z-10">
      <h2 className="text-3xl text-center font-bold mb-4">Profile</h2>

          <div className=" flex justify-center items-center rounded-full">
            <img className="rounded-full" src={user?.picture?user.picture:`https://th.bing.com/th/id/OIP.TctatNGs7RN-Dfc3NZf91AAAAA?rs=1&pid=ImgDetMain`} alt="" />
          </div>
          <div className="info">
            <h2 > <i class="fa-solid fa-user font-bold text-green-200"></i> {user.name} </h2>
            <h2><i class="fa-regular fa-envelope  text-orange-500"></i> {user.email} </h2>
            <h2> <i class="fa-brands fa-galactic-senate  text-yellow-300"></i > {user.nickname}</h2>
          </div>
      

      
        
          
    </div>
    
    </div>
   
  );
}

export default Register;

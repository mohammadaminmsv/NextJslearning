"use client";

import { getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

const SignInPage = () => {
  const [signForm, setSignForm] = useState({
    username: "",
    email: "",
    img: null,
  });

  const changeHandler = (e) => {
    setSignForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const [providers, setProviders] = useState(null);


  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <section className="flex flex-col text-center items-center shadow-lg w-3/5 h-[50vw] border-black">
      <spna className="px-3 mt-10">continue with Google</spna>
      <button onClick={()=>signIn("google")} className="flex flex-row w-40 py-2 my-2 justify-center rounded-sm bg-orange-100 ">
        <span className="">GOOGLE</span>
      </button>
      <span>
        ---------------------------------------------------------------
      </span>
      <form className="flex flex-col space-y-8 items-start mt-10">
        <div>
          <span>Username : </span>
          <input
            type="text"
            name="username"
            id="usernameInput"
            value={signForm.username}
            className="w-48 rounded-lg py-1 shadow-md bg-amber-50 mx-5 text-center"
            onChange={changeHandler}
          />
        </div>
        <div>
          <span>Email : </span>
          <input
            type="email"
            name="email"
            id="emailInput"
            value={signForm.email}
            onChange={changeHandler}
            className="w-56 rounded-lg py-1 shadow-md bg-amber-50 mx-5 text-center"
          />
        </div>
        <div>
          <span>Image : </span>
          <input
            type="file"
            id="imageInput"
            name="img"
            accept="image/*"
            className="w-56 rounded-lg shadow-md bg-amber-50 mx-5 px-2"
            value={signForm.img}
            onChange={changeHandler}
          />
        </div>
        <button
          className="black_btn blur-0"
          onClick={(e) => {
            e.preventDefault(), console.log(signForm) , console.log(providers);
          }}
        >
          submit
        </button>
      </form>
    </section>
  );
};

export default SignInPage;

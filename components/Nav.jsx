"use client";

import { signOut, signIn, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const Router = useRouter();
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  console.log(providers);

  return (
    <nav className="flex-between px-16 w-full mb-16 pt-3">
      <Link href="/" className=" flex text-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain blur-0"
        />
        <p className="logo_text blur-0">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn blur-0">
              create post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className=" outline_btn blur-0"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full blur-0"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => Router.push("/SignInPage")}
                  className="black_btn blur-0"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex ">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full blur-0"
              onClick={() => {
                setToggleDropdown((perv) => !perv);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown z-50 absolute">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => Router.push("/SignInPage")}
                  className="black_btn blur-0"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

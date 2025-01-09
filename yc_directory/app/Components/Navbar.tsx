import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

// This is a server rendered component.
const Navbar = async () => {
  // We are gonna look into the user session for knowing if the user is logged in or not. 
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {/* We are gonna render things only if the user is logged in */}
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <button type="submit">
                  Logout
                </button>
              </form>

              {/* One more link that will point to the user profile */}
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            // If the user is not signed in, we are gonna render a button to signin.
            // Since the signIn is an asynchronous we would have to add await in front of it. We will have to turn this into a server action by creating a new callback function. And using the <form> element of the Next.js 19.
            <form action={async () => {
              // Adding the "use server" directive. which will ensure that this will be called on the server.
              "use server";
              await signIn('github');
            }}>
              <button type="submit">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

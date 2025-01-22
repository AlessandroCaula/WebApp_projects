import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

// Right in the Nav Bar we are going to implement the OAuth authentication.
// Since we use the await to get the user session, we have to turn this function into an async function.
const Navbar = async () => {
  // Retrieving the user session
  const session = await auth();

  return (
    // Using the HTML semantic header tag.
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        {/* Adding a next.js link tag that will point to the homepage */}
        <Link href="/">
          {/* In here we can show our logo */}
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {/* Within here, we only want to render things if our user is logged-in */}
          {/* To check if the user is logged-in we can look into a user session which is coming directly from next auth */}
          {/* Check if the session exist and if the session has a user, only in that case, render the rest */}
          {session && session?.user ? (
            // Render additional information about the user.
            <>
              {/* Render a link for the user to go into the create page*/}
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>

              {/* Rendering one more link, which will point to the user profile */}
              {/* Add a dynamic URL, that will changed based on which user ID has logged-in */}
              <Link href={`user/${session?.id}`}>
                {/* Just rendering the user name */}
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            // What happen in this case, if we don't have a user? We are going to display a button for the log-in.
            // Since the signIn is an asynchronous function, we have to add an await in front of it. But since to simply add the await is not possible, we have tu turn all this into a server action, by creating a new callback function.
            // !!! But how can you do this, if the button is maybe the best example of a "client component".
            // !!! Therefore, what we have to do instead is to use the latest React 19 server actions Form feature. (https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
            <form
              action={async () => {
                // Adding a use server directive.
                "use server";
                // Now we can add the await in front of the signIn
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

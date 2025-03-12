import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import { useSignOut } from "@gadgetinc/react";
import { Home, LogOut, User } from "lucide-react";
import { useState } from "react";
import {
  Link,
  Outlet,
  redirect,
  useLocation,
  useOutletContext,
} from "react-router";
import type { RootOutletContext } from "../root";
import type { Route } from "./+types/_auth";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { session, gadgetConfig } = context;

  const userId = session?.get("user");
  const user = userId ? await context.api.user.findOne(userId) : undefined;

  if (!user) {
    return redirect(gadgetConfig.authentication!.signInPath);
  }

  return {
    user,
  };
};

export type AuthOutletContext = RootOutletContext & {
  user?: any;
};

const UserMenu = ({ user }: { user: any }) => {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const signOut = useSignOut();

  const getInitials = () => {
    return (
      (user.firstName?.slice(0, 1) ?? "") +
      (user.lastName?.slice(0, 1) ?? "")
    ).toUpperCase();
  };

  return (
    <DropdownMenu
      open={userMenuActive}
      onOpenChange={setUserMenuActive}
    >
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full p-1 hover:bg-accent">
          <Avatar>
            {user.profilePicture?.url ? (
              <AvatarImage src={user.profilePicture.url} alt={user.firstName ?? user.email} />
            ) : (
              <AvatarFallback>{getInitials()}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm font-medium">
            {user.firstName ?? user.email}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link
            to="/profile"
            className="flex items-center"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function ({ loaderData }: Route.ComponentProps) {
  const user = "user" in loaderData ? loaderData.user : undefined;
  const rootOutletContext = useOutletContext<RootOutletContext>();
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow bg-background border-r">
          <div className="h-16 flex items-center px-6 border-b">
            <Link to="/" className="flex items-center">
              <img
                src="/api/assets/autologo?background=dark"
                alt="App name"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link
              to="/signed-in"
              className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors
                ${location.pathname === "/signed-in"
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              <Home className="mr-3 h-4 w-4" />
              Home
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col md:pl-64">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-background">
          <div className="ml-auto">
            <UserMenu user={user} />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Outlet context={{ ...rootOutletContext, user } as AuthOutletContext} />
            <Toaster richColors />
          </div>
        </main>
      </div>
    </div>
  );
}

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUserIsAdmin, isSignedIn, signOutAdmin } from "@/lib/site-content.pocketbase";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    if (!isSignedIn()) throw redirect({ to: "/login" });
    try {
      const isAdmin = await getCurrentUserIsAdmin();
      if (!isAdmin) {
        signOutAdmin();
        throw redirect({ to: "/login" });
      }
    } catch (e) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});

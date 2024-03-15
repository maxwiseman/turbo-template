import { auth, signIn, signOut } from "@acme/auth";
import { Button } from "@acme/ui/button";

export async function AuthShowcase(): Promise<React.ReactElement> {
  const session = await auth();

  if (!session) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          Sign in with Discord
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- It's better to be safe then sorry */}
        {session ? <span>Logged in as {session.user.name}</span> : null}
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}

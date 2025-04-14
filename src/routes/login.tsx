import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from 'components/auth/login';
import { userQueryOptions } from 'hooks/firebase';

export const Route = createFileRoute('/login')({
  async beforeLoad({ context: { queryClient } }) {
    // Ensure the user is authenticated before loading the login page
    try {
      const { user } = await queryClient.ensureQueryData(userQueryOptions);
      
      // Only redirect if user is authenticated
      if (user) {
        throw redirect({ to: '/' });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Auth error:", error.message);
      } else {
        // This could be a redirect, just rethrow it
        throw error;
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Login />
  );
}

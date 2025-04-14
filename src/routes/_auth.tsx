import { createFileRoute, redirect } from '@tanstack/react-router';
import { userQueryOptions } from 'hooks/firebase';
import { Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  async beforeLoad({context: { queryClient }}) {
    try {
      await queryClient.ensureQueryData(userQueryOptions);
    } catch (_error) {
      throw redirect({ to: '/login' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}

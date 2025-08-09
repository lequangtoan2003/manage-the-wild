import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';

export default function Account() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </div>
  );
}

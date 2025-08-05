import supabase from './supabase';

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log('Session:', session);

  if (!session.session) {
    console.log('No active session found');
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  console.log('User data:', data?.user);

  if (error) {
    console.error('Get user error:', error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

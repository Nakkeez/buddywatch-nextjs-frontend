'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { push } = useRouter();

  const registerNewUser = async (): Promise<void> => {
    if (!username || !password) {
      toast.error('Username and password required');
    } else if (password != confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const data: FormData = new FormData();
        data.append('username', username);
        data.append('password', password);

        const response: Response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/register/`,
          {
            method: 'POST',
            body: data,
          }
        );

        const serverResponse = await response.json();

        if (response.ok) {
          console.log(serverResponse);
          toast.success('Successfully registered');
          push('/login');
        } else {
          console.error('Failed to create account', serverResponse);

          // Format error response
          const errorMessage: string = Object.keys(serverResponse)
            .map(
              (key: string): string =>
                `${key}: ${serverResponse[key].join(', ')}`
            )
            .join('\n');
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to create account');
      }
    }
  };

  return (
    <div className="w-full max-w-lg rounded-lg border bg-white p-12 shadow-xl">
      <div className="mx-auto max-w-md space-y-6">
        <h3 className="text-lg font-semibold">Register to BuddyWatch</h3>
        <div>
          <label className="block py-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border p-2 font-mono shadow ring-1 ring-inset ring-gray-300 hover:border-indigo-600"
          />
        </div>
        <div>
          <label className="block py-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2 font-mono shadow ring-1 ring-inset ring-gray-300 hover:border-indigo-600"
          />
        </div>
        <div>
          <label className="block py-1">Confirm Password</label>
          <input
            type="password"
            name="confirm password"
            placeholder="confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded border p-2 font-mono shadow ring-1 ring-inset ring-gray-300 hover:border-indigo-600"
          />
        </div>
        <div className="flex items-center justify-between gap-3 pt-3">
          <button
            onClick={registerNewUser}
            className="rounded-lg border px-4 py-2 shadow ring-1 ring-inset ring-gray-300 hover:border-indigo-600"
          >
            Register
          </button>
          <Link href="/login" className="ml-4">
            <p className="font-bold text-indigo-800">
              Login with existing account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// lib/hooks.ts
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  }).then(res => res.json());

export function useUser() {
  const { data, error } = useSWR('http://localhost:8000/api/user', fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  };
}

// lib/fetcher.ts
export async function fetcher(url: string, options?: RequestInit) {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }
  
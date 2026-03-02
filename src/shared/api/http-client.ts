export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${input}`, {
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      ...init,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);

      throw new Error(error?.message ?? `HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  get<T>(url: string) {
    return this.request<T>(url, {
      method: 'GET',
    });
  }

  post<T>(url: string, body: unknown) {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  patch<T>(url: string, body: unknown) {
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(url: string) {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  }
}

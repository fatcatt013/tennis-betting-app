import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type ApiRequestOptions = {
  [key: string]: any;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public get _baseUrl() {
    return `http://localhost:3000/api`;
  }

  private readonly DEFAULT_HEADERS: any = {
    Accept: 'application/json',
  };

  private readonly LD_HEADERS: any = {
    Accept: 'application/ld+json',
  };

  constructor(private readonly _httpClient: HttpClient) {}

  public get<T>(path: string, options?: ApiRequestOptions): Observable<T> {
    console.log('GET CALLED');
    let requestHeaders = this.DEFAULT_HEADERS;
    let requestOptions = {};

    if (options != null && options['headers'] != null) {
      const { headers, ...otherOptions } = options;
      requestHeaders = { ...headers };
      requestOptions = { ...otherOptions };
    } else {
      requestOptions = { ...options };
    }

    console.log(`${this._baseUrl}${path}`);
    return this._httpClient.get<T>(`${this._baseUrl}${path}`, {
      observe: 'body',
      responseType: 'json',
      headers: requestHeaders,
      ...requestOptions,
    });
  }

  public getFromUrl<T>(
    url: string,
    options?: ApiRequestOptions
  ): Observable<T> {
    let requestHeaders = this.LD_HEADERS;
    let requestOptions = {};

    if (options != null && options['headers'] != null) {
      const { headers, ...otherOptions } = options;
      requestHeaders = { ...headers };
      requestOptions = { ...otherOptions };
    } else {
      requestOptions = { ...options };
    }

    return this._httpClient.get<T>(`${url}`, {
      observe: 'body',
      responseType: 'json',
      headers: requestHeaders,
      ...requestOptions,
    });
  }

  public getBlob(path: string, options?: ApiRequestOptions): Observable<Blob> {
    let requestHeaders = this.DEFAULT_HEADERS;
    let requestOptions = {};

    if (options != null && options['headers'] != null) {
      const { headers, ...otherOptions } = options;
      requestHeaders = { ...headers };
      requestOptions = { ...otherOptions };
    } else {
      requestOptions = { ...options };
    }

    return this._httpClient.get(`${this._baseUrl}${path}`, {
      observe: 'body',
      responseType: 'blob',
      headers: requestHeaders,
      ...requestOptions,
    });
  }

  public post<T>(
    path: string,
    body?: any,
    options?: ApiRequestOptions
  ): Observable<T> {
    let requestHeaders = this.DEFAULT_HEADERS;
    let requestOptions = {};

    if (options != null && options['headers'] != null) {
      const { headers, ...otherOptions } = options;
      requestHeaders = { ...headers };
      requestOptions = { ...otherOptions };
    } else {
      requestOptions = { ...options };
    }

    return this._httpClient.post<T>(`${this._baseUrl}${path}`, body, {
      headers: requestHeaders,
      observe: 'body',
      responseType: 'json',
      ...requestOptions,
    });
  }

  public postToUrl<T>(
    url: string,
    body?: any,
    options?: ApiRequestOptions
  ): Observable<T> {
    let requestHeaders = this.DEFAULT_HEADERS;
    let requestOptions = {};

    if (options != null && options['headers'] != null) {
      const { headers, ...otherOptions } = options;
      requestHeaders = { ...headers };
      requestOptions = { ...otherOptions };
    } else {
      requestOptions = { ...options };
    }

    return this._httpClient.post<T>(`${url}`, body, {
      headers: requestHeaders,
      observe: 'body',
      responseType: 'json',
      ...requestOptions,
    });
  }

  public put<T>(
    path: string,
    body?: any,
    options?: ApiRequestOptions
  ): Observable<T> {
    let requestHeaders = this.DEFAULT_HEADERS;
    let requestOptions = {};

    if (options != null && options['headers'] != null) {
      const { headers, ...otherOptions } = options;
      requestHeaders = { ...headers };
      requestOptions = { ...otherOptions };
    } else {
      requestOptions = { ...options };
    }

    return this._httpClient.put<T>(`${this._baseUrl}${path}`, body, {
      headers: requestHeaders,
      observe: 'body',
      responseType: 'json',
      ...requestOptions,
    });
  }

  public delete<T>(path: string, options?: ApiRequestOptions): Observable<T> {
    let requestHeaders = this.DEFAULT_HEADERS;
    let requestOptions = {};

    if (options != null && options['headers'] != null) {
      const { headers, ...otherOptions } = options;
      requestHeaders = { ...headers };
      requestOptions = { ...otherOptions };
    } else {
      requestOptions = { ...options };
    }

    return this._httpClient.delete<T>(`${this._baseUrl}${path}`, {
      observe: 'body',
      responseType: 'json',
      headers: requestHeaders,
      ...requestOptions,
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as JsonActions from '../redux/actions/json.actions';

@Injectable({
  providedIn: 'root',
})
export class JsonLoaderService {
  constructor(
    private http: HttpClient,
    private store: Store<{ json: any }>
  ) {}

  loadJson(url: string): Observable<any> {
    this.store.dispatch(JsonActions.loadJson({ url }));
    // You can return an observable from the store if needed
    return this.store.select((state) => state.json.data);
  }

  saveJson(url: string, jsonData: any): Observable<any> {
    this.store.dispatch(JsonActions.saveJson({ url, data: jsonData }));
    // Handle response/error as needed
    return this.http.put(url, jsonData).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error saving JSON file', error);
        throw error;
      })
    );
  }

  rewriteAndSaveJson(
    url: string,
    transformFn: (data: any) => any
  ): Observable<any> {
    this.store.dispatch(JsonActions.rewriteAndSaveJson({ url, transformFn }));
    // Handle response/error as needed
    return this.http.get(url).pipe(
      transformFn((data: any) => transformFn(data)),
      catchError((error) => {
        // Handle error
        console.error('Error rewriting and saving JSON file', error);
        throw error;
      })
    );
  }
}

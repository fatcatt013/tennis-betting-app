import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonLoaderService {
  constructor(private http: HttpClient) {}

  // Method to load a JSON file from a URL
  loadJson(url: string) {
    return this.http.get(url).pipe(
      map((data: any) => {
        // Optionally transform the data if needed
        return data;
      }),
      catchError((error: any) => {
        console.error('Error loading JSON file', error);
        return throwError(error);
      })
    );
  }

  // Method to save JSON data to a file
  saveJson(url: string, jsonData: any) {
    // Assuming you have a backend endpoint to handle saving
    return this.http.put(url, jsonData).pipe(
      catchError((error: any) => {
        console.error('Error saving JSON file', error);
        return throwError(error);
      })
    );
  }

  // Method to rewrite JSON data and save it
  rewriteAndSaveJson(url: string, transformFn: (data: any) => any) {
    return this.loadJson(url).pipe(
      map((data: any) => {
        const transformedData = transformFn(data);
        return transformedData;
      }),
      catchError((error: any) => {
        console.error('Error rewriting and saving JSON file', error);
        return throwError(error);
      }),
      // Save the transformed data
      map((transformedData: any) => this.saveJson(url, transformedData))
    );
  }
}

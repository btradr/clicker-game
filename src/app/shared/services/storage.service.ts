import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  public get(key: string): any {
    try {
      return JSON.parse(window.localStorage.getItem(key) || 'null');
    } catch (err) {
      console.error('Error getting data from localStorage', err);

      return null;
    }
  }

  public set(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('Error saving to localStorage', err);
    }
  }
}

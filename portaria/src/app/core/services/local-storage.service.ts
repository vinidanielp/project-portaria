import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   *
   * @param key
   * @param value
   */
  set(key: any, value: any) {
    window.localStorage[key] = value;
    return this;
  }

  /**
   *
   * @param key
   * @param defaultValue
   */
  get(key: any, defaultValue = null) {
    return window.localStorage[key] || defaultValue;
  }

  /**
   *
   * @param key
   * @param value
   */
  setObject(key: any, value: Object) {
    window.localStorage[key] = JSON.stringify(value);
    return this;
  }

  /**
   *
   * @param key
   */
  getObject(key: any) {
    const storageKey = window.localStorage.getItem(key);
    if (storageKey !== null) {
      return JSON.parse(storageKey);
    } else {
      return null;
    }
  }

  /**
   *
   * @param key
   */
  remove(key: any) {
    window.localStorage.removeItem(key);
    return this;
  }
}

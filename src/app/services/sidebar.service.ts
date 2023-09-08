import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menuSubject = new Subject<boolean>();
  public menu$ = this.menuSubject.asObservable();

  constructor() { }

  menuActivated (menu: boolean): void {
    this.menuSubject.next(menu);
  }


}

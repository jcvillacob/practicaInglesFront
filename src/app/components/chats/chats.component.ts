import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  menu_active: boolean = true;

  constructor (private sidebarService: SidebarService) {
    this.sidebarService.menu$.subscribe(menu => {
      this.menu_active = menu;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ConversationsService } from 'src/app/services/conversations.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu_active: boolean = true;
  conversations: any[] = [];

  constructor (private sidebarSeervice: SidebarService, private conversationsService: ConversationsService) {

  }

  ngOnInit(): void {
    this.conversationsService.getConversaciones().subscribe(data => {
      this.conversations = data;
    })    
  }

  toggleMenu () {
    this.menu_active = !this.menu_active;
    this.sidebarSeervice.menuActivated(this.menu_active);
  }
}

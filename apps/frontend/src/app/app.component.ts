import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'scrum-poker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('inputUsername') inputUsername: ElementRef;

  username: string;

  users: any[] = [];

  constructor(
    private eventsService: EventsService
  ){ }

  ngOnInit(): void {

    this.getUsers();
    this.getVotes();

  }

  createUser(){
    this.username = this.inputUsername.nativeElement.value;
    this.eventsService.createUser(this.username);
  }

  getUsers(){
    this.eventsService.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  sendVote(vote: number){
    this.eventsService.sendVote(vote);
  }

  getVotes(){
    this.eventsService.getVotes().subscribe(res => {

      const user = this.users.find(user => user.id === res.user.id);
      user.vote = res.vote;

    })
  }

}

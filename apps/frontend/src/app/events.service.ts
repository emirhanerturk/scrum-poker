import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EEvents } from "@scrum-poker/shared";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private socket: Socket
  ) {}

  // USERS

  createUser(username: string) {
    this.socket.emit(EEvents.CREATE_USER, username);
  }

  getUsers(): Observable<any> {
    return this.socket.fromEvent(EEvents.USERS).pipe(map((data: any) => data));
  }

  // VOTES

  sendVote(vote: number) {
    this.socket.emit(EEvents.SEND_VOTE, vote);
  }

  getVotes(): Observable<any>  {
    return this.socket.fromEvent(EEvents.VOTES);
  }

}

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EEvents } from "@scrum-poker/shared";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  clients: object = {};

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(EEvents.CREATE_USER)
  createUser(@ConnectedSocket() client: Socket, @MessageBody() username: string): void {
    this.clients[client.id] = { id: client.id, name: username };
    const users = this.getUsers();
    this.server.emit(EEvents.USERS, users);
  }

  @SubscribeMessage(EEvents.SEND_VOTE)
  sendVote(@ConnectedSocket() client: Socket, @MessageBody() vote: number): void {
    const user = this.getUser(client.id);
    this.server.emit(EEvents.VOTES, { user, vote });
  }

  afterInit(server: Server) {
    console.log('Gateway init.');
  }

  handleDisconnect(client: Socket) {
    if (this.clients[client.id]) delete this.clients[client.id];
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  getUser(id: string): object {
    return this.clients[id];
  }

  getUsers(): any[] {
    return Object.values(this.clients);
  }

}

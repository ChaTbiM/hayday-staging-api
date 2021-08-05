import { UseInterceptors } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { SocketInterceptor } from './socket.interceptor';

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) { }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const roomId = client.handshake.auth.roomId;
    client.join(`room-${roomId}`);
  }

  @UseInterceptors(new SocketInterceptor())
  @SubscribeMessage("message")
  handleMessage(client: Socket, data: string) {
    const roomId = `room-${client.data.roomId}`
    client.in(roomId).emit("message", data);
  }

}

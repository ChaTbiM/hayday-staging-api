import { UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import MessageDto from './dto/message.dto';
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
  async handleMessage(client: Socket, message: MessageDto) {
    const roomId = `room-${client.data.roomId}`
    client.to(roomId).emit("message", message);
    await this.chatService.saveMessage(message)
  }

}

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class SocketInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const socket = context.switchToWs().getClient() as Socket;
    const roomId = socket.handshake.auth.roomId;
    socket.data = { ...socket.data , roomId }
    return next.handle();
  }
}

import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';



@UseGuards(JwtAuthGuard)
@Controller('message')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

}

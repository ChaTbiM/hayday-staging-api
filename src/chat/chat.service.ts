import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MessageDto from './dto/message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {

  }

  async saveMessage(messageDto: MessageDto) {
    const message = await this.messagesRepository.save({ ...messageDto })
    const messageWithUser = await this.messagesRepository.findOneOrFail({ id: message.id }, { relations: ["from"] })
    return messageWithUser
  }

  async getProjectMessage(projectId) {
    const messages = await this.messagesRepository.find({ relations: ["from"], where: { projectId } })
    return messages;
  }
}

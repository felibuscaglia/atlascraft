import { Body, Controller, Post } from '@nestjs/common';
import { InviteColaboratorDto } from './dto';
import { CollaboratorsService } from './collaborators.service';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  inviteCollaborator(@Body() inviteCollaboratorDto: InviteColaboratorDto) {
    return this.collaboratorsService.invite(
      inviteCollaboratorDto.mapId,
      inviteCollaboratorDto.email,
    );
  }
}

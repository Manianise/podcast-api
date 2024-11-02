import { Controller, Post } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
    @Get()
    findAll() {
        return 'all episodes'
    }
    @Post() {
        create() {
            return 'create new episode'
        }
    }
}

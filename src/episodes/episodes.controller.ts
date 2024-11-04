import { Controller, Get, Post, Param, Query, Body, NotFoundException, ParseIntPipe, DefaultValuePipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { IsPositivePipe } from 'src/is-positive/is-positive.pipe';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';

@Controller('episodes')
export class EpisodesController {

    constructor(private episodesService: EpisodesService) {} 

    @Get()
    findAll(
      @Query('sort') sort: 'asc' | 'desc' = 'desc',
      @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number,
    ) {
        console.log(sort);
        
        return this.episodesService.findAll(sort)
    }

    @Get('featured')
    findFeatured() {
        return this.episodesService.findFeatured()
    }

    @Get(':id')
      async findOne(@Param('id') id: string) {
        console.log(id);
        const episode = await this.episodesService.findOne(id)
        if(!episode) {
          throw new NotFoundException('Episode not found')
        }
        return episode;
        
      }
      
    @UseGuards(ApiKeyGuard)
    @Post()
        create(@Body(ValidationPipe) input: CreateEpisodeDto) {
            return this.episodesService.create(input)
        }
}


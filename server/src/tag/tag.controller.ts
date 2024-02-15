import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TagService} from './tag.service';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findAll() {
        return this.tagService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }
}

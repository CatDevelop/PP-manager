import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe} from '@nestjs/common';
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
    findAll() {
        return this.tagService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }
}

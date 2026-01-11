import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/tenant-client';

@Controller('pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    @Get()
    findAll() {
        return this.pagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pagesService.findOne(id);
    }

    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string) {
        return this.pagesService.findBySlug(slug);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.EDITOR)
    @Post()
    create(@Body() createPageDto: CreatePageDto) {
        return this.pagesService.create(createPageDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.EDITOR)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
        return this.pagesService.update(id, updatePageDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.EDITOR)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pagesService.remove(id);
    }
}

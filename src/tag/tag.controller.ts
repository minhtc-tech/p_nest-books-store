import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, EditTagDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiOperation({ summary: 'Get all tags data' })
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All tags information',
  })
  getTags() {
    return this.tagService.getTags();
  }

  @ApiOperation({ summary: 'Create tag by name' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The tag information',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Tag taken',
  })
  @Post()
  createTag(@Body() dto: CreateTagDto) {
    return this.tagService.createTag(dto.name);
  }

  @ApiOperation({ summary: 'Edit tag by name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The tag information',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Tag taken',
  })
  @Patch(':id')
  editTagById(
    @Param('id', ParseIntPipe) tagId: number,
    @Body() dto: EditTagDto,
  ) {
    return this.tagService.editTagById(tagId, dto.name);
  }
}

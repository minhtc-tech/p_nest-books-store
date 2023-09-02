import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagRepository {
  constructor(private prisma: PrismaService) {}

  async getAllTag(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }

  async createTag(name: string): Promise<Tag> {
    return this.prisma.tag.create({
      data: {
        name,
      },
    });
  }

  async editTagById(tagId: number, name: string): Promise<Tag> {
    return this.prisma.tag.update({
      where: {
        id: tagId,
      },
      data: {
        name,
      },
    });
  }

  async getTagByName(name: string): Promise<Tag> {
    return this.prisma.tag.findUnique({
      where: {
        name,
      },
    });
  }
}

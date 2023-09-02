import { ForbiddenException, Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private repository: TagRepository) {}

  async getTags() {
    return this.repository.getAllTag();
  }

  async createTag(name: string) {
    await this.checkTagExist(name);
    return this.repository.createTag(name);
  }

  async editTagById(tagId: number, name: string) {
    await this.checkTagExist(name);
    return this.repository.editTagById(tagId, name);
  }

  async checkTagExist(name: string) {
    const isTagExist = await this.repository.getTagByName(name);
    if (isTagExist) throw new ForbiddenException('Tag taken');
  }
}

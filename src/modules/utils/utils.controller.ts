import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadBase64 } from './dto/utils-dto';

@ApiTags('Utils')
@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Post('file-upload-base64')
  create(@Body() body: FileUploadBase64) {
    return this.utilsService.fileUploadBase64(body.filename, body.attachment);
  }

  // @Get()
  // findAll() {
  //   return this.utilsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.utilsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUtilDto: UpdateUtilDto) {
  //   return this.utilsService.update(+id, updateUtilDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.utilsService.remove(+id);
  // }
}

import {Body, Controller, Delete, Get, Param, Put, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 회원 조회 */
  @ApiBearerAuth("authentication")
  @ApiOperation({
    summary: '회원 조회',
    description: '회원 조회 API',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 아이디',
    example: 'manyson'
  })
  @ApiOkResponse({ description: '성공',})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /** 회원 수정  */
  @ApiBearerAuth("authentication")
  @ApiOperation({
    summary: '회원 수정',
    description: '회원 수정 API',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 아이디',
    example: 'manyson'
  })
  @ApiOkResponse({ description: '성공',})
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /** 회원 삭제  */
  @ApiBearerAuth("authentication")
  @ApiOperation({
    summary: '회원 삭제',
    description: '회원 삭제 API',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 아이디',
    example: 'manyson'
  })
  @ApiOkResponse({ description: '성공',})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

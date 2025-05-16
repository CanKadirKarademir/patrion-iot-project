import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'database';

import { Repository } from 'typeorm';
import * as moment from 'moment';
import {
  CreateUserInput,
  CreateUserPayload,
  DeleteUserPayload,
  ListAllUserPayload,
  RoleBasedQueryParameter,
  UpdateUserInput,
  UpdateUserPayload,
} from 'models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async listAllUsers(
    roleBasedQueryParam: RoleBasedQueryParameter,
  ): Promise<ListAllUserPayload[]> {
    const users = await this._userRepository.find({
      where: {
        companyUsers: {
          companyId: roleBasedQueryParam.companyId,
        },
      },
      relations: {
        companyUsers: true,
      },
    });

    if (!users) {
      throw new NotFoundException('No users found');
    }

    return users.map((user) => ({
      ...user,
      createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(user.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    }));
  }
  async createUpdate(createInput: CreateUserInput): Promise<CreateUserPayload> {
    const isUserExist = await this._userRepository.exists({
      where: { email: createInput.email },
    });

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }
    const user = this._userRepository.create(createInput);

    const savedUser = await this._userRepository.save(user);

    if (!savedUser) {
      throw new BadRequestException('Failed to create user');
    }

    return savedUser;
  }

  async updateUser(updateInput: UpdateUserInput): Promise<UpdateUserPayload> {
    const user = await this._userRepository.findOne({
      where: { id: updateInput.id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this._userRepository.update(
      {
        id: updateInput.id,
      },
      {
        ...updateInput,
      },
    );

    if (!updatedUser) {
      throw new BadRequestException('Failed to update user');
    }

    return { id: updateInput.id, ...updatedUser };
  }

  async delete(id: string): Promise<DeleteUserPayload> {
    const user = await this._userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this._userRepository.softDelete({ id: id });

    if (!deletedUser) {
      throw new BadRequestException('Failed to delete user');
    }
    return { id: id };
  }
}

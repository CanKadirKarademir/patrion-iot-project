import { map } from 'rxjs/operators';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyUserEntity } from 'database';
import {
  CreateCompanyUserInput,
  CreateCompanyUserPayload,
  DeleteCompanyUserPayload,
  ListAllCompanyUserInput,
  ListAllCompanyUserPayload,
} from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyUserService {
  constructor(
    @InjectRepository(CompanyUserEntity)
    private readonly _companyUserRepository: Repository<CompanyUserEntity>,
  ) {}

  async findAll(
    ListInput: ListAllCompanyUserInput,
  ): Promise<ListAllCompanyUserPayload[]> {
    return (
      await this._companyUserRepository.find({
        where: {
          companyId: ListInput.companyId,
        },
        relations: {
          company: true,
          user: true,
        },
        select: {
          company: {
            id: true,
            name: true,
          },
          user: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
      })
    ).map((companyUser) => ({
      id: companyUser.id,
      companyId: companyUser.company.id,
      userId: companyUser.user.id,
      companyName: companyUser.company.name,
      userFirstName: companyUser.user.firstName,
      userLastName: companyUser.user.lastName,
      userEmail: companyUser.user.email,
      role: companyUser.user.role,
    }));
  }

  async createCompanyUser(
    createInput: CreateCompanyUserInput,
  ): Promise<CreateCompanyUserPayload> {
    const companyUser = this._companyUserRepository.create({
      company: { id: createInput.companyId },
      user: { id: createInput.userId },
    });
    const savedCompanyUser = await this._companyUserRepository.save(
      companyUser,
    );
    if (!savedCompanyUser) {
      throw new BadRequestException('Failed to create company user');
    }
    return savedCompanyUser;
  }

  async delete(id: string): Promise<DeleteCompanyUserPayload> {
    const companyUser = await this._companyUserRepository.findOne({
      where: { id: id },
    });
    if (!companyUser) {
      throw new BadRequestException('Company user not found');
    }
    const deletedCompanyUser = await this._companyUserRepository.softDelete({
      id: id,
    });
    if (!deletedCompanyUser) {
      throw new BadRequestException('Failed to delete company user');
    }
    return { id: id };
  }
}

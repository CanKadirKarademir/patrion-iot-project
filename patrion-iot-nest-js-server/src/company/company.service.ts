import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'database';
import {
  CreateCompanyInput,
  CreateCompanyPayload,
  DeleteComnpanyPayload,
  ListAllCompanyPayload,
  UpdateCompanyInput,
  UpdateCompanyPayload,
} from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly _companyRepository: Repository<CompanyEntity>,
  ) {}

  async listAll(): Promise<ListAllCompanyPayload[]> {
    const companies = await this._companyRepository.find({});

    if (!companies) {
      throw new Error('No companies found');
    }

    return companies.map((company) => ({
      ...company,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
    }));
  }

  async createCompany(
    createInput: CreateCompanyInput,
  ): Promise<CreateCompanyPayload> {
    const company = this._companyRepository.create(createInput);
    const savedCompany = this._companyRepository.save(company);

    if (!savedCompany) {
      throw new BadRequestException('Failed to create company');
    }
    return savedCompany;
  }

  async updateCompany(
    updateInput: UpdateCompanyInput,
  ): Promise<UpdateCompanyPayload> {
    const company = await this._companyRepository.findOne({
      where: { id: updateInput.id },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const updatedCompany = this._companyRepository.update(
      { id: updateInput.id },
      { ...updateInput },
    );
    if (!updatedCompany) {
      throw new BadRequestException('Failed to update company');
    }
    return { id: updateInput.id };
  }

  async delete(id: string): Promise<DeleteComnpanyPayload> {
    const company = await this._companyRepository.findOne({
      where: { id },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const deletedCompany = await this._companyRepository.softDelete({ id });

    if (!deletedCompany) {
      throw new BadRequestException('Failed to delete company');
    }

    return { id: id };
  }
}

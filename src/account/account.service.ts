import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
  ) { }

  getAccountByUuid(uuid: string): Promise<AccountEntity> {
    const whereStatement: string = `uuid='${uuid}'`;
    return this.accountsRepository.findOne({ where: whereStatement });
  }

  createAccount(account: AccountEntity): Promise<AccountEntity> {
    return this.accountsRepository.save(account);
  }

  getAccountByEmailAndHashedPassword(email: string, hashedPassword: string): Promise<AccountEntity> {
    const whereStatement: string = `email='${email}' AND hashed_password='${hashedPassword}'`;
    return this.accountsRepository.findOne({ where: whereStatement });
  }
}

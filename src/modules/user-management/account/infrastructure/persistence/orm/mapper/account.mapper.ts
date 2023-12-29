import {
  AccountDatabaseModel,
  AccountDatabaseSchema,
} from './../schema/account.schema';
import { AccountEntity } from '@src/modules/user-management/account/domain/account.entity';
import { AccountResponseDto } from '@src/modules/user-management/account/presenter/dto/account.dto';
import { AccountMapper } from './account.mapper.port';

export class AccountMapperImpl extends AccountMapper {
  toPersistence(entity: AccountEntity): AccountDatabaseModel {
    const copy = entity.getProps();
    const record: AccountDatabaseModel = {
      id: entity.id,
      email: copy.email,
      password: copy.password,
      updatedAt: copy.updatedAt,
      createdAt: copy.createdAt,
    };
    return AccountDatabaseSchema.parse(record);
  }

  toDomain(record: AccountDatabaseModel): AccountEntity {
    const account = new AccountEntity({
      id: record.id,
      props: {
        email: record.email,
        password: record.password,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    return account;
  }

  toResponse(entity: AccountEntity): AccountResponseDto {
    const props = entity.getProps();
    const response = new AccountResponseDto({
      id: entity.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
    response.email = props.email;
    return response;
  }
}

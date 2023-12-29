import { AggregateRoot } from '@src/libs/ddd';
import { AccountProps, CreateAccountProps } from './account.types';
import { v4 as uuidv4 } from 'uuid';
import { AccountCreatedEvent } from './events/account-created.event';
import { AccountUpdatedEvent } from './events/account-updated.event';
import { UserErrors } from './user.errors';

export class AccountEntity extends AggregateRoot<AccountProps> {
  protected _id: string;

  static create(props: CreateAccountProps) {
    const id = uuidv4();
    const account = new AccountEntity({
      id,
      props: {
        email: props.email,
        password: props.password,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    account.addEvent(
      new AccountCreatedEvent({
        email: props.email,
        accountId: id,
        aggregateId: id,
      }),
    );

    return account;
  }

  updateEmail(email: string) {
    this.props.email = email;
    this.addEvent(
      new AccountUpdatedEvent({
        email,
        accountId: this.id,
        aggregateId: this.id,
      }),
    );
  }

  updatePassword(password: string) {
    this.props.password = password;
  }

  emailCanBeUsedForRegistration() {
    throw UserErrors.EmailAlreadyInUse();
  }

  public validate(): void {
    // do some validation
  }
}

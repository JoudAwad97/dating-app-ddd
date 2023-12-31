import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class ReportCreatedEvent extends DomainEvent {
  public readonly sourceProfileId: string;
  public readonly targetProfileId: string;

  constructor(props: DomainEventProps<ReportCreatedEvent>) {
    super(props);
    this.sourceProfileId = props.sourceProfileId;
    this.targetProfileId = props.targetProfileId;
  }
}

import {
  IntegrationEvent,
  IntegrationEventProps,
} from '@src/libs/application/integration/integration-event.base';

export class ReportCreatedIntegrationEvent extends IntegrationEvent {
  public readonly sourceProfileId: string;
  public readonly targetProfileId: string;

  constructor(props: IntegrationEventProps<ReportCreatedIntegrationEvent>) {
    super(props, 'ReportCreatedIntegrationEvent');
    this.sourceProfileId = props.sourceProfileId;
    this.targetProfileId = props.targetProfileId;
  }
}

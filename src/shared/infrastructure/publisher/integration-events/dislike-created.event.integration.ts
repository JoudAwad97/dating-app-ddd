import {
  IntegrationEvent,
  IntegrationEventProps,
} from '@src/libs/application/integration/integration-event.base';

export class DislikeCreatedIntegrationEvent extends IntegrationEvent {
  public readonly sourceProfileId: string;
  public readonly targetProfileId: string;

  constructor(props: IntegrationEventProps<DislikeCreatedIntegrationEvent>) {
    super(props, 'DislikeCreatedIntegrationEvent');
    this.sourceProfileId = props.sourceProfileId;
    this.targetProfileId = props.targetProfileId;
  }
}

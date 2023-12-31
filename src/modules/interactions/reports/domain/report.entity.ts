import { AggregateRoot } from '@src/libs/ddd';
import { CreateReportProps, ReportProps } from './report.types';
import { v4 as uuidv4 } from 'uuid';
import { ReportErrors } from './report.errors';
import { ReportCreatedEvent } from './event/report-created.event';

export class ReportEntity extends AggregateRoot<ReportProps> {
  protected _id: string;

  static create(props: CreateReportProps): ReportEntity {
    const id = uuidv4();

    const report = new ReportEntity({
      id,
      props: {
        sourceProfileId: props.sourceProfileId,
        targetProfileId: props.targetProfileId,
        reason: props.reason,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    report.addEvent(
      new ReportCreatedEvent({
        aggregateId: id,
        sourceProfileId: props.sourceProfileId,
        targetProfileId: props.targetProfileId,
      }),
    );

    return report;
  }

  public validate(): void {
    if (this.getProps().sourceProfileId === this.getProps().targetProfileId) {
      throw ReportErrors.CanNotReportYourSelf();
    }
  }
}

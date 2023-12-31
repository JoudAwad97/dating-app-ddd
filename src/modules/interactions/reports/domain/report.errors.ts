import { ConflictException } from '@nestjs/common';

export class ReportErrors {
  static InvalidReport(): Error {
    return new ConflictException(`Invalid report`);
  }

  static CanNotReportYourSelf(): Error {
    return new ConflictException(`Can not report yourself`);
  }
}

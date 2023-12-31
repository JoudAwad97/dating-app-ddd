import { Mapper } from '@src/libs/ddd';
import { ReportEntity } from '@src/modules/interactions/reports/domain/report.entity';
import { ReportDatabaseModel } from '../schema/report.schema';
import { ReportResponseDto } from '@src/modules/interactions/reports/presenter/dto/report.dto';

export abstract class ReportMapper extends Mapper<
  ReportEntity,
  ReportDatabaseModel,
  ReportResponseDto
> {}

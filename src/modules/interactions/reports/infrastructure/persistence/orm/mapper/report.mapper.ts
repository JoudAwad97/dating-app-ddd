import { Injectable } from '@nestjs/common';
import { ReportMapper } from './report.mapper.port';
import { ReportEntity } from '@src/modules/interactions/reports/domain/report.entity';
import { ReportResponseDto } from '@src/modules/interactions/reports/presenter/dto/report.dto';
import {
  ReportDatabaseModel,
  ReportDatabaseSchema,
} from '../schema/report.schema';

@Injectable()
export class ReportMapperImpl extends ReportMapper {
  toPersistence(entity: ReportEntity): ReportDatabaseModel {
    const copy = entity.getProps();
    const record: ReportDatabaseModel = {
      id: copy.id,
      reason: copy.reason,
      sourceProfileId: copy.sourceProfileId,
      targetProfileId: copy.targetProfileId,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };

    return ReportDatabaseSchema.parse(record);
  }

  toDomain(record: ReportDatabaseModel): ReportEntity {
    const report = new ReportEntity({
      id: record.id,
      props: {
        reason: record.reason,
        sourceProfileId: record.sourceProfileId,
        targetProfileId: record.targetProfileId,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    return report;
  }

  toResponse(entity: ReportEntity): ReportResponseDto {
    const props = entity.getProps();
    const response = new ReportResponseDto({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    response.reason = props.reason;
    response.sourceProfileId = props.sourceProfileId;
    response.targetProfileId = props.targetProfileId;
    return response;
  }
}

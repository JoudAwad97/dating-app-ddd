import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ReportResponseDto } from '../dto/report.dto';
import { ReportApplicationService } from '../../application/port/report.application.service.port';
import { CreateReportDto } from '../dto/create-report.dto';

@Resolver(() => ReportResponseDto)
export class ReportResolver {
  constructor(
    private readonly reportApplicationService: ReportApplicationService,
  ) {}

  @Mutation(() => ReportResponseDto)
  async reportProfile(
    @Args('input') input: CreateReportDto,
  ): Promise<ReportResponseDto> {
    return this.reportApplicationService.reportProfile(input);
  }
}

import { CreateReportDto } from '../../presenter/dto/create-report.dto';
import { ReportResponseDto } from '../../presenter/dto/report.dto';

export abstract class ReportApplicationService {
  abstract reportProfile(input: CreateReportDto): Promise<ReportResponseDto>;
}

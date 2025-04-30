export class CreateProjectDto {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  clientId: string;
}

export class UpdateProjectDto {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  clientId?: string;
}

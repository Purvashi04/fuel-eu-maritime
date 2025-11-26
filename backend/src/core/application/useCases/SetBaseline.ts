import { RouteRepositoryPort } from "../../ports/RouteRepositoryPort";

export class SetBaseline {
  constructor(private readonly routeRepo: RouteRepositoryPort) {}

  async execute(id: number): Promise<void> {
    await this.routeRepo.setBaseline(id);
  }
}

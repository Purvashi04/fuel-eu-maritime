import { PoolingServicePort } from "../../../core/ports/PoolingServicePort";
import { PoolMember, PoolMemberInput } from "../../../core/domain/pooling";
import { http } from "./httpClient";

export class PoolingServiceHttp implements PoolingServicePort {
  async createPool(year: number, members: PoolMemberInput[]): Promise<PoolMember[]> {
    const res = await http.post<PoolMember[]>("/pools", { year, members });
    return res.data;
  }
}

import { useEffect, useState } from "react";
import { Route } from "../../../core/domain/route";
import { RouteServiceHttp } from "../../infrastructure/api/RouteServiceHttp";

const service = new RouteServiceHttp();

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    vesselType: "",
    fuelType: "",
    year: ""
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.fetchRoutes();
      setRoutes(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filteredRoutes = routes.filter((r) => {
    return (
      (!filters.vesselType || r.vesselType === filters.vesselType) &&
      (!filters.fuelType || r.fuelType === filters.fuelType) &&
      (!filters.year || r.year.toString() === filters.year)
    );
  });

  const setBaseline = async (id: number) => {
    await service.setBaseline(id);
    await load();
  };

  return { routes: filteredRoutes, loading, error, filters, setFilters, setBaseline };
}

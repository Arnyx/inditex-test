import { MockInditexDatasource } from "../datasources/MockInditexDatasource";
import { InditexRepositoryImpl } from "../repositories/InditexRepositoryImpl";

export const createInditexRepository = () => {
  const datasource = new MockInditexDatasource();
  return new InditexRepositoryImpl(datasource);
};

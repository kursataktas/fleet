/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import sendRequest from "services";
import endpoints from "utilities/endpoints";
import { IOperatingSystemVersion } from "interfaces/operating_system";
import { OsqueryPlatform } from "interfaces/platform";
import { buildQueryStringFromParams } from "utilities/url";
import { createMockOSVersionsResponse } from "__mocks__/operatingSystemsMock";

// TODO: add platforms to this constant as new ones are supported
export const OS_VERSIONS_API_SUPPORTED_PLATFORMS = [
  "darwin",
  "windows",
  "chrome",
];

export interface IGetOSVersionsQueryParams {
  platform?: OsqueryPlatform;
  teamId?: number;
  os_name?: string;
  os_version?: string;
  order_key?: string;
  order_direction?: string;
  page?: number;
  per_page?: number;
}

export interface IGetOSVersionsQueryKey extends IGetOSVersionsQueryParams {
  scope: string;
}

export interface IOSVersionsResponse {
  count: number;
  counts_updated_at: string;
  os_versions: IOperatingSystemVersion[];
  meta: {
    has_next_results: boolean;
    has_previous_results: boolean;
  };
}

export const getOSVersions = ({
  platform,
  teamId,
  os_name,
  os_version,
  order_key,
  order_direction,
  page,
  per_page,
}: IGetOSVersionsQueryParams = {}): Promise<IOSVersionsResponse> => {
  const { OS_VERSIONS } = endpoints;
  let path = OS_VERSIONS;

  const queryString = buildQueryStringFromParams({
    platform,
    team_id: teamId,
    os_name,
    os_version,
    order_key,
    order_direction,
    page,
    per_page,
  });

  if (queryString) path += `?${queryString}`;

  // return sendRequest("GET", path); // TODO: API INTEGRATION: uncomment when API is ready
  return new Promise((resolve, reject) => {
    resolve(createMockOSVersionsResponse());
  });
};

export default {
  getOSVersions,
};

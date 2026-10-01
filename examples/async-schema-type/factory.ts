import type { ILicense } from "./License";
import type { IOrganization } from "./Organization";
import type { IPhoto } from "./Photo";
import type { IUser } from "./User";

function photoFactory({
  value: nullableValue,
}: {
  entity: "photo";
  value?: Partial<IPhoto>;
}): IPhoto {
  const value = nullableValue ?? {};
  const photo: IPhoto = {
    description: value.description ?? "",
    height: value.height ?? 240,
    id: value.id ?? 0,
    title: value.title ?? "",
    width: value.width ?? 320,
  };

  return photo;
}

function userFactory({
  value: nullableValue,
}: {
  entity: "user";
  value?: Partial<IUser>;
}): IUser {
  const value = nullableValue ?? {};
  const user: IUser = {
    firstName: value.firstName ?? "",
    id: value.id ?? 0,
    isActive: value.isActive ?? true,
    lastName: value.lastName ?? "",
  };

  return user;
}

function organizationFactory({
  value: nullableValue,
}: {
  entity: "organization";
  value?: Partial<IOrganization>;
}): IOrganization {
  const value = nullableValue ?? {};

  const organization: IOrganization = {
    description: value.description ?? "",
    expire: value.expire ?? new Date(),
    id: value.id ?? 0,
    title: value.title ?? "",
  };

  return organization;
}

function licenseFactory({
  value: nullableValue,
}: {
  entity: "license";
  value?: Partial<ILicense>;
}): ILicense {
  const value = nullableValue ?? {};

  const license: ILicense = {
    code: value.code ?? "",
    description: value.description ?? "",
    expire: value.expire ?? new Date(),
    id: value.id ?? 0,
    title: value.title ?? "",
  };

  return license;
}

type TFactoryAction =
  | Parameters<typeof licenseFactory>[0]
  | Parameters<typeof organizationFactory>[0]
  | Parameters<typeof userFactory>[0]
  | Parameters<typeof photoFactory>[0];

function factory(action: Parameters<typeof userFactory>[0]): IUser;
function factory(action: Parameters<typeof photoFactory>[0]): IPhoto;
function factory(
  action: Parameters<typeof organizationFactory>[0]
): IOrganization;
function factory(action: Parameters<typeof licenseFactory>[0]): ILicense;
function factory(action: TFactoryAction) {
  if (action.entity === "user") {
    return userFactory(action);
  }

  if (action.entity === "organization") {
    return organizationFactory(action);
  }

  if (action.entity === "license") {
    return licenseFactory(action);
  }

  if (action.entity === "photo") {
    return photoFactory(action);
  }

  throw new Error(
    `unknown error raised from factory entity: ${JSON.stringify(action)}`
  );
}

export default factory;

import type { ILicense } from './License';
import type { IOrganization } from './Organization';
import type { IPhoto } from './Photo';
import type { IUser } from './User';

function photoFactory({ value: nullableValue }: { entity: 'photo'; value?: Partial<IPhoto> }): IPhoto {
  const value = nullableValue ?? {};
  const photo: IPhoto = {
    id: value.id ?? 0,
    title: value.title ?? '',
    description: value.description ?? '',
    width: value.width ?? 320,
    height: value.height ?? 240,
  };

  return photo;
}

function userFactory({ value: nullableValue }: { entity: 'user'; value?: Partial<IUser> }): IUser {
  const value = nullableValue ?? {};
  const user: IUser = {
    id: value.id ?? 0,
    firstName: value.firstName ?? '',
    lastName: value.lastName ?? '',
    isActive: value.isActive ?? true,
  };

  return user;
}

function organizationFactory({
  value: nullableValue,
}: {
  entity: 'organization';
  value?: Partial<IOrganization>;
}): IOrganization {
  const value = nullableValue ?? {};

  const organization: IOrganization = {
    id: value.id ?? 0,
    title: value.title ?? '',
    description: value.description ?? '',
    supports: [{ name: 'ironman', year: 1970 }],
    expire: value.expire ?? new Date(),
  };

  return organization;
}

function licenseFactory({ value: nullableValue }: { entity: 'license'; value?: Partial<ILicense> }): ILicense {
  const value = nullableValue ?? {};

  const license: ILicense = {
    id: value.id ?? 0,
    code: value.code ?? '',
    title: value.title ?? '',
    description: value.description ?? '',
    weight: 0.3,
    expire: value.expire ?? new Date(),
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
function factory(action: Parameters<typeof organizationFactory>[0]): IOrganization;
function factory(action: Parameters<typeof licenseFactory>[0]): ILicense;
function factory(action: TFactoryAction) {
  if (action.entity === 'user') {
    return userFactory(action);
  }

  if (action.entity === 'organization') {
    return organizationFactory(action);
  }

  if (action.entity === 'license') {
    return licenseFactory(action);
  }

  if (action.entity === 'photo') {
    return photoFactory(action);
  }

  throw new Error(`unknown error raised from factory entity: ${JSON.stringify(action)}`);
}

export default factory;

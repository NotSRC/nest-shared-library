import { UserRole } from '../user/src';
import { Permissions } from './permission.constant';

const getAllPermissions = (permissions: { [key: string]: any }, accum = []) => {
  const permKeys = Object.keys(permissions);
  return permKeys?.reduce((acc: string[], key: string) => {
    if (typeof permissions[key] === 'string') {
      acc.push(permissions[key]);
    } else {
      getAllPermissions(permissions[key], acc);
    }
    return acc;
  }, accum);
};

const allPermissions = [...getAllPermissions(Permissions)];

const RootPermissions = ['*'];

const TenantPermissions = [
  Permissions.viewProfile,
  Permissions.sr.create,
  Permissions.sr.editItem,
  Permissions.sr.viewItem,
  Permissions.sr.viewList,
  Permissions.sr.createField.title,
  Permissions.sr.createField.urgency,
  Permissions.sr.createField.location,
  Permissions.sr.createField.description,
];

const WorkerPermissions = [...allPermissions];

const FacilityPermissions = [...allPermissions];

const MemberPermissions = [...allPermissions];

const SalesPermissions = [...allPermissions];

export const PermissionByRoles = {
  [UserRole.Root]: RootPermissions,
  [UserRole.Tenant]: TenantPermissions,
  [UserRole.Worker]: WorkerPermissions,
  [UserRole.Facility]: FacilityPermissions,
  [UserRole.Member]: MemberPermissions,
  [UserRole.Sales]: SalesPermissions,
};

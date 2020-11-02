import { UserRole } from '../user/src';
import { Permissions } from './permission.constant';

const RootPermissions = ['*'];

const allRoles = [
  Permissions.sr.create,
  Permissions.sr.editItem,
  Permissions.sr.viewItem,
  Permissions.sr.viewList,
  Permissions.sr.setExpectedDate,
];

const TenantPermissions = [
  Permissions.sr.create,
  Permissions.sr.editItem,
  Permissions.sr.viewItem,
  Permissions.sr.viewList,
];

const WorkerPermissions = [...allRoles];

const FacilityPermissions = [...allRoles];

const MemberPermissions = [...allRoles];

const SalesPermissions = [...allRoles];

export const PermissionByRoles = {
  [UserRole.Root]: RootPermissions,
  [UserRole.Tenant]: TenantPermissions,
  [UserRole.Worker]: WorkerPermissions,
  [UserRole.Facility]: FacilityPermissions,
  [UserRole.Member]: MemberPermissions,
  [UserRole.Sales]: SalesPermissions,
};

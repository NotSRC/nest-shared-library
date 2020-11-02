import { UserRole } from '../user/src';
import { Permissions } from './permission.constant';

const RootPermissions = ['*'];

const TenantPermissions = [Permissions.sr.create];

const WorkerPermissions = [Permissions.sr.create];

const FacilityPermissions = [Permissions.sr.create];

const MemberPermissions = [Permissions.sr.create];

const SalesPermissions = [Permissions.sr.create];

export const PermissionByRoles = {
  [UserRole.Root]: RootPermissions,
  [UserRole.Tenant]: TenantPermissions,
  [UserRole.Worker]: WorkerPermissions,
  [UserRole.Facility]: FacilityPermissions,
  [UserRole.Member]: MemberPermissions,
  [UserRole.Sales]: SalesPermissions,
};

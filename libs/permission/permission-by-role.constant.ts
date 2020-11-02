import { UserRole } from '../user/src';
import { Permissions } from './permission.constant';

const RootPermissions = ['*'];

const TenantPermissions = [Permissions.sr.create];

const WorkerPermissions = [];

const FacilityPermissions = [];

const MemberPermissions = [];

const SalesPermissions = [];

export const PermissionByRoles = {
  [UserRole.Root]: RootPermissions,
  [UserRole.Tenant]: TenantPermissions,
  [UserRole.Worker]: WorkerPermissions,
  [UserRole.Facility]: FacilityPermissions,
  [UserRole.Member]: MemberPermissions,
  [UserRole.Sales]: SalesPermissions,
};

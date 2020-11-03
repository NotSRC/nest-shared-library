import { UserRole } from '../user/src';
import { Permissions } from './permission.constant';

const getCrudPermission = (key: string) => {
  return [
    Permissions[key].create,
    Permissions[key].editItem,
    Permissions[key].viewItem,
    Permissions[key].viewList,
  ];
};

const allPermissions = [
  Permissions.viewProfile,
  Permissions.sr.setExpectedDate,
  Permissions.sr.changeStatus,
  ...getCrudPermission('sr'),
  ...getCrudPermission('wo'),
  Permissions.wo.changeStatus,
  ...getCrudPermission('employee'),
  ...getCrudPermission('tenant'),
];

const RootPermissions = ['*'];

const TenantPermissions = [
  Permissions.viewProfile,
  Permissions.sr.create,
  Permissions.sr.editItem,
  Permissions.sr.viewItem,
  Permissions.sr.viewList,
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

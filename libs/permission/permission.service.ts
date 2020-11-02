import { Injectable } from '@nestjs/common';
import { UserRole } from '../user/src';
import { PermissionByRoles } from './permission-by-role.constant';

@Injectable()
export class PermissionService {
  getPermissions(role: UserRole) {
    return PermissionByRoles[role];
  }
}

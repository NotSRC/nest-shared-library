export const Permissions = {
  viewProfile: 'viewProfile',
  changePassword: 'changePassword',
  sr: {
    create: 'createSr',
    viewList: 'viewSrList',
    viewItem: 'viewSrItem',
    editItem: 'editSrItem',
    changeStatus: 'changeSrStatus',
    comments: {
      view: 'canViewSrComments',
    },
    createField: {
      expectedDate: 'canSetExpectedData',
      description: 'canSetDescription',
      attachments: 'canSetAttachments',
      location: 'canSetLocation',
      urgency: 'canSetUrgency',
      title: 'canSetTitle',
    },
    showField: {
      creationDate: 'canViewCreationDate',
      expectedDate: 'canViewExpectedData',
      attachments: 'canViewAttachments',
      description: 'canViewDescription',
      createdBy: 'canViewCreatedBy',
      reporter: 'canViewReporter',
      location: 'canViewLocation',
      urgency: 'canViewUrgency',
      status: 'canViewStatus',
      title: 'canViewTitle',
    },
    editField: {
      expectedDate: 'canEditExpectedData',
      description: 'canEditDescription',
      reporter: 'canEditReporter',
      location: 'canEditLocation',
      urgency: 'canEditUrgency',
      title: 'canEditTitle',
    },
  },
  wo: {
    create: 'createWo',
    viewList: 'viewWoList',
    viewItem: 'viewWoItem',
    editItem: 'editWoItem',
    changeStatus: 'changeWoStatus',
  },
  employee: {
    create: 'createEmployee',
    viewList: 'viewEmployeeList',
    viewItem: 'viewEmployeeItem',
    editItem: 'editEmployeeItem',
  },
  tenant: {
    create: 'createTenant',
    viewList: 'viewTenantList',
    viewItem: 'viewTenantItem',
    editItem: 'editTenantItem',
  },
};

const StatusEnum = Object.freeze({
  OPEN: 'OPEN',
  INPROGRESS: 'INPROGRESS',
  DONE: 'DONE',
});

const ViewTypeEnum = Object.freeze({
  TABLE: 'table',
  TILE: 'tile',
});

const RoleEnum = Object.freeze({
  Manager: 'Manager',
  Staff: 'Staff',
});

export { StatusEnum, ViewTypeEnum, RoleEnum };

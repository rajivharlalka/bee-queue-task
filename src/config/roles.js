const allRoles = {
  user: ['createTasks'],
  admin: ['getUsers', 'createTasks', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

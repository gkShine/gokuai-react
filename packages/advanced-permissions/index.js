import AdvancedPermissions from '../permissions/src/advanced-permissions';

AdvancedPermissions.install = function (Vue) {
  Vue.prototype[AdvancedPermissions.name] = AdvancedPermissions;
};

export default AdvancedPermissions;
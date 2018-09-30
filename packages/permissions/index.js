import Permissions from './src/permissions';

Permissions.install = function(Vue) {
  Vue.prototype[Permissions.name] = Permissions;
};

export default Permissions;

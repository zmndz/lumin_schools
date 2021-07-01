import { execute } from "~/utils/publicScripts"

export const state = () => ({
  userType: '',
  admin: {
    name: '',
    userId: '',
    role: '',
    roleId: '',
    scopeId: '',
    scopeName: '',
    token: '',
    isAdminLoggedIn: false,
  },
})

export const getters = {
  getAdminName(state) {
    return state.admin.name;
  },
  getAdminToken(state) {
    return state.admin.token;
  },
  getAdminRole(state) {
    return state.admin.role;
  },
  getAdminScopeName(state) {
    return state.admin.scopeName;
  },
  getIsAdminLoggedIn(state) {
    return state.admin.isAdminLoggedIn;
  },
}

export const mutations = {
  LOAD_ALL_ADMIN_DATA(state, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    let userType = localStorage.getItem('userType');
    state.admin.token = adminLogin.token;
    state.admin.role = adminLogin.role;
    state.admin.roleId = adminLogin.roleId;
    state.admin.scopeId = adminLogin.scopeId;
    state.admin.userId = adminLogin.userId;
    state.admin.name = adminLogin.name;
    state.admin.scopeName = adminLogin.scopeName;
    state.admin.userType = userType;
    state.admin.isAdminLoggedIn = adminLogin.token ? true : false;
  },
  SET_ADMIN_LOGIN_DATA(state, data) {
    state.admin.name = data.name;
    state.admin.userId = data.userId;
    state.admin.role = data.role;
    state.admin.roleId = data.roleId;
    state.admin.scopeId = data.scopeId;
    state.admin.scopeName = data.scopeName;
    state.admin.token = data.token;
  },
}

export const actions = {
  loadAllAdminData({ dispatch, commit }, data) {
    commit('LOAD_ALL_ADMIN_DATA')
  },
  async loginAdmin({ dispatch, commit }, data) {
    console.log("data: ", data)
    const requestBody = {
      role: 'manager',
      national_code: data.nationalCode,
      password: data.password,
    };
    const url = '/auth/login';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      let result = {
        name: fetchResult.name + ' ' + fetchResult.family,
        role: fetchResult.role,
        scopeName: fetchResult.roles[0].name_scope,
        roleId: fetchResult.roles[0].role_id,
        scopeId: fetchResult.roles[0].scope_id,
        userId: fetchResult.user_id,
        token: fetchResult.token,
      };
      console.log("login result: ", result)
      commit("SET_ADMIN_LOGIN_DATA", result);
      dispatch('setAdminLoginData', result);
      dispatch('setUserType', 'admin');
      return fetchResult;
    } else if (fetchResult && (fetchResult.success === false)) {
      this.$toast.error(
        "نام کاربری یا رمز عبور صحیح نمی باشد!"
      )
      return false;
    } else {
      this.$toast.error(
        "لطفا دوباره امتحان کنید!"
      )
      return false;
    }
  },
  setAdminLoginData({ dispatch, commit }, payload) {
    let adminLogin = {
        name: payload.name,
        role: payload.role,
        scopeName: payload.scopeName,
        roleId: payload.roleId,
        scopeId: payload.scopeId,
        userId: payload.userId,
        token: payload.token,
    }
    localStorage.setItem('adminLogin', JSON.stringify(adminLogin));
  },
  setUserType(ctx, payload) {
    localStorage.setItem('userType', payload);
  },
  logoutAdmin(ctx, payload) {
    localStorage.clear();
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}

import { execute } from "~/utils/publicScripts"

export const state = () => ({
  userType: '',
  admin: {
    allClasses: [],
    selectedClassToEdit: null,
  },
})

export const getters = {
  getAllClasses(state) {
    return state.admin.allClasses;
  },
}

export const mutations = {
  SET_ADMIN_ALL_CLASSES(state, data) {
    let addEditToData = data.map((item, index) => {
      item.edit = false;
      return item;
    });
    let alteredData = {
      fields: [
        {
          label: 'نام کلاس',
          key: 'title',
        },
        {
          label: 'پایه',
          key: 'base',
        },
      ],
      data: [
        ...addEditToData
      ],
    }
    state.admin.allClasses = alteredData;
  },
  INSERT_NEW_CLASS(state, data) {
    state.admin.allClasses.data.push(data);
  },
  EDIT_NEW_CLASS(state, data) {
    state.admin.allClasses.data[data.index] = data.inputData;
  },
  UPDATE_CLASS_ROW(state, data) {
    state.admin.allClasses.data[data.index].edit = true;
  },
  CANCEL_UPDATE_CLASS_ROW(state, data) {
    state.admin.allClasses.data.map((item, index) => {
      item.edit = false;
    })
  },
  UPDATE_REMOVED_ROW(state, data) {
    console.log("data", data)
    console.log("state.admin.allClasses.data", state.admin.allClasses.data)
    state.admin.allClasses.data.splice(data.index, 1);
  },

}

export const actions = {
  async classesList({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
    };
    const url = '/manager/createClass';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      commit("SET_ADMIN_ALL_CLASSES", fetchResult.data.class);
      return true;
    } else if (fetchResult && (fetchResult.success === false)) {
      this.$toast.error(
        "اطلاعاتی وجود ندارد"
      )
      return false;
    } else {
      this.$toast.error(
        "لطفا دوباره امتحان کنید!"
      )
      return false;
    }
  },
  async createClass({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
      name_scope: adminLogin.scopeName,
      title: data.className,
      base: data.gradeName,
    };
    const url = '/manager/saveClass';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {

      this.$toast.success(
        `کلاس ${requestBody.title} با موفقیت اضافه شد`
      )
      return {isSuccess: true, classId: fetchResult.insertId};
    } else if (fetchResult && (fetchResult.success === false)) {
      this.$toast.error(
        "اطلاعاتی وجود ندارد"
      )
      return false;
    } else {
      this.$toast.error(
        "لطفا دوباره امتحان کنید!"
      )
      return false;
    }
  },
  async insertNewClass({ dispatch, commit, state }, data) {
    commit("INSERT_NEW_CLASS", data);
  },
  async editNewClass({ dispatch, commit, state }, data) {
    commit("EDIT_NEW_CLASS", data);
  },
  async updateClassRow({ dispatch, commit, state }, data) {
    commit("UPDATE_CLASS_ROW", data);
  },
  async cancelUpdateClassRow({ dispatch, commit, state }, data) {
    commit("CANCEL_UPDATE_CLASS_ROW", data);
  },
  async editClass({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
      class_id: data.inputData.class_id,
      title: data.inputData.title,
      base: data.inputData.base,
    };
    const url = '/manager/updateClass';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      commit('CANCEL_UPDATE_CLASS_ROW', {index: data.index});
      commit("EDIT_NEW_CLASS", {inputData: data.inputData, index: data.index});
      this.$toast.success(
        `ویرایش کلاس انجام شد`
      )
      return {isSuccess: true, classId: fetchResult.insertId};
    } else if (fetchResult && (fetchResult.success === false)) {
      this.$toast.error(
        "اطلاعاتی وجود ندارد"
      )
      return false;
    } else {
      this.$toast.error(
        "لطفا دوباره امتحان کنید!"
      )
      return false;
    }
  },
  async removeClass({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
      class_id: data.classId,
    };
    const url = '/manager/deleteClass';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      commit('UPDATE_REMOVED_ROW', {index: data.index});
      this.$toast.success(
        `حذف کلاس انجام شد`
      )
      return {isSuccess: true, classId: fetchResult.insertId};
    } else if (fetchResult && (fetchResult.success === false)) {
      this.$toast.error(
        "اطلاعاتی وجود ندارد"
      )
      return false;
    } else {
      this.$toast.error(
        "لطفا دوباره امتحان کنید!"
      )
      return false;
    }
  },
  async updateRemovedRow({ dispatch, commit, state }, data) {
    commit("UPDATE_REMOVED_ROW", data);
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}

import { execute } from "~/utils/publicScripts"

export const state = () => ({
  userType: '',
  admin: {
    allTeachers: [],
    allCourses: [],
  },
})

export const getters = {
  getAllTeachers(state) {
    return state.admin.allTeachers;
  },
}

export const mutations = {
  SET_ADMIN_ALL_TEACHERS(state, data) {
    let alteredData = {
      fields: [
        {
          label: 'نام',
          key: 'name',
        },
        {
          label: 'نام خانوادگی',
          key: 'family',
        },
        {
          label: 'کد ملی',
          key: 'national_code',
        },
        {
          label: 'پایه',
          key: 'classes',
        },
      ],
      data: [
        ...data
      ],
    }
    console.log("alteredData: ", alteredData);
    state.admin.allTeachers = alteredData;
  },
}

export const actions = {
  async teachersList({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
    };
    const url = '/manager/createTeacher';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      commit("SET_ADMIN_ALL_TEACHERS", fetchResult.data.teahers);
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
}

export default {
  state,
  getters,
  actions,
  mutations
}

import { execute } from "~/utils/publicScripts"

export const state = () => ({
  userType: '',
  admin: {
    allStudents: [],
    allStudentCourses: [],
  },
})

export const getters = {
  getAllStudents(state) {
    return state.admin.allStudents;
  },
  getAllStudentCourses(state) {
    return state.admin.allStudentCourses;
  },
}

export const mutations = {
  SET_ADMIN_ALL_STUDENTS(state, data) {
    let addEditToData = data.map((item, index) => {
      item.edit = false;
      return item;
    });
    console.log("addEdit", addEditToData)
    console.log("data", data)

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
          label: 'شماره موبایل',
          key: 'mobile',
        },
        // {
        //   label: 'نام پدر',
        //   key: 'father_name',
        // },
      ],
      data: [
        ...addEditToData
      ],
    }
    state.admin.allStudents = alteredData;
  },
  SET_ADMIN_ALL_COURSES(state, data) {
    let alteredData = [
      { 
        text: 'کلاس دانش آموز را انتخاب کنید',
        value: null,
      },
    ];
    data.map((item, index) => {
      let temp = {
        text: item.title,
        // value: item.class_id,
        // base: item.base,
        value: {
          classId: item.class_id,
          base: item.base,
          title: item.title,
        }
      }
      alteredData.push(temp)
    })
    state.admin.allStudentCourses = alteredData;
  },
  INSERT_NEW_STUDENT(state, data) {
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
          label: 'شماره موبایل',
          key: 'mobile',
        },
        // {
        //   label: 'نام پدر',
        //   key: 'father_name',
        // },
      ],
      data: {
        name: data.name,
        family: data.family,
        national_code: data.national_code,
        mobile: data.mobile,
        // role_id: data.role_id,
        // user_id: data.insertId,
        role_id: data.insertId,
        user_id: data.user_id,
      },
    }
    state.admin.allStudents.data.push(alteredData.data);
  },
  UPDATE_REMOVED_STUDENT(state, data) {
    console.log("data", data)
    console.log("state.admin.allStudents.data", state.admin.allStudents)
    state.admin.allStudents.data.splice(data.index, 1);
  },

}

export const actions = {
  async studentsList({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
    };
    const url = '/manager/createStudent';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      commit("SET_ADMIN_ALL_STUDENTS", fetchResult.data.users);
      commit("SET_ADMIN_ALL_COURSES", fetchResult.data.class);
      return true;
    } else if (fetchResult && (fetchResult.success === false)) {
      this.$toast.error(
        "اطلاعاتی پیدا نشد"
      )
      return false;
    } else {
      this.$toast.error(
        "لطفا دوباره امتحان کنید!"
      )
      return false;
    }
  },
  async createStudent({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
      ...data,
    };
    console.log("requestBody", requestBody)
    const url = '/manager/saveStudent';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      console.log("fetchResult", fetchResult)
      commit("INSERT_NEW_STUDENT", fetchResult.data);
      this.$toast.success(
        "دانش آموز ثبت شد"
      )
      return true;
    } else if (fetchResult && (fetchResult.success === false) && fetchResult.code === 220) {
      this.$toast.error(
        "این دانش آموز قبلا ثبت شده"
      )
      return false;
    } else if (fetchResult && (fetchResult.success === false)) {
      this.$toast.error(
        "اطلاعاتی پیدا نشد"
      )
      return false;
    } else {
      this.$toast.error(
        "لطفا دوباره امتحان کنید!"
      )
      return false;
    }
  },
  async removeStudent({ dispatch, commit, state }, data) {
    let adminLogin = JSON.parse(localStorage.getItem('adminLogin'));
    const requestBody = {
      scope_id: adminLogin.scopeId,
      roles_id: data.roleId,
    };
    console.log("requestBody", requestBody)
    const url = '/manager/deleteStudent';
    let fetchResult = await execute('POST', url, requestBody);
    if (fetchResult && (fetchResult.success === true)) {
      commit('UPDATE_REMOVED_STUDENT', {index: data.index});
      console.log("fetchResult", fetchResult)
      this.$toast.success(
        `حذف دانش آموز انجام شد`
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
  async insertNewStudent({ dispatch, commit, state }, data) {
    commit("INSERT_NEW_STUDENT", data);
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}

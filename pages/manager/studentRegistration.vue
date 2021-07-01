<template>
  <div class="student box">
    <div class="wizard__controls">
      <Steps :steps="stepsData" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-5">
        <b-form @submit="insertStudent" class="student__form">
          <b-form-group id="input-group-1" label="نام:" label-for="input-1">
            <b-form-input
              id="input-1"
              placeholder="نام دانش آموز را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isFirstNameEmpty === true}"
              v-model="firstName"
              @input="validateFirstName()"
            ></b-form-input>
            <span v-if="isFirstNameEmpty === true" class="form__input--invalid-message">
              لطفا نام دانش آموز را وارد کنید
            </span>
          </b-form-group>

          <b-form-group id="input-group-2" label="نام خانوادگی:" label-for="input-2">
            <b-form-input
              id="input-2"
              placeholder="نام خانوادگی دانش آموز را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isLastNameEmpty === true}"
              v-model="lastName"
              @input="validateLastName()"
            ></b-form-input>
            <span v-if="isLastNameEmpty === true" class="form__input--invalid-message">
              لطفا نام خانوادگی دانش آموز را وارد کنید
            </span>
          </b-form-group>
          
          <b-form-group id="input-group-3" label="کد ملی:" label-for="input-3">
            <b-form-input
              id="input-3"
              type="number"
              placeholder="کد ملی دانش آموز را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isNationalCodeEmpty === true}"
              v-model="nationalCode"
              @input="validateNationalCode()"
            ></b-form-input>
            <span v-if="isNationalCodeEmpty === true" class="form__input--invalid-message">
              لطفا کد ملی  10 رقمی دانش آموز را وارد کنید
            </span>
          </b-form-group>

          <b-form-group id="input-group-4" label="نام پدر:" label-for="input-4">
            <b-form-input
              id="input-4"
              placeholder="نام پدر دانش آموز را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isFatherNameEmpty === true}"
              v-model="fatherName"
              @input="validateFatherName()"
            ></b-form-input>
            <span v-if="isFatherNameEmpty === true" class="form__input--invalid-message">
              لطفا نام پدر دانش آموز را وارد کنید
            </span>
          </b-form-group>

          <b-form-group id="input-group-5" label="شماره موبایل:" label-for="input-5">
            <b-form-input
              id="input-5"
              type="number"
              placeholder="شماره موبایل دانش آموز را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isPhoneNumberInvalid === true}"
              v-model="phoneNumber"
              @input="validatePhoneNumber()"
            ></b-form-input>
            <span v-if="isPhoneNumberInvalid === true" class="form__input--invalid-message">
              لطفا شماره موبایل صحیح وارد کنید
            </span>
          </b-form-group>

          <b-form-group id="input-group-6" label="کلاس:" label-for="input-6">
            <b-form-select
              id="input-6"
              class="form__select"
              :class="{'form__select--invalid': isClassEmpty}"
              v-model="selectedClass"
              :options="classList"
              @input="validateClass()"
            >
            </b-form-select>
            <span v-if="isClassEmpty === true" class="form__select--invalid-message">
              لطفا برای دانش آموز یک کلاس انتخاب کنید
            </span>
          </b-form-group>

          <button type="submit" class="button button--yellow button--block">
            اضافه کردن دانش آموز
          </button>
        </b-form>
      </div>
    </div>

    <Table 
      v-if="addedStudents !== null" 
      :data="addedStudents" 
      title="لیست دانش آموزان"
      @removeRow="deleteStudent" 
      
    />
      <!-- @editRow="editStudentRow" 
      @cancelEditRow="cancelEditClass" 
      @saveRow="updateClass"  -->
    
    <div class="wizard__controls">
      <button class="wizard__controls--next button button--yellow">تمام</button>
      <button class="wizard__controls--back button button--yellow">بازگشت</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Steps from '~/components/common/Steps'
import Table from '~/components/common/Table'

export default {
  layout: 'managerLayout',
  components: {
    Steps,
    Table,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      nationalCode: '',
      phoneNumber: '',
      fatherName: '',
      isFirstNameEmpty: null,
      isLastNameEmpty: null,
      isNationalCodeEmpty: null,
      isPhoneNumberInvalid: null,
      isFatherNameEmpty: null,
      isClassEmpty: null,
      classList: [],
      search: '',
      selectedClass: null,
      stepsData: [
        {
          id: '1',
          title: 'ثبت کلاس ها',
          active: false,
        },
        {
          id: '2',
          title: 'ثبت اطلاعات معلم ها', 
          active: false,
        },
        {
          id: '3',
          title: 'ثبت اطلاعات دانش آموزان', 
          active: true,
        },
      ],
      addedStudents: null,
    }
  },
  computed: {
    ...mapGetters([
      'getAllStudents',
      'getAllStudentCourses',
    ]),
  },
  methods: {
    ...mapActions([
      'studentsList',
      'createStudent',
      'removeStudent',
    ]),
    validateFirstName() {
      if (this.firstName == '') {
        this.isFirstNameEmpty = true;
        return false;
      } else {
        this.isFirstNameEmpty = false;
        return true;
      }
    },
    validateLastName() {
      if (this.lastName == '') {
        this.isLastNameEmpty = true;
        return false;
      } else {
        this.isLastNameEmpty = false;
        return true;
      }
    },
    validateFatherName() {
      if (this.fatherName == '') {
        this.isFatherNameEmpty = true;
        return false;
      } else {
        this.isFatherNameEmpty = false;
        return true;
      }
    },
    validateNationalCode() {
      if (this.nationalCode == '' || this.nationalCode.length !== 10) {
        this.isNationalCodeEmpty = true;
        return false;
      } else {
        this.isNationalCodeEmpty = false;
        return true;
      }
    },
    validatePhoneNumber() {
      let regex = new RegExp('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}');
      let isPhone = regex.test(this.phoneNumber);
      if (this.phoneNumber == '') {
        this.isPhoneNumberInvalid = false;
        return true;
      } else {
        if (isPhone && this.phoneNumber.length == 11) {
          this.isPhoneNumberInvalid = false;
          return true;
        } else {
          this.isPhoneNumberInvalid = true;
          return false;
        }
      }
    },
    validateNationalCode() {
      if (this.nationalCode == '' || this.nationalCode.length !== 10) {
        this.isNationalCodeEmpty = true;
        return false;
      } else {
        this.isNationalCodeEmpty = false;
        return true;
      }
    },
    validateClass() {
      if (this.selectedClass == null) {
        this.isClassEmpty = true;
        return false;
      } else {
        this.isClassEmpty = false;
        return true;
      }
    },
    validateStudent() {
      let checkFirstName = this.validateFirstName();
      let checkLastName = this.validateLastName();
      let checkFatherName = this.validateFatherName();
      let checkNationalCode = this.validateNationalCode();
      let checkPhoneNumber = this.validatePhoneNumber();
      let checkClass = this.validateClass();

      if (checkFirstName && checkLastName && checkNationalCode && checkPhoneNumber && checkFatherName && checkClass) {
        return true;
      } else {
        return false;
      }
    },
    async getStudentsData() {
      let result = await this.studentsList();
      if (result) {
        this.addedStudents = this.getAllStudents;
        this.classList = this.getAllStudentCourses;
      }
    },
    async insertStudent(e) {
      e.preventDefault()
      if (!this.validateStudent()) {
        return false;
      }
      console.log("this.selectedClass", this.selectedClass)
      let params = {
        name: this.firstName,
        family: this.lastName,
        national_code: this.nationalCode,
        // father_name: this.fatherName,
        mobile: this.phoneNumber,
        class_id: this.selectedClass.classId,
        title: this.selectedClass.title,
        base: this.selectedClass.base,
      }
      console.log("params", params)
      let result = await this.createStudent(params);
      if (result) {
        this.resetForm();
      }
    },
    async deleteStudent(row, index) {
      console.log("remove", row, index)
      let result = await this.removeStudent({roleId: row.role_id, index});
      if (result) {
        console.log("deleteClass success")
      }
    },


    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.nationalCode = '';
      this.fatherName = '';
      this.phoneNumber = '';
      this.selectedClass = null;
    },
  },
  mounted() {
    this.getStudentsData();
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.student {

  &__form {
    width: 100%;
  }


  &__select {
    padding: 0;
    border: none;

    &:focus {
      border-color: rgba($color: $yellow-color, $alpha: 0.5) !important;
      box-shadow: none !important;
      border: 2px solid #fbdc8c !important;
    }

    &--title {
      background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat left 0.75rem center/8px 10px;
      color: rgb(170, 170, 170);
      cursor: pointer;
      text-align: right;
      border: 1px solid #c3c3c3;
      border-radius: 4px;
      padding: 8px 16px;
      transition: all 0.2s ease-in-out;

      &:hover {
        border-color: #999999;
      }

      &:focus {
        border-color: rgba($color: $yellow-color, $alpha: 0.5) !important;
        box-shadow: none !important;
        border: 2px solid #fbdc8c;
      }
    }

    &--tags {
      direction: ltr;
      margin-top: 0.75rem;
    }

    &--tag {
      padding: 4px 12px;
      border-radius: 10rem;
      background-color: $purple-color;
    }
  }
}

.wizard__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  &--next {
    width: 100%;
    display: block;
    margin-bottom: 1rem;
  }

  &--back {
    width: 100%;
    display: block;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {

}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {
  .wizard__controls {
    flex-direction: unset;

    &--next {
      width: 220px;
      display: unset;
      margin-bottom: 0;
    }

    &--back {
      width: 220px;
      display: unset;
    }
  }

}

// extra large devices (desktops, 768px and up)
@media (min-width: 1199.98px) {

}
</style>

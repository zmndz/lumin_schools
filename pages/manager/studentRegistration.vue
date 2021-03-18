<template>
  <div class="student box">
    <div class="wizard__controls">
      <Steps :steps="stepsData" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-5">
        <b-form @submit="addStudent" class="student__form">
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

          <b-form-group id="input-group-5" label="کلاس:" label-for="input-5">
            <b-form-select
              id="input-5"
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

    <div class="student__list-wrapper">
      <div class="student__list-title">
        لیست دانش آموز ها
      </div>
      <div class="student__list tbl">
        <div class="student__list--header tbl-header">
          <div class="student__list--select tbl-cell">
            <input type="checkbox" name="" id="">
          </div>
          <div class="student__list--firstname tbl-cell ">
            نام
          </div>
          <div class="student__list--lastname tbl-cell">
            نام خانوادگی
          </div>
          <div class="student__list--nationalcode tbl-cell">
            کد ملی
          </div>
          <div class="student__list--nationalcode tbl-cell">
            نام پدر
          </div>
          <div class="student__list--edit tbl-cell">
            ویرایش
          </div>
          <div class="student__list--remove tbl-cell">
            حذف
          </div>
        </div>
        <div v-for="(student, index) in addedStudents" :key="index" class="tbl-row">
          <div class="student__list--select tbl-cell">
            <input type="checkbox" name="" :id="index">
          </div>
          <div class="student__list--firstname tbl-cell ">
            {{student.firstName}}
          </div>
          <div class="student__list--lastname tbl-cell">
            {{student.lastName}}
          </div>
          <div class="student__list--nationalcode tbl-cell">
            {{student.nationalCode}}
          </div>
          <div class="student__list--nationalcode tbl-cell">
            {{student.fatherName}}
          </div>
          <div class="student__list--edit tbl-cell">
            <div>E</div>
          </div>
          <div class="student__list--remove tbl-cell">
            <div>X</div>
          </div>
        </div>
      </div>
    </div>

    <div class="wizard__controls">
      <button class="wizard__controls--next button button--yellow">تمام</button>
      <button class="wizard__controls--back button button--yellow">بازگشت</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Steps from '~/components/common/Steps'

export default {
  layout: 'managerLayout',
  components: {
    Steps,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      nationalCode: '',
      fatherName: '',
      isFirstNameEmpty: null,
      isLastNameEmpty: null,
      isNationalCodeEmpty: null,
      isFatherNameEmpty: null,
      isClassEmpty: null,
      // classList: ['7/1', '7/2', '7/3', '8/1', '8/2', '8/3', '9/1', '9/2', '9/3'],
      classList: [
        { value: null, text: 'کلاس دانش آموز را انتخاب کنید' },
        { value: '71', text: '7/1' },
        { value: '72', text: '7/2' },
        { value: '73', text: '7/3' },
        { value: '81', text: '8/1' },
        { value: '82', text: '8/2' },
        { value: '83', text: '8/3' },
        { value: '91', text: '9/1' },
        { value: '92', text: '9/2' },
        { value: '93', text: '9/3' },
      ],
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
      addedStudents: [
        {
          id: '1',
          firstName: 'ظهیر',
          lastName: 'دژبرد',
          fatherName: 'محمد', 
          nationalCode: '3810260657',
        },
        {
          id: '2',
          firstName: 'کیوان',
          lastName: 'صمدی',
          fatherName: 'محمد', 
          nationalCode: '3721236589',
        },
        {
          id: '3',
          firstName: 'احمد',
          lastName: 'دژبرد',
          fatherName: 'محمد', 
          nationalCode: '3712345649',
        },
        {
          id: '4',
          firstName: 'سینا',
          lastName: 'فاتحی',
          fatherName: 'محمد', 
          nationalCode: '3523651247',
        },
        {
          id: '5',
          firstName: 'ظهیر',
          lastName: 'دژبرد',
          fatherName: 'محمد', 
          nationalCode: '3810260657',
        },
        {
          id: '6',
          firstName: 'کیوان',
          lastName: 'صمدی',
          fatherName: 'محمد', 
          nationalCode: '3721236589',
        },
        {
          id: '7',
          firstName: 'احمد',
          lastName: 'دژبرد',
          fatherName: 'محمد', 
          nationalCode: '3712345649',
        },
        {
          id: '8',
          firstName: 'سینا',
          lastName: 'فاتحی',
          fatherName: 'محمد', 
          nationalCode: '3523651247',
        },
      ],
    }
  },
  computed: {
    ...mapGetters([

    ]),
  },
  methods: {
    ...mapActions([
    ]),
    addStudent (e) {
      e.preventDefault()
      this.validateStudent();
    },
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
      let checkClass = this.validateClass();

      if (checkFirstName && checkLastName && checkNationalCode && checkFatherName && checkClass) {
        return true;
      } else {
        return false;
      }
    }
  },
  async mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.student {

  &__form {
    width: 100%;
  }

  &__list-wrapper {
    margin: 3rem 0;
  }
  &__list-title {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  &__list {

    &--header {
      // background-color: darkgrey;
    }

    &--select {
      min-width: 42px;
      width: 46px;
      justify-content: center;
    }

    &--firstname {
      min-width: 120px;
      width: 100%;
    }

    &--lastname {
      min-width: 160px;
      width: 100%;
    }

    &--nationalcode {
      min-width: 120px;
      width: 100%;
    }

    &--edit {
      min-width: 80px;
      width: 80px;
      justify-content: center;
    }

    &--remove {
      min-width: 80px;
      justify-content: center;
      width: 80px;
    }
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

<template>
  <div class="classification box">
    <div class="wizard__controls">
      <Steps :steps="stepsData" />
    </div>

    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="کلاس 7/1" active>
          <b-card-text>
            <div class="classification__wrapper">
              <div class="classification__class">
                <div class="row">
                  <div class="col-12 col-lg-5">
                    <b-form @submit="addStudent" class="classification__form">
                      <b-form-group id="input-group-5" label="دانش آموزان بدون کلاس:" label-for="input-5">
                        <b-form-select
                          id="input-5"
                          class="form__select"
                          :class="{'form__select--invalid': isUnClassedStudentsEmpty}"
                          v-model="selectedClass"
                          :options="unClassedStudents"
                          @input="validateUnClassedStudents()"
                        >
                        </b-form-select>
                        <span v-if="isUnClassedStudentsEmpty === true" class="form__select--invalid-message">
                          لطفا دانش آموز های بدون کلاس را به کلاس ها اضافه کنید
                        </span>
                      </b-form-group>

                      <button type="submit" class="button button--yellow button--block">
                        اضافه کردن دانش آموز به این کلاس
                      </button>
                    </b-form>
                  </div>
                </div>

                <div class="classification__list-wrapper">
                  <div class="classification__list-title">
                    لیست دانش آموز ها (224 نفر)
                  </div>
                  <div class="classification__list tbl">
                    <div class="classification__list--header tbl-header">
                      <div class="classification__list--select tbl-cell">
                        <input type="checkbox" name="" id="">
                      </div>
                      <div class="classification__list--firstname tbl-cell ">
                        نام
                      </div>
                      <div class="classification__list--lastname tbl-cell">
                        نام خانوادگی
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        کد ملی
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        نام پدر
                      </div>
                      <div class="classification__list--remove tbl-cell">
                        حذف
                      </div>
                    </div>
                    <div v-for="(student, index) in addedStudents" :key="index" class="tbl-row">
                      <div class="classification__list--select tbl-cell">
                        <input type="checkbox" name="" :id="index">
                      </div>
                      <div class="classification__list--firstname tbl-cell ">
                        {{student.firstName}}
                      </div>
                      <div class="classification__list--lastname tbl-cell">
                        {{student.lastName}}
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        {{student.nationalCode}}
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        {{student.fatherName}}
                      </div>
                      <div class="classification__list--remove tbl-cell">
                        <div>X</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="کلاس 7/2">
          <b-card-text>
            <div class="classification__wrapper">
              <div class="classification__class">
                <div class="row">
                  <div class="col-12 col-lg-5">
                    <b-form @submit="addStudent" class="classification__form">
                      <b-form-group id="input-group-5" label="دانش آموزان بدون کلاس:" label-for="input-5">
                        <b-form-select
                          id="input-5"
                          class="form__select"
                          :class="{'form__select--invalid': isUnClassedStudentsEmpty}"
                          v-model="selectedClass"
                          :options="unClassedStudents"
                          @input="validateUnClassedStudents()"
                        >
                        </b-form-select>
                        <span v-if="isUnClassedStudentsEmpty === true" class="form__select--invalid-message">
                          لطفا دانش آموز های بدون کلاس را به کلاس ها اضافه کنید
                        </span>
                      </b-form-group>

                      <button type="submit" class="button button--yellow button--block">
                        اضافه کردن دانش آموز به این کلاس
                      </button>
                    </b-form>
                  </div>
                </div>

                <div class="classification__list-wrapper">
                  <div class="classification__list-title">
                    لیست دانش آموز ها (224 نفر)
                  </div>
                  <div class="classification__list tbl">
                    <div class="classification__list--header tbl-header">
                      <div class="classification__list--select tbl-cell">
                        <input type="checkbox" name="" id="">
                      </div>
                      <div class="classification__list--firstname tbl-cell ">
                        نام
                      </div>
                      <div class="classification__list--lastname tbl-cell">
                        نام خانوادگی
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        کد ملی
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        نام پدر
                      </div>
                      <div class="classification__list--remove tbl-cell">
                        حذف
                      </div>
                    </div>
                    <div v-for="(student, index) in addedStudents" :key="index" class="tbl-row">
                      <div class="classification__list--select tbl-cell">
                        <input type="checkbox" name="" :id="index">
                      </div>
                      <div class="classification__list--firstname tbl-cell ">
                        {{student.firstName}}
                      </div>
                      <div class="classification__list--lastname tbl-cell">
                        {{student.lastName}}
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        {{student.nationalCode}}
                      </div>
                      <div class="classification__list--nationalcode tbl-cell">
                        {{student.fatherName}}
                      </div>
                      <div class="classification__list--remove tbl-cell">
                        <div>X</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>

    <div class="wizard__controls">
      <button class="wizard__controls--next button button--yellow">گام بعدی: ثبت اطلاعات معلم</button>
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
      isUnClassedStudentsEmpty: null,
      unClassedStudents: [
        { value: null, text: 'انتخاب دانش آموز برای این کلاس' },
        { value: '1', text: 'محمد کریمی' },
        { value: '2', text: 'احسان زندی' },
        { value: '3', text: 'سینا زارعی' },
        { value: '4', text: 'کریم باقری' },
        { value: '5', text: 'رضا محمدی' },
      ],
      selectedClass: null,
      stepsData: [
        {
          id: '1',
          title: 'دسته بندی کلاس ها و دانش آموزان',
          active: true,
        },
        {
          id: '2',
          title: 'ثبت اطلاعات معلم ها', 
          active: false,
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
      this.validateUnClassedStudents();
    },
    validateUnClassedStudents() {
      if (this.selectedClass == null) {
        this.isUnClassedStudentsEmpty = true;
        return false;
      } else {
        this.isUnClassedStudentsEmpty = false;
        return true;
      }
    },
  },
  async mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.classification {

  &__wrapper {
    // margin-bottom: 3rem;
  }

  &__title {
    display: flex;

    &--class {
      margin-left: 8px;
    }

    &--grade {

    }
  }

  &__class {
    // border: 1px solid rgba(0,0,0,.125);
    // border-radius: 4px;
    // margin-top: 16px;
    // padding: 16px;
  }

  &__form {
    width: 100%;
    margin-bottom: 3rem;
  }

  &__list-wrapper {
    // margin: 3rem 0;
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
  margin: 1rem 0;

  &--next {
    width: 100%;
    display: block;
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

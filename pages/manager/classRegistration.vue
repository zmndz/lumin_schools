<template>
  <div class="class box">
    <div class="wizard__controls">
      <Steps :steps="stepsData" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-5">
        <b-form @submit="addClass" class="class__form">
          <b-form-group id="input-group-1" label="پایه تحصیلی:" label-for="input-1">
            <b-form-select
              id="input-1"
              placeholder="نام معلم را وارد کنید"
              class="form__select"
              v-model="selectedGrade"
              :options="grades"
              @change="validateGrade()"
            >
            </b-form-select>
            <span v-if="isGradeEmpty === true" class="form__select--invalid-message">
              لطفا یکی از پایه های تحصیلی را انتخاب کنید
            </span>
          </b-form-group>

          <b-form-group id="input-group-2" label="نام کلاس:" label-for="input-2">
            <b-form-input
              id="input-2"
              placeholder="برای مثال ۷/۱ یا ۹/۳"
              class="form__input"
              :class="{'form__input--invalid' : isClassNameEmpty === true}"
              v-model="className"
              @change="validateClassName()"
            ></b-form-input>
            <span v-if="isClassNameEmpty === true" class="form__input--invalid-message">
              لطفا برای کلاس نامی وارد کنید
            </span>
          </b-form-group>
          
          <button type="submit" class="button button--yellow button--block">
            اضافه کردن کلاس
          </button>
        </b-form>
      </div>
    </div>

    <div class="class__list-wrapper">
      <div class="class__list-title">
        لیست کلاس ها
      </div>
      <div class="class__list tbl">
        <div class="class__list--header tbl-header">
          <div class="class__list--select tbl-cell">
            <input type="checkbox" name="" id="">
          </div>
          <div class="class__list--classname tbl-cell ">
            نام کلاس
          </div>
          <div class="class__list--grade tbl-cell">
            پایه
          </div>
          <div class="class__list--edit tbl-cell">
            ویرایش
          </div>
          <div class="class__list--remove tbl-cell">
            حذف
          </div>
        </div>
        <div v-for="(singleClass, index) in addedClasses" :key="index" class="tbl-row">
          <div class="class__list--select tbl-cell">
            <input type="checkbox" name="" :id="index">
          </div>
          <div class="class__list--classname tbl-cell ">
            {{singleClass.className}}
          </div>
          <div class="class__list--grade tbl-cell">
            {{singleClass.gradeTitle}}
          </div>
          <div class="class__list--edit tbl-cell">
            <div>E</div>
          </div>
          <div class="class__list--remove tbl-cell">
            <div>X</div>
          </div>
        </div>
      </div>
    </div>

    <div class="wizard__controls">
      <button class="wizard__controls--next button button--yellow">گام بعدی: ثبت کردن معلم ها</button>
      <button class="wizard__controls--back button button--yellow" @click="goToManager()">بازگشت</button>
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
      className: '',
      selectedGrade: null,
      isGradeEmpty: null,
      isClassNameEmpty: null,
      grades: [
        { value: null, text: 'پایه تحصیلی مورد نظر را انتخاب کنید' },
        { value: '7', text: 'متوسطه اول' },
        { value: '8', text: 'متوسطه دوم' },
        { value: '9', text: 'متوسطه سوم' },
      ],
      stepsData: [
        {
          id: '1',
          title: 'ثبت کلاس ها',
          active: true,
        },
        {
          id: '2',
          title: 'ثبت اطلاعات معلم ها', 
          active: false,
        },
        {
          id: '3',
          title: 'ثبت اطلاعات دانش آموزان', 
          active: false,
        },
      ],
      addedClasses: [
        {
          id: '1',
          gradeId: '7',
          gradeTitle: 'متوسطه اول',
          className: '۷/۱',
          classId: '71'
        },
        {
          id: '2',
          gradeId: '8',
          gradeTitle: 'متوسطه دوم',
          className: '۸/۲',
          classId: '82'
        },
        {
          id: '3',
          gradeId: '9',
          gradeTitle: 'متوسطه سوم',
          className: '۹/۱',
          classId: '91'
        },
        {
          id: '4',
          gradeId: '9',
          gradeTitle: 'متوسطه سوم',
          className: '۹/۲',
          classId: '92'
        },
        {
          id: '4',
          gradeId: '94',
          gradeTitle: 'متوسطه سوم',
          className: '۹/۴',
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
    goToManager() {
      this.$router.push('/manager');
    },
    addClass (e) {
      e.preventDefault()
      this.validateClass();
    },
    validateGrade() {
      if (this.selectedGrade == null) {
        this.isGradeEmpty = true;
        return false;
      } else {
        this.isGradeEmpty = false;
        return true;
      }
    },
    validateClassName() {
      if (this.className == '') {
        this.isClassNameEmpty = true;
        return false;
      } else {
        this.isClassNameEmpty = false;
        return true;
      }
    },
    validateClass() {
      let checkGrade = this.validateGrade();
      let checkClassName = this.validateClassName();
      console.log(checkGrade)
      console.log(checkClassName)

      if (checkGrade && checkClassName) {
      console.log("yes")
        return true;
      } else {
      console.log("no")
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

.class {

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

    &--classname {
      min-width: 120px;
      width: 100%;
    }

    &--grade {
      min-width: 160px;
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

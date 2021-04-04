<template>
  <div class="lesson box">
    <div class="row">
      <div class="col-12 col-lg-5">
        <b-form @submit="addLesson" class="lesson__form">
          <b-form-group id="input-group-2" label="نام درس:" label-for="input-2">
            <b-form-input
              id="input-2"
              placeholder="لطفا نام درس را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isLessonnameEmpty === true}"
              v-model="lessonname"
              @input="validateLessonname()"
            ></b-form-input>
            <span v-if="isLessonnameEmpty === true" class="form__input--invalid-message">
              لطفا برای درس نامی وارد کنید
            </span>
          </b-form-group>

          <b-form-group id="input-group-1" label="پایه تحصیلی:" label-for="input-1">
            <b-form-select
              id="input-1"
              class="form__select"
              :class="{'form__select--invalid': isGradeEmpty}"
              v-model="selectedGrade"
              :options="grades"
              @input="validateGrade()"
            >
            </b-form-select>
            <span v-if="isGradeEmpty === true" class="form__select--invalid-message">
              لطفا یکی از پایه های تحصیلی را انتخاب کنید
            </span>
          </b-form-group>
          <button type="submit" class="button button--yellow button--block">
            اضافه کردن درس
          </button>
        </b-form>
      </div>
    </div>

    <div class="lesson__list-wrapper">
      <div class="lesson__list-title">
        لیست درس ها
      </div>
      <div class="lesson__list tbl">
        <div class="lesson__list--header tbl-header">
          <div class="lesson__list--select tbl-cell">
            <input type="checkbox" name="" id="">
          </div>
          <div class="lesson__list--lessonname tbl-cell ">
            نام درس
          </div>
          <div class="lesson__list--grade tbl-cell">
            پایه
          </div>
          <div class="lesson__list--edit tbl-cell">
            ویرایش
          </div>
          <div class="lesson__list--remove tbl-cell">
            حذف
          </div>
        </div>
        <div v-for="(singleClass, index) in addedClasses" :key="index" class="tbl-row">
          <div class="lesson__list--select tbl-cell">
            <input type="checkbox" name="" :id="index">
          </div>
          <div class="lesson__list--lessonname tbl-cell ">
            {{singleClass.lessonname}}
          </div>
          <div class="lesson__list--grade tbl-cell">
            {{singleClass.gradeTitle}}
          </div>
          <div class="lesson__list--edit tbl-cell">
            <div>E</div>
          </div>
          <div class="lesson__list--remove tbl-cell">
            <div>X</div>
          </div>
        </div>
      </div>
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
      lessonname: '',
      selectedGrade: null,
      isGradeEmpty: null,
      isLessonnameEmpty: null,
      grades: [
        { value: null, text: 'پایه تحصیلی مورد نظر را انتخاب کنید' },
        { value: '7', text: 'متوسطه اول' },
        { value: '8', text: 'متوسطه دوم' },
        { value: '9', text: 'متوسطه سوم' },
      ],
      stepsData: [
        {
          id: '1',
          title: 'ثبت درس ها',
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
          lessonname: 'ریاضی',
          lessonId: '71'
        },
        {
          id: '2',
          gradeId: '8',
          gradeTitle: 'متوسطه دوم',
          lessonname: 'ادبیات فارسی',
          lessonId: '82'
        },
        {
          id: '3',
          gradeId: '9',
          gradeTitle: 'متوسطه سوم',
          lessonname: 'عربی',
          lessonId: '91'
        },
        {
          id: '4',
          gradeId: '9',
          gradeTitle: 'متوسطه سوم',
          lessonname: 'شیمی',
          lessonId: '92'
        },
        {
          id: '4',
          gradeId: '94',
          gradeTitle: 'متوسطه سوم',
          lessonname: 'فیزیک',
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
    addLesson (e) {
      e.preventDefault()
      this.validateLesson();
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
    validateLessonname() {
      if (this.lessonname == '') {
        this.isLessonnameEmpty = true;
        return false;
      } else {
        this.isLessonnameEmpty = false;
        return true;
      }
    },
    validateLesson() {
      let checkGrade = this.validateGrade();
      let checkLessonname = this.validateLessonname();

      if (checkGrade && checkLessonname) {
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

.lesson {

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

    &--lessonname {
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

// Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {

}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {

}

// extra large devices (desktops, 768px and up)
@media (min-width: 1199.98px) {

}
</style>

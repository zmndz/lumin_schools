<template>
  <div class="report box">
    <div class="report__list-wrapper">
      <div class="report__list-title">
        لیست دانش آموزان امتحان درس ریاضی 1 - کلاس 7/1
      </div>
      <div class="report__list tbl">
        <div class="report__list--header tbl-header">
          <div class="report__list--select tbl-cell">
            <input type="checkbox" name="" id="">
          </div>
          <div class="report__list--name tbl-cell ">
            نام و نام خانوادگی
          </div>
          <div class="report__list--national-code tbl-cell">
            کدملی
          </div>
          <div class="report__list--status tbl-cell">
            وضعیت
          </div>
          <div class="report__list--score tbl-cell">
            نمره
          </div>
        </div>
        <div v-for="(singleReport, index) in studentList" :key="index" class="tbl-row">
          <div class="report__list--select tbl-cell">
            <input type="checkbox" name="" :id="index">
          </div>
          <div class="report__list--name tbl-cell ">
            {{singleReport.studentName}}
          </div>
          <div class="report__list--national-code tbl-cell">
            {{singleReport.nationalCode}}
          </div>
          <div class="report__list--status tbl-cell">
            {{singleReport.status}}
          </div>
          <div class="report__list--score tbl-cell">
            <div v-if="singleReport.isFinished">
              {{singleReport.score}}
            </div>
            <div v-else>
              <button class="button button--yellow">
                تصحیح
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="report__download-wrapper">
        <button class="report__download button button--yellow">
          ذخیره کارنامه
        </button>

        <button class="report__download button button--yellow">
          بازگشت
        </button>
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
      reportname: '',
      selectedGrade: null,
      isGradeEmpty: null,
      isReportnameEmpty: null,
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
      studentList: [
        {
          id: '1',
          studentId: '7',
          studentName: 'ظهیر دژبرد',
          nationalCode: '3810260657',
          status: 'حاضر',
          isFinished: false,
          isRectified: false,
          score: '',
        },
        {
          id: '2',
          studentId: '8',
          studentName: 'احمد صمدی',
          nationalCode: '3810260657',
          status: 'حاضر',
          isFinished: false,
          isRectified: false,
          score: '',
        },
        {
          id: '3',
          studentId: '9',
          studentName: 'رضا کریمی',
          nationalCode: '3810260657',
          status: 'حاضر',
          isFinished: false,
          isRectified: false,
          score: '',
        },
        {
          id: '4',
          studentId: '9',
          studentName: 'سینا شمسی',
          nationalCode: '3810260657',
          status: 'حاضر',
          isFinished: false,
          isRectified: false,
          score: '',
        },
        {
          id: '4',
          studentId: '94',
          studentName: 'علی توکلی',
          nationalCode: '3810260657',
          status: 'حاضر',
          isFinished: false,
          isRectified: false,
          score: '',
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
    addReport (e) {
      e.preventDefault()
      this.validateReport();
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
    validateReportname() {
      if (this.reportname == '') {
        this.isReportnameEmpty = true;
        return false;
      } else {
        this.isReportnameEmpty = false;
        return true;
      }
    },
    validateReport() {
      let checkGrade = this.validateGrade();
      let checkReportname = this.validateReportname();

      if (checkGrade && checkReportname) {
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

.report {

  &__title {
    font-weight: bold;
  }

  &__form {
    width: 100%;
  }

  &__list-wrapper {
    // margin: 3rem 0;
  }

  &__list-title {
    margin-bottom: 3rem;
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

    &--name {
      min-width: 160px;
      width: 100%;
    }

    &--national-code {
      min-width: 140px;
      width: 100%;
    }

    &--status {
      min-width: 140px;
      width: 140px;
      justify-content: center;
    }

    &--score {
      min-width: 140px;
      width: 140px;
      justify-content: center;

      button {
        margin: 4px 0;
      }
    }
  }

  &__download {

    &-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      margin-top: 3rem;
    }

    width: 100%;
    margin-top: 2rem;

    &--back {
      width: 100%;
    }

  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {

  .report {

    &__download {

      &-wrapper {
        flex-direction: row;
      }

      width: 240px;
    }
  }
}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {

}

// extra large devices (desktops, 768px and up)
@media (min-width: 1199.98px) {

}
</style>

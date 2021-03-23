<template>
  <div class="manager">
    <div class="manager__statics-wrapper">
      <div class="manager__students">
        <div class="manager__students--details">
          <div class="manager__students--label">
            دانش آموزان
          </div>
          <div class="manager__students--number">
            {{232}} {{'نفر'}}
          </div>
        </div>
      </div>
      <div class="manager__teachers">
        <div class="manager__teachers--details">
          <div class="manager__teachers--label">
            معلم ها
          </div>
          <div class="manager__teachers--number">
            {{23}} {{'نفر'}}
          </div>
        </div>
      </div>
      <div class="manager__classes">
        <div class="manager__classes--details">
          <div class="manager__classes--label">
            کلاس ها
          </div>
          <div class="manager__classes--number">
            {{8}} {{'عدد'}}
          </div>
        </div>
      </div>
    </div>
    <div class="manager__exams-wrapper box">
      <div class="manager__exams-title">
        آزمون ها
      </div>
      <div class="manager__list tbl">
        <div class="manager__list--header tbl-header">
          <!-- <div class="manager__list--select tbl-cell">
            <input type="checkbox" name="" id="">
          </div> -->
          <div class="manager__list--lessonTitle tbl-cell ">
            نام درس
          </div>
          <div class="manager__list--lessonCode tbl-cell">
            کد درس
          </div>
          <div class="manager__list--date tbl-cell">
            تاریخ
          </div>
          <div class="manager__list--time tbl-cell">
            ساعت
          </div>
          <div class="manager__list--teacherName tbl-cell">
            معلم
          </div>
          <div class="manager__list--status tbl-cell">
            وضعیت
          </div>
          <div class="manager__list--report tbl-cell">
            کارنامه
          </div>
        </div>
        <div v-for="(exam, index) in examList" :key="index" class="tbl-row">
          <!-- <div class="manager__list--select tbl-cell">
            <input type="checkbox" name="" :id="index">
          </div> -->
          <div class="manager__list--lessonTitle tbl-cell ">
            {{exam.lessonTitle}}
          </div>
          <div class="manager__list--lessonCode tbl-cell">
            {{exam.lessonCode}}
          </div>
          <div class="manager__list--date tbl-cell">
            {{exam.date}}
          </div>
          <div class="manager__list--time tbl-cell">
            {{exam.time}}
          </div>
          <div class="manager__list--teacherName tbl-cell">
            {{exam.teacherName}}
          </div>
          <div class="manager__list--status tbl-cell">
            {{exam.status}}
          </div>
          <div class="manager__list--report tbl-cell">
            {{exam.report}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import SingleExam from '~/components/admin/SingleExam'

export default {
  layout: 'managerLayout',
  components: {
  },
  data() {
    return {
      examList: [
        {
          id: '1',
          lessonTitle: 'ریاضی',
          lessonCode: '1250',
          date: '10/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
        },
        {
          id: '2',
          lessonTitle: 'علوم',
          lessonCode: '1251',
          date: '11/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
        },
        {
          id: '3',
          lessonTitle: 'ادبیات',
          lessonCode: '1252',
          date: '13/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
        },
        {
          id: '4',
          lessonTitle: 'دین و زندگی',
          lessonCode: '1253',
          date: '14/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
        },
        {
          id: '5',
          lessonTitle: 'انگلیسی',
          lessonCode: '1254',
          date: '15/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
        },
        {
          id: '6',
          lessonTitle: 'زبان فارسی',
          lessonCode: '1255',
          date: '16/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
        },
        {
          id: '7',
          lessonTitle: 'عربی',
          lessonCode: '1256',
          date: '17/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
        },
        {
          id: '8',
          lessonTitle: 'آمار واحتمالات',
          lessonCode: '1257',
          date: '18/02/1400', 
          time: '10:00 تا 10:30',
          teacherName: 'محمد کریمی', 
          status: 'پیش رو', 
          report: 'دانلود',
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
    goToNewClassRegistration() {
      this.$router.push('/manager/classRegistration');
    },
  },
  async mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.manager {

  &__statics {

    &-wrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      box-shadow: 0 3px 6px 0 rgba(32, 33, 36, 0.06);
      padding: 2rem;
      background-color: #fff;
      border-radius: 6px;
      flex-direction: column;
    }
  }

  &__students {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #fff;
    box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-bottom: 32px;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    background-color: lighten($yellow-color, 15%);
    cursor: pointer;

    &--number {
      color: #d89c00;
      font-size: 16px;
      text-align: center;
    }

    &--label {
      color: #d89c00;
      font-size: 18px;
      margin-bottom: 8px;
    }

    &--icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      margin-left: 0.75rem;
    }
  }

  &__teachers {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #fff;
    box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-bottom: 32px;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    background-color: lighten($purple-color, 15%);
    cursor: pointer;

    &--number {
      color: #9a00d6;
      font-size: 16px;
      text-align: center;
    }

    &--label {
      color: #9a00d6;
      font-size: 18px;
      margin-bottom: 8px;
    }

    &--icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      margin-left: 0.75rem;
    }
  }

  &__classes {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #fff;
    box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    background-color: lighten($blue-color, 15%);
    cursor: pointer;

    &--number {
      color: #0077de;
      font-size: 16px;
      text-align: center;
    }

    &--label {
      color: #0077de;
      font-size: 18px;
      margin-bottom: 8px;
    }

    &--icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      margin-left: 0.75rem;
    }
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

    &--lessonTitle {
      min-width: 120px;
      width: 100%;
    }

    &--lessonCode {
      min-width: 80px;
      width: 50%;
    }

    &--date {
      min-width: 100px;
      width: 100%;
    }

    &--time {
      min-width: 120px;
      width: 100%;
    }

    &--teacherName {
      min-width: 100px;
      width: 100%;
    }

    &--status {
      min-width: 90px;
      width: 90px;
    }

    &--report {
      min-width: 90px;
      width: 90px;
    }
  }

  &__exams {

    &-title {
      font-weight: bold;
      margin-bottom: 2rem;
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {

}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {

.manager {

  &__statics {

    &-wrapper {
      flex-direction: row;
    }
  }

  &__students {
    width: 33%;
    margin-left: 24px;
    margin-bottom: 0;
  }

  &__teachers {
    width: 33%;
    margin: 0 24px;
    margin-bottom: 0;
  }

  &__classes {
    width: 33%;
    margin-right: 24px;
    margin-bottom: 0;
  }
}

}

// extra large devices (desktops, 768px and up)
@media (min-width: 1199.98px) {
  .manual-registration {

    &__wrapper {
      margin: 0 120px;
    }
  }

  .upload-registration {

    &__wrapper {
      margin: 0 120px;
    }
  }

}
</style>

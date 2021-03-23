<template>
  <div class="teacher">
    <div class="teacher__statics-wrapper">
      <div class="teacher__statics--toolbar">
        <button class="button button--yellow">
          + آزمون جدید
        </button>
      </div>
    </div>

    <div class="exams">
      <SingleExam :examList="examList" />
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import SingleExam from '~/components/admin/SingleExam'

export default {
  layout: 'managerLayout',
  components: {
    SingleExam
  },
  data() {
    return {
      examList: [
        {
          id: '1',
          lessonTitle: 'ریاضی',
          testCode: '1250',
          date: '10/02/1400', 
          startTime: '10:00',
          endTime: '11:00 ',
          status: 'پیش‌رو', 
          report: 'دانلود',
        },
        {
          id: '2',
          lessonTitle: 'ریاضی',
          testCode: '1250',
          date: '10/02/1400', 
          startTime: '10:00',
          endTime: '11:00 ',
          status: 'پیش‌رو', 
          report: 'دانلود',
        },
        {
          id: '3',
          lessonTitle: 'ریاضی',
          testCode: '1250',
          date: '10/02/1400', 
          startTime: '10:00',
          endTime: '11:00 ',
          status: 'پیش‌رو', 
          report: 'دانلود',
        },
        {
          id: '4',
          lessonTitle: 'ریاضی',
          testCode: '1250',
          date: '10/02/1400', 
          startTime: '10:00',
          endTime: '11:00 ',
          status: 'پیش‌رو', 
          report: 'دانلود',
        },
        {
          id: '5',
          lessonTitle: 'ریاضی',
          testCode: '1250',
          date: '10/02/1400', 
          startTime: '10:00',
          endTime: '11:00 ',
          status: 'پیش‌رو', 
          report: 'دانلود',
        },
        {
          id: '6',
          lessonTitle: 'ریاضی',
          testCode: '1250',
          date: '10/02/1400', 
          startTime: '10:00',
          endTime: '11:00 ',
          status: 'پیش‌رو', 
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
  },
  async mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.teacher {

  &__statics {
      display: flex;
      flex-direction: column;
      width: 100%;

    &-wrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      // padding: 2rem 0;
    }

    &--toolbar {
      display: flex;
      width: 100%;
      // margin-bottom: 16px;
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
  .teacher {

    &__statics {
      flex-direction: row;

      &-wrapper {
        // flex-direction: row;
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

}
</style>

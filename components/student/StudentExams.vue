<template>
  <div v-if="!getIsExamsLoadingActive">
    <div v-if="isExamListEmpty" class="courses__list">
      <div v-for="(exam, index) in examsList" class="courses__single" :key="index">
        <div class="courses__image-wrapper">
          <img class="courses__image" src="~/assets/images/books/book_placeholder.svg" alt="">
          <span v-if="exam.type === 'NOW' || exam.type === 'UPCOMING'" class="courses__image-badge" v-text="timeDifference(exam.date)"></span>
        </div>
        <div class="courses__details-wrapper">
          <div class="courses__details">
            <div class="courses__title-wrapper">
              <div class="courses__title-label">
                درس:
              </div>
              <div class="courses__title-value">
                {{exam.lessonTitle}}
              </div>
            </div>
            <div class="courses__lesson-code-wrapper">
              <div class="courses__lesson-code-label">
                کد درس:
              </div>
              <div class="courses__lesson-code-value">
                {{exam.lessonCode}}
              </div>
            </div>
            <div class="courses__date-wrapper">
              <div class="courses__date-label">
                تاریخ آزمون:
              </div>
              <div class="courses__date-value">
                {{exam.date | moment("jYYYY/jM/jD")}}
              </div>
            </div>
            <div class="courses__time-wrapper">
              <div class="courses__time-label">
                ساعت آزمون:
              </div>
              <div class="courses__time-value">
                {{exam.startTime}} تا {{exam.endTime}}
              </div>
            </div>
          </div>
          <div v-if="exam.type === 'CORRECTED'" class="courses__result-wrapper">
            <div class="courses__result courses__result--active" @click="openReport(exam)">
              نتیجه آزمون
            </div>
          </div>
          <div v-if="exam.type === 'CORRECTING'" class="courses__result-wrapper">
            <div class="courses__result">
              درحال تصحیح
            </div>
          </div>
          <div v-if="exam.type === 'NOW'" class="courses__start-wrapper">
            <div class="courses__start courses__start--active" @click="goToExam(exam.testID)">
              شروع آزمون
            </div>
          </div>
          <div v-if="exam.type === 'UPCOMING'" class="courses__start-wrapper">
            <div class="courses__start">
              شروع آزمون
            </div>
          </div>
          <div v-if="exam.type === 'ABSENT'" class="courses__absent-wrapper">
            <div class="courses__absent">
              غایب
            </div>
          </div>
        </div>
      </div>

      <b-modal ref="modal-report" id="modal-report" hide-header centered>
        <div style="margin: 30px 0; text-align: center; font-size: 20px;font-weight: bold;">
          نمره آزمون {{currentReport.name}}: <b-badge variant="info">{{currentReport.score | filterDecimals}}</b-badge>
        </div>
        <template #modal-footer="{ ok }">
          <div style="display: flex; justify-content: space-between;width: 100%;">
            <b-button size="sm" variant="success" @click="ok()">
              بستن
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <div v-else v-html="noResultMessage" class="courses__message">
    </div>
  </div>
  <Loading v-else :isOverlay="false" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Loading from '~/components/common/Loading'

export default {
  props:['examsList', 'isLoading'],
  components: {
    Loading,
  },
  data() {
    return {
      currentDate: moment().format(),
      currentReport: [],
    }
  },
  filters: {
    filterDecimals(value) {
      if (!value) return 0;
      let number = null;
      if (Number(value) === value && value % 1 !== 0) {
        let decimalCount = 2;
        return value.toFixed(decimalCount)
      }
      if (Number(value) === value && value % 1 === 0) {
        return value
      }
    },
  },
  computed: {
    ...mapGetters([
      'getIsExamsLoadingActive',
    ]),
    isExamListEmpty() {
      return this.examsList.length;
    },
    noResultMessage() {
      return `آزمونی برای شما وجود ندارد`
    },
  },
  methods: {
    ...mapActions([
      'fetchExamQuestion',
      'examReport',
    ]),
    // timeCompare(startTime, endTime) {
    //   let time = moment().format('HH:mm:ss');
    //   let result = null;
    //   let isBigger = false;
    //   let isSmaller = false;
    //   if(time >= startTime) {
    //     isBigger = true;
    //   };
    //   if(time <= endTime) {
    //     isSmaller = true;
    //   };

    //   if (isBigger && isSmaller) {
    //     result = 'BETWEEN';
    //   };
    //   if (!isBigger && isSmaller) {
    //     result = 'SMALLER';
    //   };
    //   if (isBigger && !isSmaller) {
    //     result = 'BIGGER';
    //   };
    //   return result;
    // },
    async goToExam(testId) {
      let result = await this.fetchExamQuestion(testId);
      if (result) {
        this.$router.push({path:'/student/examStart', query: {testID: testId}});
      }
    },
    async openReport(exam) {
      let result = await this.examReport(exam.testID);
      if(result && result.success === true) {
        this.currentReport = {...result.data, name: exam.lessonTitle};
        this.$refs['modal-report'].show();
      }
    },
    timeDifference(date) {
      let date1 = new Date(moment(date).format('YYYY/MM/DD'));
      let date2 = new Date(moment(this.currentDate).format('YYYY/MM/DD'));
      const diffTime = (date1 - date2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= 0) {
        return diffDays ? diffDays + ' روز دیگر' : 'امروز';
      } else {
        return 'گذشته'
      }
    },
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
  .courses {

    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    &__single {
      display: flex;
      margin-bottom: 24px;
      padding: 15px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
      width: 100%;
    }

    &__image {
      width: 100%;
      min-width: 100px;
      position: relative;

      &-wrapper {
        position: relative;
        max-width: 100px;
        min-width: 100px;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
        box-shadow: 0px 8px 13px -6px #ccc;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      }

      &-badge {
        position: absolute;
        top: 6px;
        right: -2px;
        font-size: 10px;
        font-weight: bold;
        color: #fff;
        background-color: #fdbc11;
        padding: 4px 6px 4px 12px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        box-shadow: -2px 2px 2px 0px rgba(72, 72, 72, 0.18);
      }
    }

    &__details {
      text-align: right;
      // margin-right: 14px;
      font-size: 13px;
      width: 100%;

      &-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 20px;
        width: 100%;
      }
    }

    &__title {

      &-wrapper {
        display: flex;
        margin-bottom: 3px;
      }

      &-label {
        width: 100%;
        max-width: 32px;
        margin-left: 6px;
      }

      &-value {
        width: 100%;
        color: #8a8a8a;
      }
    }

    &__lesson-code {

      &-wrapper {
        display: flex;
        margin-bottom: 3px;
      }

      &-label {
        margin-left: 6px;
        width: 100%;
        max-width: 63px;
      }

      &-value {
        color: #8a8a8a;
      }

    }

    &__date {

      &-wrapper {
        display: flex;
        margin-bottom: 3px;
      }

      &-label {
        margin-left: 6px;
        width: 100%;
        max-width: 63px;
      }

      &-value {
        color: #8a8a8a;
      }

    }

    &__time {

      &-wrapper {
        display: flex;
        margin-bottom: 3px;
      }

      &-label {
        margin-left: 6px;
        width: 100%;
        max-width: 70px;

      }

      &-value {
        color: #8a8a8a;
      }
    }

    &__start {
      opacity: 0.58;
      // font-size: 10px;
      background-color: #28a745;
      color: #fff;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 0.375rem 0.75rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      width: 100%;
      transition: all 0.15s ease-in-out;

      &-wrapper {
        display: flex;
      }

      &--active {
        opacity: 1;
        background-color: #28a745;
        color: #fff;
        font-weight: normal;
        cursor: pointer;
        font-size: 1rem;
        box-shadow: 0px 8px 13px -6px #ccc;
        line-height: 30px;

        &:hover {
          background-color: darken(#28a745, 3%);
        }

        &:active {
          background-color: darken(#28a745, 7%) !important;
        }
      }
    }

    &__result {
      color: #fdbc11;
      font-weight: bold;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 0.375rem 0.75rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      width: 100%;
      transition: all 0.15s ease-in-out;

      &-wrapper {
        display: flex;
      }

      &--active {
        text-align: center;
        background-color: #fdbc11;
        color: #fff;
        font-weight: normal;
        cursor: pointer;
        box-shadow: 0px 8px 13px -6px #ccc;
        line-height: 30px;

        &:hover {
          background-color: darken(#fdbc11, 3%);
        }

        &:active {
          background-color: darken(#fdbc11, 7%) !important;
        }
      }
    }

    &__absent {
      opacity: 0.58;
      font-size: 1rem;
      background-color: #ccc;
      color: #000;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 0.375rem 0.75rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      width: 100%;
      transition: all 0.15s ease-in-out;

      &-wrapper {
        display: flex;
      }
    }

    &__message {
      margin-bottom: 16px;
      width: 100%;
      text-align: right;
      background: #fff;
      padding: 12px;
      border-radius: 6px;
      color: #989898;
      box-shadow: 0 3px 6px 0 rgba(32, 33, 36, 0.06);
    }
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 767.98px) {
    .courses {
      &__single {
        width: 332px;
        margin-left: 24px;
      }

      &__single:nth-child(2n+0) {
        margin-left: 0px;
      }
    }
  }

  // large devices (laptops, 768px and up)
  @media (min-width: 991.98px) {
    .courses {
      &__single {
        width: 452px;
        margin-left: 24px;
      }

      &__single:nth-child(2n+0) {
        margin-left: 0px;
      }
    }
  }

  // extra large devices (desktops, 768px and up)
  @media (min-width: 1199.98px) {
    .courses {
      &__single {
        width: 354px;
        margin-left: 24px;
      }

      &__single:nth-child(2n+0) {
        margin-left: 24px;
      }

      &__single:nth-child(3n+0) {
        margin-left: 0px;
      }
    }
  }

</style>

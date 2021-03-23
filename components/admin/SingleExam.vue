<template>
  <div v-if="isExamListEmpty" class="">
    <div class="exams__list">
      <div class="exams__list">
        <div class="exams__single-wrapper" v-for="(exam, index) in examList" :key="index">
          <div class="exams__single">
            <div class="exams__details-wrapper">
              <div class="exams__details">
                <div class="exams__setting-wrapper">
                  <!-- <div class="exams__setting" ref="examsSetting" @click="openSetting(index)">
                    &#9883;
                    <ul :class="{'exams__setting--active' : isSettingOpen && currentExam === index}" class="exams__setting--menu">
                      <li class="exams__setting--item">
                        ویرایش
                      </li>
                      <li class="exams__setting--item">
                        حذف
                      </li>
                    </ul>
                  </div> -->

                  <b-dropdown size="md" variant="link" menu-class="form__dropdown--menu" toggle-class="form__dropdown form__dropdown--icon" no-caret>
                    <template #button-content>
                      &#9883;
                    </template>
                    <b-dropdown-item href="#" class="form__dropdown--link">ویرایش</b-dropdown-item>
                    <b-dropdown-item href="#" class="form__dropdown--link">حذف</b-dropdown-item>
                  </b-dropdown>

                </div>
                <div class="exams__title-wrapper">
                  <div class="exams__title-label">
                    آزمون:
                  </div>
                  <div class="exams__title-value">
                    {{exam.lessonTitle}}
                  </div>
                </div>
                <div class="exams__code-wrapper">
                  <div class="exams__code-label">
                    کد آزمون:
                  </div>
                  <div class="exams__code-value">
                    {{exam.testCode}}
                  </div>
                </div>
                <div class="exams__date-wrapper">
                  <div class="exams__date-label">
                    تاریخ آزمون:
                  </div>
                  <div class="exams__date-value">
                    {{exam.date}}
                  </div>
                </div>
                <div class="exams__time-wrapper">
                  <div class="exams__time-label">
                    ساعت آزمون:
                  </div>
                  <div class="exams__time-value">
                    {{exam.startTime}} تا {{exam.endTime}}
                  </div>
                </div>
                <div class="exams__status-wrapper">
                  <div class="exams__status-label">
                    وضعیت:
                  </div>
                  <div class="exams__status-value">
                    {{exam.status}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else v-html="noResultMessage" class="exams__message">
    <!-- نتیجه ای برای عبارت {{getAdminExamSearch}} در آزمون ها وجود ندارد -->
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'jalali-moment'

export default {
  props:['examList', 'onlyActive'],
  components: {
  },
  data() {
    return {
      isSettingOpen: false,
      currentExam: null,
    }
  },
  computed: {
    ...mapGetters([
    ]),
    isExamListEmpty() {
      return this.examList.length;
    },

  },
  methods: {
    ...mapActions([
    ]),
    toggleSetting(item) {
      this.isSettingOpen = !this.isSettingOpen;
      this.currentExam = item;
      // console.log(item)
    }, 
    closeSetting() {
      this.isSettingOpen = false;
      this.currentExam = null;
    },
    openSetting(item) {
      this.isSettingOpen = true;
      this.currentExam = item;
        // console.log('openSetting')
    },
    documentClick(e) {
      console.log(this.$refs.examsSetting.length)
      let el = this.$refs.examsSetting.length ? this.$refs.examsSetting[this.currentExam] : null;
      let target = e.target
      console.log(el)
      console.log(target)
      console.log(this.currentExam)
      if (el && (el !== target) && !el.contains(target)) {
        this.closeSetting();
      }

      // el.map((item, index) => {
      //   if ( (item !== target) && !item.contains(target)) {
      //     this.closeSetting();
      //   console.log('yes')
      //   } else {
      //     this.openSetting(index);
      //   console.log('no')
      //   }
      // })

    },
  },
  async mounted() {
  },
  created () {
    // document.addEventListener('click', this.documentClick)
  },
  destroyed () {
    // document.removeEventListener('click', this.documentClick)
  },
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.exams {

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  &__single {
    display: flex;
    width: 100%;
    padding: 1rem 2rem;
    position: relative;

    &-wrapper {
      display: flex;
      margin-bottom: 24px;
      background: #fff;
      border-radius: 10px;
      width: 100%;
      box-shadow: 0 3px 6px 0 rgba(32, 33, 36, 0.06);
    }
  }

  &__details {
    text-align: right;
    font-size: 1rem;
    width: 100%;

    &-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__setting {

    &-wrapper {
      position: absolute;
      left: 8px;
      top: 8px;
    }

    // &--menu {
    //   list-style: none;
    //   padding: 0px;
    //   margin: 0;
    //   width: 120px;
    //   min-height: 80px;
    //   background-color: #f5f5f5;
    //   position: absolute;
    //   left: 4px;
    //   top: 32px;
    //   border-bottom-left-radius: 6px;
    //   border-bottom-right-radius: 6px;
    //   font-size: 1rem;
    //   display: none;
    //   border: 1px solid #e8e8e8;
    // }

    &--active {
      display: block;
    }

    &--item {
      cursor: pointer;
      font-size: 14px;
      color: #888;
      text-align: right;
      padding: 4px 16px;
      border-bottom: 1px solid #e8e8e8;

      &:hover {
        background-color: darken(#efefef, 1%);
      }
    }

    &--item:last-child {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border-bottom: none;
    }

  }

  &__title {

    &-wrapper {
      display: flex;
      margin-bottom: 4px;
    }

    &-label {
      width: 100%;
      max-width: 100px;
      margin-left: 6px;
      color: #8a8a8a;
    }

    &-value {
      width: 100%;
    }
  }

  &__code {

    &-wrapper {
      display: flex;
      margin-bottom: 4px;
    }

    &-label {
      width: 100%;
      max-width: 100px;
      margin-left: 6px;
      color: #8a8a8a;
    }

    &-value {
    }
  }

  &__date {

    &-wrapper {
      display: flex;
      margin-bottom: 4px;
    }

    &-label {
      margin-left: 6px;
      width: 100%;
      max-width: 100px;
      color: #8a8a8a;
    }

    &-value {
    }

  }

  &__time {

    &-wrapper {
      display: flex;
      margin-bottom: 4px;
    }

    &-label {
      margin-left: 6px;
      width: 100%;
      max-width: 100px;
      color: #8a8a8a;

    }

    &-value {
    }
  }

  &__status {
    
    &-wrapper {
      display: flex;
      margin-bottom: 4px;
      margin-top: 16px;
    }

    &-label {
      margin-left: 6px;
      width: 100%;
      max-width: 100px;
      color: #8a8a8a;

    }

    &-value {
      // width: 100%;
      // border-radius: 4px;
      // border: 2px solid rgb(122, 122, 122); 
      // color: rgb(122, 122, 122);
      // text-align: center;
      // height: 40px;
      // line-height: 34px;
    }
  }
}

  // Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {
  .exams {

    &__single {

      &-wrapper {
        width: 332px;
        margin-left: 24px;
      }
    }

    &__single {

      &-wrapper:nth-child(2n+0) {
        margin-left: 0px;
      }
    }
  }
}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {
  .exams {
    &__single {

      &-wrapper {
        width: 452px;
        margin-left: 24px;
      }
    }

    &__single {

      &-wrapper:nth-child(2n+0) {
        margin-left: 0px;
      }
    }
  }
}

// extra large devices (desktops, 768px and up)
@media (min-width: 1199.98px) {
  .exams {

    &__single {

      &-wrapper {
        width: 354px;
        margin-left: 24px;
      }
    }

    &__single {

      &-wrapper:nth-child(2n+0) {
        margin-left: 24px;
      }
    }

    &__single {

      &-wrapper:nth-child(3n+0) {
        margin-left: 0px;
      }
    }
  }

}
</style>

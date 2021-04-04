<template>
  <div class="teacher box">
    <div class="row">
      <div class="col-12 col-lg-5">
        <b-form class="teacher__form">
          <b-form-group label="کلاس:" label-for="tags-with-dropdown">
            <b-form-tags 
              id="tags-with-dropdown" 
              v-model="selectedClasses" 
              size="lg" 
              no-outer-focus 
              class="teacher__select mb-2"
            >
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <b-dropdown 
                  block 
                  no-caret 
                  variant="link"
                  menu-class="w-100 "
                  toggle-class="form__dropdown text-decoration-none"
                >
                  <template #button-content>
                    <div 
                      class="teacher__select--title "
                      :class="{'form__select--invalid': isSelectedClassEmpty}"
                    >
                      کلاس های مورد نظر برای امتحان را انتخاب کنید
                    </div>
                    <span v-if="isSelectedClassEmpty === true" class="form__select--invalid-message">
                      لطفا کلاس های مورد امتحان را انتخاب کنید
                    </span>

                  </template>
                  <b-dropdown-form @submit.stop.prevent="() => {}">
                    <b-form-group
                      label="جستجوی نام کلاس"
                      label-for="tag-search-input"
                      label-cols-md="auto"
                      class="mb-0"
                      label-size="sm"
                      :description="classesSearchDesc"
                      :disabled="disabled"
                    >
                      <b-form-input
                        v-model="search"
                        id="tag-search-input"
                        type="search"
                        size="sm"
                        autocomplete="off"
                      ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item-button
                    v-for="option in availableClassList"
                    :key="option"
                    @click="onOptionClick({ option, addTag })"
                    button-class="form__dropdown--item"
                    class="form__dropdown--item"
                  >
                    {{ option }}
                  </b-dropdown-item-button>
                  <b-dropdown-text v-if="availableClassList.length === 0">
                    کلاسی وجود ندارد
                  </b-dropdown-text>
                </b-dropdown>

                <ul v-if="tags.length > 0" class="teacher__select--tags list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      class="teacher__select--tag"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>
              </template>
            </b-form-tags>
          </b-form-group>
          <b-form-group id="input-group-1" label="درس:" label-for="input-1">
            <b-form-select
              id="input-1"
              class="form__select"
              :class="{'form__select--invalid': isSelectedLessonEmpty}"
              v-model="selectedLesson"
              :options="lessonList"
              @input="validateLesson()"
            >
            </b-form-select>
            <span v-if="isSelectedLessonEmpty === true" class="form__select--invalid-message">
              لطفا درس را انتخاب کنید
            </span>
          </b-form-group>
          <b-form-group id="input-group-2" label="نوع آزمون:" label-for="input-2">
            <b-form-select
              id="input-2"
              class="form__select"
              :class="{'form__select--invalid': isSelectedExamTypeEmpty}"
              v-model="selectedExamType"
              :options="examType"
              @input="validateExamType()"
            >
            </b-form-select>
            <span v-if="isSelectedExamTypeEmpty === true" class="form__select--invalid-message">
              لطفا نوع آزمون را انتخاب کنید
            </span>
          </b-form-group>
          <!-- <MathLiveInput :config="config" v-model="formula" v-on:input="input()"></MathLiveInput>
          {{formula}} -->
          <b-form-group id="input-group-3" label="تاریخ آزمون:" label-for="input-3">
            <b-form-input
              id="input-3"
              placeholder="تاریخ آزمون را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isExamDateEmpty === true}"
              v-model="examDate"
              autocomplete="off"
              @input="validateExamDate()"
            ></b-form-input>
            <span v-if="isExamDateEmpty === true" class="form__input--invalid-message">
              لطفا تاریخ آزمون را وارد کنید
            </span>
            <datePicker element="input-3" v-model="examDate" color="#fdbc11" auto-submit @input="validateExamDate()" />
          </b-form-group>
          <b-form-group id="input-group-4" label="ساعت شروع آزمون:" label-for="input-4">
            <b-form-input
              id="input-4"
              placeholder="ساعت شروع آزمون را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isExamStartTimeEmpty === true}"
              autocomplete="off"
              @input="validateExamStartTime()"
              v-model="examStartTime"
            ></b-form-input>
            <span v-if="isExamStartTimeEmpty === true" class="form__input--invalid-message">
              لطفا ساعت شروع آزمون را وارد کنید
            </span>
            <datePicker type="time" :jumpMinute="15" :roundMinute="true" element="input-4" v-model="examStartTime" color="#fdbc11" auto-submit @input="validateExamStartTime()" />
          </b-form-group>
          <b-form-group id="input-group-5" label="ساعت پایان آزمون:" label-for="input-5">
            <b-form-input
              id="input-5"
              placeholder="ساعت پایان آزمون را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isExamEndTimeEmpty === true}"
              v-model="examEndTime"
              autocomplete="off"
              @input="validateExamEndTime()"
            ></b-form-input>
            <span v-if="isExamEndTimeEmpty === true" class="form__input--invalid-message">
              لطفا ساعت پایان آزمون را وارد کنید
            </span>
            <datePicker type="time" :jumpMinute="15" :roundMinute="true" element="input-5" v-model="examEndTime" color="#fdbc11" auto-submit @input="validateExamEndTime()" />
          </b-form-group>

          <div class="teacher__upload">
            <div class="row">
              <div class="col-12">
                <div class="teacher__upload--button" @click="openUploadDialog()">
                  + آپلود سوالات
                </div>
              </div>
              <b-form-file
                id="js-uploadQuestion"
                class="teacher__upload--question"
                plain accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"
                v-model="questionFile"
                @change="setFile($event)"
              >
              </b-form-file>

              <b-modal id="upload-modal" ref="upload-modal" size="xl">
                <template #modal-header="{}">
                  <h5>آپلود سوالات</h5>
                </template>

                <div class="modal__content">
                  <div class="row">
                    <div class="col-6 col-md-4 col-lg-3">
                      <div>
                        تصحیح اتوماتیک
                      </div>
                    </div>
                    <div class="col-6 col-md-8 col-lg-9">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          id="btn-radios-1"
                          v-model="examTypeSelected"
                          :options="examTypeOptions"
                          :aria-describedby="ariaDescribedby"
                          name="radios-btn-default"
                        ></b-form-radio-group>
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-4 col-lg-3">
                      <div>
                        نمره سوالات تشریحی:
                      </div>
                    </div>
                    <div class="col-6 col-md-8 col-lg-9">
                      <b-form-group id="input-group-1" label-for="input-1">
                        <b-form-input
                          id="input-1"
                          placeholder="نمره سوالات تشریحی را وارد کنید"
                          class="form__input"
                          :class="{'form__input--invalid' : isFirstNameEmpty === true}"
                          v-model="firstName"
                          @input="validateFirstName()"
                        ></b-form-input>
                        <span v-if="isFirstNameEmpty === true" class="form__input--invalid-message">
                          لطفا نام دانش آموز را وارد کنید
                        </span>
                      </b-form-group>
                    </div>
                    <div class="col-12">
                      <div class="modal__question-preview">
                        <div class="modal__question-preview-title">
                          پیش نمایش سوالات
                        </div>
                        <div class="mb-4">
                          <div>
                          1- گزینه درست را انتخاب کنید
                          </div>
                          <div class="pr-3">
                            <div>
                              الف) گزینه اول
                              <b-badge variant="success">گزینه صحیح</b-badge>
                            </div>
                            <div>
                              ب) گزینه دوم
                            </div>
                            <div class="border border-danger rounded">
                              ج) گزینه سوم
                            </div>
                            <div>
                              د) گزینه چهارم
                            </div>
                          </div>
                        </div>

                        <div class="mb-4">
                          <div>
                          2- گزینه درست را انتخاب کنید
                          </div>
                          <div class="pr-3">
                            <div>
                              الف) گزینه اول
                            </div>
                            <div>
                              ب) گزینه دوم
                            </div>
                            <div class="border border-success rounded">
                              ج) گزینه سوم
                              <b-badge variant="success">گزینه صحیح</b-badge>
                            </div>
                            <div>
                              د) گزینه چهارم
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <template #modal-footer="{ ok, cancel }">
                  <div class="modal__footer">
                    <b-button variant="success" @click="ok()">
                      تایید
                    </b-button>
                    <b-button variant="outline-danger" @click="cancel()">
                      انصراف
                    </b-button>
                  </div>
                </template>
              </b-modal>

              <div class="col-12">
                <div v-b-modal.help-modal class="teacher__upload--help">
                  راهنمای آپلود سوالات
                </div>
              </div>
            </div>
            <b-modal id="help-modal" title="">
              <div class="help">
                <div class="help__title">

                </div>
                <div class="help__content">
                  <div class="my-4">شما می توانید با آپلود فایل های Word و PDF سوالات امتحان را وارد کنید. برای نتیجه بهتر، استفاده از فایل Word پیشنهاد می شود.</div>
                  <ul>
                    <li>
                      <div>
                        صورت سوال به استفاده از شماره سوال و خط فاصله مشخص می شود. مثال:
                      </div>
                      <div>
                        ۱- کدام یک از موارد زیر...
                      </div>
                      <div>
                        15- گزینه درست را...
                      </div>
                    </li>
                    <li>
                      <div>
                        برای سوالات چهار گزینه ای، گزینه های هر سوال را بعد از سوال و با استفاده از الف، ب، ج، د و یک پرانتز مشخص کنید. مثال:
                      </div>
                      <div>
                        1- در کدام یک از موارد زیر کربن دی اکسید مصرف می شود؟
                      </div>
                      <div>
                        الف) فتوسنتز
                      </div>
                      <div>
                        ب) تنفس
                      </div>
                      <div>
                        ج) تجزیه بدن جانداران
                      </div>
                      <div>
                        د) سوزانده سوخا های فسیلی
                      </div>
                    </li>
                    <li>
                      <div>
                        برای سوالات چهار گزینه ای، گزینه درست را با استفاده از دو پرانتز )) مشخص کنید. این کار برای تصحیح خودکار مورد نیاز است و در صورت مشخص نبودن گزینه درست با استفاده از )) نمره سوال روی بقیه سوالات تقسیم خواهد شد. مثال:
                      </div>
                      <div>
                        1- در کدام یک از موارد زیر کربن دی اکسید مصرف می شود؟
                      </div>
                      <div>
                        الف)) فتوسنتز
                      </div>
                      <div>
                        ب) تنفس
                      </div>
                      <div>
                        ج) تجزیه بدن جانداران
                      </div>
                      <div>
                        د) سوزانده سوخا های فسیلی
                      </div>

                      <div>
                        2- نوعی کربوهیدارت که حالت ژله اي دارد و از دیواره یاخته اي جلبک ها بدست می آید؟
                      </div>
                      <div>
                        الف) گرداب
                      </div>
                      <div>
                        ب) گلدان
                      </div>
                      <div>
                        ج) مرداب
                      </div>
                      <div>
                        د)) گل دار
                      </div>
                    </li>
                  </ul>
                  
                  <div>
                    در صورت لزوم می توانید از تصاویر، فرمول های ریاضی و شیمی برای هر سوال استفاده کنید.
                  </div>
                  <div class="help__link">
                    دانلود فایل فالب سوالات Word
                  </div>
                </div>
              </div>

              <template #modal-footer="{ ok }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <div class="button button--yellow" @click="ok()">
                  بستن
                </div>
              </template>
            </b-modal>
          </div>
          <div class="wizard__controls">
            <button class="wizard__controls--next button button--yellow" @click="addExam">ذخیره و جدید</button>
            <button class="wizard__controls--next button button--yellow">ذخیره و بستن</button>
            <button class="wizard__controls--back button button--yellow">انصراف</button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Steps from '~/components/common/Steps'
import datePicker from 'vue-persian-datetime-picker'
// import MathLive from "mathlive";
// import MathLiveInput from "~/components/common/MathLiveInput";

export default {
  layout: 'managerLayout',
  components: {
    Steps,
    datePicker,
    // MathLiveInput,
  },
  data() {
    return {
      // formula: 'f(x)',
      // config:{
      //   smartMode: false,
      //   virtualKeyboardMode: "manual",
      // },
      examTypeSelected: '1',
      examTypeOptions: [
        { text: 'بله', value: '1' },
        { text: 'خیر', value: '0' },
      ],
      questionFile: null,
      examDate: '',
      examStartTime: '',
      examEndTime: '',
      selectedLesson: null,
      selectedExamType: null,
      selectedClasses: [],
      isExamDateEmpty: null,
      isExamStartTimeEmpty: null,
      isExamEndTimeEmpty: null,
      isSelectedLessonEmpty: null,
      isSelectedExamTypeEmpty: null,
      isSelectedClassEmpty: null,
      search: '',
      lessonList: [
        {
          value: null,
          text: 'درس مورد نظر را انتخاب کنید',
        },
        {
          value: '1',
          text: 'ریاضی',
        },
        {
          value: '2',
          text: 'علوم',
        },
        {
          value: '3',
          text: 'دینی',
        },
      ],
      examType: [
        {
          value: null,
          text: 'نوع آزمون را انتخاب کنید',
        },
        {
          value: '1',
          text: 'میان ترم',
        },
        {
          value: '2',
          text: 'کلاسی',
        },
        {
          value: '3',
          text: 'پایانی نوبت اول',
        },
        {
          value: '4',
          text: 'پایانی نوبت دوم',
        },
        {
          value: '5',
          text: 'نظر سنجی',
        },
        {
          value: '6',
          text: 'متفرقه',
        },
      ],
      classList: ['7/1', '7/2', '7/3', '8/1', '8/2', '8/3', '9/1', '9/2', '9/3'],
      stepsData: [
        {
          id: '1',
          title: 'ثبت کلاس ها',
          active: false,
        },
        {
          id: '2',
          title: 'ثبت اطلاعات معلم ها', 
          active: true,
        },
        {
          id: '3',
          title: 'ثبت اطلاعات دانش آموزان', 
          active: false,
        },
      ],
      addedTeachers: [
        {
          id: '1',
          firstName: 'ظهیر',
          lastName: 'دژبرد',
          nationalCode: '3810260657',
        },
        {
          id: '2',
          firstName: 'کیوان',
          lastName: 'صمدی',
          nationalCode: '3721236589',
        },
        {
          id: '3',
          firstName: 'احمد',
          lastName: 'دژبرد',
          nationalCode: '3712345649',
        },
        {
          id: '4',
          firstName: 'سینا',
          lastName: 'فاتحی',
          nationalCode: '3523651247',
        },
        {
          id: '5',
          firstName: 'ظهیر',
          lastName: 'دژبرد',
          nationalCode: '3810260657',
        },
        {
          id: '6',
          firstName: 'کیوان',
          lastName: 'صمدی',
          nationalCode: '3721236589',
        },
        {
          id: '7',
          firstName: 'احمد',
          lastName: 'دژبرد',
          nationalCode: '3712345649',
        },
        {
          id: '8',
          firstName: 'سینا',
          lastName: 'فاتحی',
          nationalCode: '3523651247',
        },
      ],
    }
  },
  computed: {
    ...mapGetters([

    ]),
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableClassList() {
      const criteria = this.criteria
      // Filter out already selected classList
      const classList = this.classList.filter(opt => this.selectedClasses.indexOf(opt) === -1)
      if (criteria) {
        // Show only classList that match criteria
        return classList.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
      }
      // Show all classList available
      return classList
    },
    classesSearchDesc() {
      if (this.criteria && this.availableClassList.length === 0) {
        return 'کلاسی با این نام وجود ندارد'
      }
      return ''
    },
  },
  methods: {
    ...mapActions([
    ]),
    showHelpModal() {
      this.$refs['upload-modal'].show();
    },
    async setFile(event) {
      let file = event.target.files[0];
      console.log(file)
      this.showHelpModal();
      // let result = await this.uploadQuestionFile({testID: this.examList[index].testID, testFile: file})
      // if (result) {
        // this.setCurrentExamPreview({questions: result.questions, nameFile: result.lessonTitle, testID: this.examList[index].testID, index: index}, true, false);
        // this.updateExamList({index: index, isActive: true, nameFile: file.name, questions: result.questions, isPdf: false, pdfUrl: null,});
      // }
    },
    async onOptionClick({ option, addTag }) {
      await addTag(option)
      this.search = ''
    },
    addExam (e) {
      e.preventDefault()
      this.validateExam();
    },
    validateExamDate() {
      if (this.examDate == '') {
        this.isExamDateEmpty = true;
        return false;
      } else {
        this.isExamDateEmpty = false;
        return true;
      }
    },
    validateExamStartTime() {
      if (this.examStartTime == '') {
        this.isExamStartTimeEmpty = true;
        return false;
      } else {
        this.isExamStartTimeEmpty = false;
        return true;
      }
    },
    validateExamEndTime() {
      if (this.examEndTime == '') {
        this.isExamEndTimeEmpty = true;
        return false;
      } else {
        this.isExamEndTimeEmpty = false;
        return true;
      }
    },
    validateClasses() {
      console.log(this.selectedClasses);
      if (this.selectedClasses.length == 0) {
        this.isSelectedClassEmpty = true;
        return false;
      } else {
        this.isSelectedClassEmpty = false;
        return true;
      }
    },
    validateLesson() {
      if (this.selectedLesson == null) {
        this.isSelectedLessonEmpty = true;
        return false;
      } else {
        this.isSelectedLessonEmpty = false;
        return true;
      }
    },
    validateExamType() {
      if (this.selectedExamType == null) {
        this.isSelectedExamTypeEmpty = true;
        return false;
      } else {
        this.isSelectedExamTypeEmpty = false;
        return true;
      }
    },
    validateExam() {
      let checkExamDate = this.validateExamDate();
      let checkExamStartTime= this.validateExamStartTime();
      let checkExamEndTime = this.validateExamEndTime();
      let checkExamType = this.validateExamType();
      let checkLesson = this.validateLesson();
      let checkClasses = this.validateClasses();

      if (checkExamDate && checkExamStartTime && checkExamType && checkExamEndTime && checkLesson && checkClasses) {
        return true;
      } else {
        return false;
      }
    },
    input : function() {
      console.log(this.formula)
    },
    openUploadDialog() {
      let studentFileUploader = document.getElementById('js-uploadQuestion');
      studentFileUploader.click();
    },
  },
  async mounted() {
    // MathLive.renderMathInDocument();
    this.showHelpModal();
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.teacher {

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
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;

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

  &__upload {
    width: 100%;
    margin: 3rem 0;

    &--button {
      color: $yellow-color;
      border: 1px dashed $yellow-color;
      width: 100%;
      text-align: center;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-weight: bold;

      &:hover {
        background-color: $yellow-color;
        color: #fff;
      }

      &:active {
        background-color: darken($yellow-color, 5%);
        color: #fff;
      }

      &:focus {
        outline: none;
      }
    }

    &--help {
      color: $yellow-color;
      width: 100%;
      padding: 8px 0px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: darken($yellow-color, 7%);
      }

      &:active {
        color: darken($yellow-color, 7%);
      }

      &:focus {
        outline: none;
      }
    }

    &--question {
      display: none;
    }
  }
}

.modal {

  &__content {
    // display: flex;

    // &-title {
    //   margin-left: 2rem;
    // }
  }

  &__question-preview {

    &-title {
      font-weight: bold;
      margin-bottom: 1rem;
    }

  }

  &__footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
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

.help {

  &__link {
    color: $yellow-color;
    text-align: center;
    width: 100%;
    padding: 8px 0px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: darken($yellow-color, 7%);
    }

    &:active {
      color: darken($yellow-color, 7%);
    }

    &:focus {
      outline: none;
    }
  
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {
.teacher {

  &__select {

    &--title {
      font-size: 1rem;
    }
  }
}
}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {
  .wizard__controls {
    flex-direction: unset;

    &--next {
      width: unset;
      display: unset;
      margin-bottom: 0;
    }

    &--back {
      width: unset;
      display: unset;
    }
  }

}

// extra large devices (desktops, 768px and up)
@media (min-width: 1199.98px) {

}
</style>

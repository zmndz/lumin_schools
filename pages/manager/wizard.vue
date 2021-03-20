<template>
  <div class="wizard box">
    <div class="wizard__title box__title">
      روش وارد کردن اطلاعات را انتخاب کنید. در صورت آماده نبودن اطلاعات می توانید روی صرف نظر کلیک کنید.
    </div>
    <div class="wizard__container box__container">
      <div class="manual-registration__wrapper">
        <div class="manual-registration">
          <div class="manual-registration__button button button--yellow" @click="goToNewClassRegistration()">
            ثبت دستی
          </div>
          <div class="manual-registration__caption">
            در این روش اطلاعات معلم ها، کلاس ها و دانش آموزان به صورت یک به یک ثبت می شوند.
          </div>
        </div>
      </div>
      <div class="wizard__seprator">

      </div>
      <div class="upload-registration__wrapper">
        <div class="upload-registration">
          <div class="upload-registration__button button button--yellow" @click="openUploadDialog()">
            <b-form-file
              id="js-uploadRegistration"
              class="upload-registration__upload"
              plain accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"
              v-model="studentFile"
              @change="setFile($event)"
            >
            </b-form-file>
            <span class="upload-registration__button--icon">+</span>
            <span>
              آپلود فایل اکسل
            </span>
            <span>
              لیست دانش آموزان
            </span>
          </div>
          <div class="upload-registration__caption">
            در این روش اطلاعات دانش آموزان و کلاس ها به وسیله فایل اکسل ثبت شده، سپس تایید می شوند. اطلاعات معلم ها به صورت یک به یک وارد می شود.
          </div>
          <div class="upload-registration__link">
            دانلود نمونه فایل اکسل
          </div>
        </div>
      </div>
    </div>
    <button class="wizard__link button button--outline--yellow button--no-shadow">
      صرف نظر
    </button>
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
      studentFile: null,
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
    async setFile(event) {
      let file = event.target.files[0];
      console.log(file)
      // let result = await this.uploadQuestionFile({testID: this.examList[index].testID, testFile: file})
      // if (result) {
        // this.setCurrentExamPreview({questions: result.questions, nameFile: result.lessonTitle, testID: this.examList[index].testID, index: index}, true, false);
        // this.updateExamList({index: index, isActive: true, nameFile: file.name, questions: result.questions, isPdf: false, pdfUrl: null,});
      // }
    },
    openUploadDialog() {
      let studentFileUploader = document.getElementById('js-uploadRegistration');
      studentFileUploader.click();
    },

  },
  async mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

.wizard {

  &__title {
  }

  &__container {
    margin-top: 64px;
  }

  &__seprator {
    display: none;
    width: 2px;
    border-right: 2px dashed #ccc;
  }

  &__link { 
    margin: 24px 0;
  }
}

.manual-registration {

  &__wrapper {
    width: 240px;
    margin: 0 120px;
    margin-bottom: 64px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 140px;
  }

  &__caption {
    margin-top: 32px;
    line-height: 28px;
    text-align: justify;
  }
}

.upload-registration {

  &__wrapper {
    width: 240px;
    margin: 0 120px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 240px;
    height: 140px;

    &--icon {
      font-size: 58px;
      line-height: 46px;
    }
  }

  &__caption {
    margin-top: 32px;
    line-height: 28px;
    text-align: justify;
  }

  &__link {
    margin: 16px 0;
    color: $yellow-color;
    cursor: pointer;
    display: inline-block;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: darken($yellow-color, 5%);
      // border-bottom: 1px solid;
    }
  }

  &__upload {
    display: none;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {

}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {
  .wizard {

    &__container {
      flex-direction: row;
      justify-content: space-between;
      align-items: initial;
    }

    &__seprator {
      display: block;
    }
  }

  .manual-registration {

    &__wrapper {
      margin: 0 90px;
    }
  }

  .upload-registration {

    &__wrapper {
      margin: 0 90px;
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

<template>
  <div class="class box">
    <div class="wizard__controls">
      <Steps :steps="stepsData" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-5">
        <b-form @submit="addClass" class="class__form">
          <b-form-group id="input-group-2" label="نام کلاس را وارد کنید" label-for="input-2">
            <b-form-input
              id="input-2"
              placeholder="برای مثال ۷/۱ یا ۹/۳"
              class="form__input"
              :class="{'form__input--invalid' : isClassNameEmpty === true}"
              v-model="className"
              @input="validateClassName()"
            ></b-form-input>
            <span v-if="isClassNameEmpty === true" class="form__input--invalid-message">
              لطفا برای کلاس نامی وارد کنید
            </span>
          </b-form-group>
          
          <b-form-group id="input-group-1" label="پایه تحصیلی را وارد کنید:" label-for="input-1">
            <b-form-input
              id="input-1"
              placeholder="برای مثال هفتم یا نهم"
              class="form__input"
              :class="{'form__input--invalid' : isGradeEmpty === true}"
              v-model="gradeName"
              @input="validateGrade()"
            ></b-form-input>
            <span v-if="isGradeEmpty === true" class="form__select--invalid-message">
              لطفا یکی از پایه های تحصیلی را انتخاب کنید
            </span>
          </b-form-group>
          <button type="submit" @click="insertClass" class="button button--yellow button--block">
            اضافه کردن کلاس
          </button>
        </b-form>
      </div>
    </div>

    <Table 
      v-if="addedClasses !== null" 
      :data="addedClasses" 
      title="لیست کلاس ها" 
      @editRow="editClassRow" 
      @cancelEditRow="cancelEditClass" 
      @saveRow="updateClass" 
      @removeRow="deleteClass" 
    />
    
    <div class="wizard__controls">
      <button class="wizard__controls--next button button--yellow">گام بعدی: ثبت کردن معلم ها</button>
      <button class="wizard__controls--back button button--yellow" @click="goToManager()">بازگشت</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Steps from '~/components/common/Steps'
import Table from '~/components/common/Table'

export default {
  layout: 'managerLayout',
  components: {
    Steps,
    Table,
  },
  data() {
    return {
      className: '',
      gradeName: '',
      isGradeEmpty: null,
      isClassNameEmpty: null,
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
      addedClasses: null,
    }
  },
  computed: {
    ...mapGetters([
      'getAllClasses',
    ]),
  },
  methods: {
    ...mapActions([
      'classesList',
      'createClass',
      'insertNewClass',
      'updateClassRow',
      'editClass',
      'cancelUpdateClassRow',
      'removeClass',
    ]),
    goToManager() {
      this.$router.push('/manager');
    },
    addClass (e) {
      e.preventDefault()
      this.validateClass();
    },
    validateGrade() {
      if (this.gradeName == '') {
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

      if (checkGrade && checkClassName) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.gradeName = '';
      this.className = '';
    },
    async getClassesData() {
      let result = await this.classesList();
      if (result) {
        this.addedClasses = this.getAllClasses;
        console.log("this.addedClasses created", this.addedClasses);
      }
    },
    async insertClass() {
      if (!this.validateClass()) {
        return false;
      }
      let result = await this.createClass({className: this.className, gradeName: this.gradeName});
      if (result.isSuccess) {
        let insertedClass = {
          base: this.gradeName,
          class_id: result.classId,
          title: this.className,
        }
        this.insertNewClass(insertedClass);
        this.resetForm();
      }
    },
    async editClassRow(row, index) {
      this.cancelUpdateClassRow({index});
      this.updateClassRow({index});
    },
    async cancelEditClass(index) {
      this.cancelUpdateClassRow({index});
    },
    async updateClass(inputData, index) {
      let result = await this.editClass({inputData, index});
      if (result.isSuccess) {
        console.log("updateClass success")
      }
    },
    async deleteClass(row, index) {
      console.log("remove", row, index)
      console.log("addedClasses", this.addedClasses)

      let result = await this.removeClass({classId: row.class_id, index});
      if (result.isSuccess) {
        console.log("deleteClass success")
      }
    },
  },
  mounted() {
    this.getClassesData();
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
      margin-bottom: 0;
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

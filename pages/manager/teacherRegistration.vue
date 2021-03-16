<template>
  <div class="teacher box">
    <!-- make this component -->
    <!-- <Steps :stepsList="{
      id: '0', title: 'step 1', description: 'this is description',
      id: '1', title: 'step 2', description: 'this is description',
      }" 
      :currentStep="0" 
    /> -->

    <b-form @submit="addTeacher" class="teacher__form">
      <b-form-group id="input-group-1" label="نام:" label-for="input-1">
        <b-form-input
          id="input-1"
          placeholder="نام معلم را وارد کنید"
          class="form__input"
          :class="{'form__input--invalid' : isFirstNameEmpty === true}"
          v-model="firstName"
          @change="validateFirstName()"
        ></b-form-input>
        <span v-if="isFirstNameEmpty === true" class="form__input--invalid-message">
          لطفا نام معلم را وارد کنید
        </span>
      </b-form-group>

      <b-form-group id="input-group-2" label="نام خانوادگی:" label-for="input-2">
        <b-form-input
          id="input-2"
          placeholder="نام خانوادگی معلم را وارد کنید"
          class="form__input"
          :class="{'form__input--invalid' : isLastNameEmpty === true}"
          v-model="lastName"
          @change="validateLastName()"
        ></b-form-input>
        <span v-if="isLastNameEmpty === true" class="form__input--invalid-message">
          لطفا نام خانوادگی معلم را وارد کنید
        </span>
      </b-form-group>
      
      <b-form-group id="input-group-3" label="کد ملی:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="number"
          placeholder="کد ملی معلم را وارد کنید"
          class="form__input"
          :class="{'form__input--invalid' : isNationalCodeEmpty === true}"
          v-model="nationalCode"
          @change="validateNationalCode()"
        ></b-form-input>
        <span v-if="isNationalCodeEmpty === true" class="form__input--invalid-message">
          لطفا کد ملی  10 رقمی معلم را وارد کنید
        </span>
      </b-form-group>

      <button type="submit" class="button button--yellow button--block">
        اضافه کردن معلم
      </button>
    </b-form>

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
      firstName: '',
      lastName: '',
      nationalCode: '',
      isFirstNameEmpty: null,
      isLastNameEmpty: null,
      isNationalCodeEmpty: null,
    }
  },
  computed: {
    ...mapGetters([

    ]),
  },
  methods: {
    ...mapActions([
    ]),
    goToNewExamPage() {
      // this.$router.push('/admin/newExam');
    },
    doThis() {
      console.log("ZZZZZZZZZZZZZZ");
      alert('DDDDDDDDDDDDDDDD');
    },
    addTeacher (e) {
      e.preventDefault()
      this.validateTeacher();
    },
    validateFirstName() {
      if (this.firstName == '') {
        this.isFirstNameEmpty = true;
        return true;
      } else {
        this.isFirstNameEmpty = false;
        return false;
      }
    },
    validateLastName() {
      if (this.lastName == '') {
        this.isLastNameEmpty = true;
        return true;
      } else {
        this.isLastNameEmpty = false;
        return false;
      }
    },
    validateNationalCode() {
      console.log(this.nationalCode.length)
      if (this.nationalCode == '') {
        this.isNationalCodeEmpty = true;
        return true;
      } else {
        if (this.nationalCode.length !== 10) {
          return true;
        } else {
          this.isNationalCodeEmpty = false;
          return false;
        }
      }
    },
    validateTeacher() {
      let checkFirstName = this.validateFirstName();
      let checkLastName = this.validateLastName();
      let checkNationalCode = this.validateNationalCode();

      if (checkFirstName && checkLastName && checkNationalCode) {
        return true;
      } else {
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

.teacher {

  &__form {
    width: 100%;
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

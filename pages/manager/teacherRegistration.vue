<template>
  <div class="teacher box">
    <div class="wizard__controls">
      <Steps :steps="stepsData" />
    </div>
    <div class="row">
      <div class="col-12 col-lg-5">
        <b-form @submit="addTeacher" class="teacher__form">
          <b-form-group id="input-group-1" label="نام:" label-for="input-1">
            <b-form-input
              id="input-1"
              placeholder="نام معلم را وارد کنید"
              class="form__input"
              :class="{'form__input--invalid' : isFirstNameEmpty === true}"
              v-model="firstName"
              @input="validateFirstName()"
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
              @input="validateLastName()"
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
              @input="validateNationalCode()"
            ></b-form-input>
            <span v-if="isNationalCodeEmpty === true" class="form__input--invalid-message">
              لطفا کد ملی  10 رقمی معلم را وارد کنید
            </span>
          </b-form-group>

          <b-form-group label="کلاس های معلم:" label-for="tags-with-dropdown">
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
                    <div class="teacher__select--title">
                      کلاس های معلم را انتخاب کنید
                    </div>
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

          <button type="submit" class="button button--yellow button--block">
            اضافه کردن معلم
          </button>
        </b-form>
      </div>
    </div>

    <div class="teacher__list-wrapper">
      <div class="teacher__list-title">
        لیست معلم ها
      </div>
      <div class="teacher__list tbl">
        <div class="teacher__list--header tbl-header">
          <div class="teacher__list--select tbl-cell">
            <input type="checkbox" name="" id="">
          </div>
          <div class="teacher__list--firstname tbl-cell ">
            نام
          </div>
          <div class="teacher__list--lastname tbl-cell">
            نام خانوادگی
          </div>
          <div class="teacher__list--nationalcode tbl-cell">
            کد ملی
          </div>
          <div class="teacher__list--edit tbl-cell">
            ویرایش
          </div>
          <div class="teacher__list--remove tbl-cell">
            حذف
          </div>
        </div>
        <div v-for="(teacher, index) in addedTeachers" :key="index" class="tbl-row">
          <div class="teacher__list--select tbl-cell">
            <input type="checkbox" name="" :id="index">
          </div>
          <div class="teacher__list--firstname tbl-cell ">
            {{teacher.firstName}}
          </div>
          <div class="teacher__list--lastname tbl-cell">
            {{teacher.lastName}}
          </div>
          <div class="teacher__list--nationalcode tbl-cell">
            {{teacher.nationalCode}}
          </div>
          <div class="teacher__list--edit tbl-cell">
            <div>E</div>
          </div>
          <div class="teacher__list--remove tbl-cell">
            <div>X</div>
          </div>
        </div>
      </div>
    </div>

    <div class="wizard__controls">
      <button class="wizard__controls--next button button--yellow">گام بعدی: ثبت دانش آموزان</button>
      <button class="wizard__controls--back button button--yellow">بازگشت</button>
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
      firstName: '',
      lastName: '',
      nationalCode: '',
      isFirstNameEmpty: null,
      isLastNameEmpty: null,
      isNationalCodeEmpty: null,
      classList: ['7/1', '7/2', '7/3', '8/1', '8/2', '8/3', '9/1', '9/2', '9/3'],
      search: '',
      selectedClasses: [],
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
    async onOptionClick({ option, addTag }) {
      await addTag(option)
      this.search = ''
    },
    addTeacher (e) {
      e.preventDefault()
      this.validateTeacher();
    },
    validateFirstName() {
      if (this.firstName == '') {
        this.isFirstNameEmpty = true;
        return false;
      } else {
        this.isFirstNameEmpty = false;
        return true;
      }
    },
    validateLastName() {
      if (this.lastName == '') {
        this.isLastNameEmpty = true;
        return false;
      } else {
        this.isLastNameEmpty = false;
        return true;
      }
    },
    validateNationalCode() {
      console.log(this.nationalCode.length)
      if (this.nationalCode == '') {
        this.isNationalCodeEmpty = true;
        return false;
      } else {
        if (this.nationalCode.length !== 10) {
          return false;
        } else {
          this.isNationalCodeEmpty = false;
          return true;
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

    &--firstname {
      min-width: 120px;
      width: 100%;
    }

    &--lastname {
      min-width: 160px;
      width: 100%;
    }

    &--nationalcode {
      min-width: 120px;
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

<template>
  <div v-if="rows.length" class="list__wrapper" :key="reRenderKey">
    <div class="list__title">
      {{title}}
    </div>
    <div class="list tbl">
      <div class="list--header tbl-header">
        <!-- CHECKBOX -->
        <!-- <div class="list--select tbl-cell">
          <input type="checkbox" name="" id="">
        </div> -->
        <div class="list--select tbl-cell">
          ردیف
        </div>

        <div v-for="(column, index) in fields" :key="index" class=" tbl-cell">
          {{column.label}}
        </div>
        <div class="list--edit tbl-cell">
          ویرایش
        </div>
        <div class="list--remove tbl-cell">
          حذف
        </div>
      </div>

      <div v-for="(row, index) in rows" :key="index" class="tbl-row">
        <!-- CHECKBOX -->
        <!-- <div class="list--select tbl-cell">
          <input type="checkbox" name="">
        </div> -->
        <div class="list--select tbl-cell">
          {{index +1}}
        </div>
        <div v-for="(column, index2) in fields" :key="index2" class=" tbl-cell">
          <div v-if="!row.edit">
            {{row[column.key]}}
          </div>
          <b-form-input
            v-if="row.edit"
            :id="'input-' + index + index2"
            class="form__input"
            :placeholder="column.label + ' را وارد کنید '"
            :ref="'tableInput'"
            :key="index + index2"
            v-model="tempRow[column.key]"
          >
          </b-form-input>
        </div>
        <div class="list--edit tbl-cell" @click="edit(row, index)">
          <div :key="'edit' + index" v-if="!row.edit" class="button button--blue button--small">
            ویرایش
          </div>
          <div :key="'save' + index" v-if="row.edit" @click.stop="save(row, index)" class="button button--green button--small ml-2">
            ذخیره
          </div>
          <div :key="'cancel' + index" v-if="row.edit" @click.stop="cancel(index)" class="button button--outline--gray button--small">
            انصراف
          </div>
        </div>
        <div class="list--remove tbl-cell" @click="remove(row, index)">
          <div :key="'remove' + index" class="button button--outline--red button--small">
            حذف
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else class="list__info">
    داده ای وجود ندارد
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props:['data', 'title'],
  data() {
    return {
      rows: [], 
      fields: null,
      tempRow: [],
      inputs: [],
      originalInput: [],
      reRenderKey: 0,
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
    ]),
    remove(classId, index) {
      this.$emit("removeRow", classId, index)
    },
    edit(row, index) {
      this.tempRow = {...row};
      this.$emit("editRow", this.tempRow, index)
      this.reRenderComponent();
    },
    cancel(index) {
      this.$emit("cancelEditRow", index)
    },
    save(row, index) {
      let emptyList = [];
      this.$refs.tableInput.map((item, index) => {
        if (item.value == "") {
          item.$el.classList.add('form__input--invalid');
          item.$el.focus();
          emptyList[index] = true;
        } else {
          item.$el.classList.remove('form__input--invalid');
          emptyList[index] = false;
        }
      })

      function checkempty(item) {
        return item === true;
      }

      let isInputEmpty = emptyList.find(checkempty);
      if (!isInputEmpty) {
        this.$emit("saveRow", this.tempRow, index)
      }
    },
    reRenderComponent() {
      this.reRenderKey +=1
    },

  },
  async mounted() {
    if (this.data) {
      this.rows = this.data.data;
      this.fields = this.data.fields;
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';

  .list__wrapper {
    margin: 3rem 0;
  }
  
  .list__title {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .list {

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
      min-width: 130px;
      width: 130px;
      justify-content: center;
    }

    &--remove {
      min-width: 80px;
      justify-content: center;
      width: 80px;
    }

    &__info {
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      background: #f7f7f7;
      margin: 2rem 0;
      border-radius: 6px;
      font-weight: bold;
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

<template>
  <div class="step__wrapper" :class="{}">
    <div class="step" v-for="(step, index) in stepList" :key="index">
      <div class="step__number" :class="{'step__number--active' : step.active, 'step__number--finish' : activeId > index + 1}">
        <span v-if="activeId  > index + 1" v-html="'&#10003;'">
        </span>
        <span v-else>
          {{index + 1}}
        </span>
      </div>
      <!-- {{activeId}} {{index + 1}}
      {{activeId  > index + 1}} -->
      <div 
      class="step__title" 
      :class="{'step__title--active' : step.active, 'step__title--finish' : activeId  > index + 1}"
      v-html="step.title"
      >
        <!-- {{step.title}} -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props:['steps'],
  data() {
    return {
      stepList: [], 
      activeId: null,
    }
  },
  computed: {

  },
  methods: {

  },
  async mounted() {
    this.stepList = await this.steps;
    this.stepList.map((item, index) => {
      return item.active ? this.activeId = item.id : null;
    });
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/partials/variables.scss';
.step {
    position: relative;
    flex: 1;
    vertical-align: top;
    display: flex;
    align-items: flex-start;
    white-space: nowrap;
    margin-bottom: 3rem;
    
  &__wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;  
  }

  &:last-child {
    flex: none;
  }

  &__number {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin-left: 8px;
    background: #fff;
    color: #c3c3c3;
    border: 1px solid #c3c3c3;
    backface-visibility: hidden;

    &--active {
      border: none;
      background-color: $yellow-color;
      color: #fff;
    }

    &--finish {

      &::after {
        background-color: $yellow-color !important;
      }
    }
  }

  &__title {
    color: #c3c3c3;
    padding-left: 16px;
    position: relative;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &--active {
      color: unset;
      font-weight: bold;
    }

    &--finish {

      &::after {
        background-color: $yellow-color !important;
      }
    }
  }

  &:not(:last-child) .step__number::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    // width: 99999999px;
    background-color: #c3c3c3;
    right: 15px;
    display: block;
    top: 38px;
    display: block;
  }
}


// Medium devices (tablets, 768px and up)
@media (min-width: 767.98px) {

}

// large devices (laptops, 768px and up)
@media (min-width: 991.98px) {
  .step {
    overflow: hidden;
    align-items: center;

    &__wrapper {
      flex-direction: row;   
    }
    
    &__number {
      margin: 8px;
    }

    &__title {
      overflow: initial;
    }

    &:not(:last-child) .step__number::after {
      display: none;
    }

    &:not(:last-child) .step__title::after {
      content: '';
      position: absolute;
      height: 1px;
      width: 99999999px;
      background-color: #c3c3c3;
      right: 100%;
      display: block;
      top: 12px;
    }
  }
}

// extra large devices (desktops, 768px and up)
@media (min-width: 1199.98px) {

}

</style>

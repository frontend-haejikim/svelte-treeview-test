<script lang="ts">
  export let value = false
  export let label = ''
  export let isBold = false

  export let tabindex = 1
  export let disabled = false
  export let reversed = false
  export let partial = false

  type ChangeEvent = Event & { currentTarget: EventTarget & HTMLInputElement }

  const handleChange = ({ currentTarget: { checked } }: ChangeEvent) => {
    value = reversed ? !checked : checked
  }

  $: checked = reversed ? !value : value
</script>

<div class="input-checkbox">
  <label class="check-wrapper" class:without-label={!label}>
    <div
      class="checkbox-label"
      class:bold={isBold}
      class:disabled
      class:checked={value}
    >
      {label}
    </div>
    <input
      type="checkbox"
      class:disabled
      {checked}
      {tabindex}
      {disabled}
      on:change={handleChange}
    />
    <span class="checkmark" class:disabled class:partial={partial && !value} />
  </label>
</div>

<style lang="scss">
  $border-size: 2px;
  $checkbox-size: 2rem;

  .check-wrapper {
    user-select: none;
    display: flex;
    position: relative;
    margin: unset;
    padding-left: 2.8rem;
    width: fit-content;
    min-height: $checkbox-size;

    &.without-label {
      padding: 0;
      margin: 0;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      color: #1b1b1e;
      cursor: pointer;
      width: fit-content;
      font-weight: 500 !important;

      &.bold {
        font-weight: 700 !important;
      }

      &.disabled {
        cursor: default;
        &:not(.checked) {
          color: #95969a;
        }
      }
    }
    /* Hide the browser's default checkbox */
    input {
      width: 0;
      height: 0;
      position: absolute;
      opacity: 0;
      cursor: pointer;

      &:not(.disabled):hover ~ .checkmark {
        border: $border-size solid #000;
      }

      /* When the checkbox is checked, add a blue background */
      &:checked ~ .checkmark:not(.partial) {
        background-color: blue;
        border: $border-size solid blue;

        /* Show the checkmark when checked */
        &::after {
          display: block;
        }
      }

      &.disabled:checked ~ .checkmark {
        background-color: gray;
        border: $border-size solid gray;
      }
    }

    /* Create a custom checkbox */
    .checkmark {
      width: $checkbox-size;
      height: $checkbox-size;

      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
      border: $border-size solid #000;
      background-color: #fff;
      border-radius: 0.2rem;

      /* 체크 아이콘 (v) */
      &:not(.partial)::after {
        width: 0.8rem;
        height: 1.2rem;

        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);

        content: '';
        position: absolute;
        display: none;
        left: 0.4rem;
        border: solid #fff;
        border-width: 0 $border-size $border-size 0;
      }

      /* 부분 선택 (■) */
      &.partial::after {
        width: 1.2rem;
        height: 0.2rem;

        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
      }

      &.partial {
        background-color: blue;
        border: $border-size solid blue !important;
      }

      &.partial.disabled::after {
        background-color: #fff;
      }

      &.disabled {
        border: $border-size solid gray;
        cursor: default;
      }
    }
  }
</style>

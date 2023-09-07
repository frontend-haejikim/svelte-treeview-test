<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const handleClick = (e: MouseEvent) => {
    dispatch('click', e)
  }

  $: containerClass = `container-button ${$$restProps.class}`
</script>

<button class={containerClass} on:click={handleClick} {...$$restProps}>
  <div class="body-button">
    <div class="md-icon">
      <slot />
    </div>
  </div>
</button>

<style lang="scss">
  button {
    appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    font-family: inherit;
    outline: none;
    user-select: none;
  }

  .md-icon {
    padding: 0 !important;
  }
</style>

<script lang="ts">
  import CheckBox from '$components/common/CheckBox.svelte'
  import TreeviewPanel from '$components/common/treeview/TreeviewPanel.svelte'

  let checked1: boolean = false
  let checked2: boolean = false
  let checked3: boolean = false
  let checked4: boolean = false
</script>

<div style="display: flex;">
  <div class="group">
    <h3>TreeView</h3>
    <TreeviewPanel />
  </div>

  <div class="group">
    <h3>CheckBox</h3>
    <CheckBox bind:value={checked1} label="복숭아" />

    <CheckBox bind:value={checked2} label="복숭아" disabled />

    <CheckBox bind:value={checked3} label="복숭아" reversed />
    <span>reversed: {checked1 ? 'Y' : 'N'}</span>

    <CheckBox bind:value={checked4} label="복숭아" partial />
  </div>
</div>

<style lang="scss">
  .group {
    padding: 1rem;
    margin-bottom: 0.5rem;
  }

  :global(.input-checkbox) {
    margin: 0.6rem 0;
  }
</style>

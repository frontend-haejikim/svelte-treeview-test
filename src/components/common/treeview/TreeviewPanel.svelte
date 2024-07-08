<script lang="ts">
  import treeviewStore, { rootNodes, toggleShowHideAll } from '$/store/treeview'
  import { isShowMeshFileTreeView, desktopTreeviewWidth, toggleShow } from '$/store/ui'
  import IconButtonRenderer from '../IconButtonRenderer.svelte'
  import Collapse from '../svg/Collapse.svelte'
  import Expand from '../svg/Expand.svelte'
  import Treeview from '../svg/Treeview.svelte'
  import TreeviewFold from '../svg/TreeviewFold.svelte'
  import TreeviewItem from './TreeviewItem.svelte'

  $: hasNodes = $rootNodes.length > 0

  $: treeviewWidth = $isShowMeshFileTreeView ? `${$desktopTreeviewWidth}px` : '6.4rem'
</script>

<div
  class="treeview-container"
  style="height: 651px; left: 0rem;"
  class:closed={!$isShowMeshFileTreeView}
>
  <div class="treeview-body" style="width: {treeviewWidth};">
    <div class="treeview-content">
      <div class="group-button" class:folded={!$isShowMeshFileTreeView}>
        <IconButtonRenderer on:click={() => toggleShow('MeshFileTreeView')}>
          {#if $isShowMeshFileTreeView}
            <TreeviewFold />
          {:else}
            <Treeview />
          {/if}
        </IconButtonRenderer>
        {#if $isShowMeshFileTreeView && hasNodes}
          <IconButtonRenderer on:click={toggleShowHideAll}>
            {#if $treeviewStore.showHideAll}
              <Collapse />
            {:else}
              <Expand />
            {/if}
          </IconButtonRenderer>
        {/if}
      </div>

      {#if $isShowMeshFileTreeView}
        <ul class="list-tree-view-panel parent">
          {#each $rootNodes as node}
            <TreeviewItem item={node} depth={0} root={{}} class="parent" />
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  $treeview-fold-width: 6.4rem;
  $Shadow03: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.14);

  .treeview-container {
    position: relative;
    pointer-events: all;
    width: fit-content;
    overflow: visible;
    .treeview-body {
      height: 100%;
      font-size: 1rem;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      .treeview-content {
        overflow-y: auto;
        height: auto;
        background-color: rgba(241, 242, 246, 0.6) !important;
        box-shadow: $Shadow03;
        padding: 1.2rem;
        flex: 1;

        .group-button {
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
          margin-bottom: 1.6rem;
          align-items: center;

          &.folded {
            justify-content: center;
          }
        }
      }
    }
  }

  .list-tree-view-panel {
    list-style-type: none;
    padding: 0;
  }

  @keyframes slidein-mobile-portrait {
    from {
      bottom: -18rem;
    }
    to {
      bottom: 0rem;
    }
  }

  @keyframes slideout-mobile-portrait {
    from {
      bottom: 0rem;
    }
    to {
      bottom: -18rem;
    }
  }

  @keyframes slidein-mobile-landscape {
    from {
      left: -41.2rem;
    }
    to {
      left: 6.2rem;
    }
  }

  @keyframes slideout-mobile-landscape {
    from {
      left: 6.2rem;
    }
    to {
      left: -41.2rem;
    }
  }
</style>

<script lang="ts">
  import treeviewStore, { rootNodes, toggleShowHideAll } from '$store/treeview'
  import {
    isShowMeshFileTreeView,
    desktopTreeviewWidth,
    toggleShow,
  } from '$store/ui'
  import IconButtonRenderer from '../IconButtonRenderer.svelte'
  import Collapse from '../svg/Collapse.svelte'
  import Expand from '../svg/Expand.svelte'
  import Treeview from '../svg/Treeview.svelte'
  import TreeviewFold from '../svg/TreeviewFold.svelte'
  import TreeviewItem from './TreeviewItem.svelte'

  $: hasNodes = $rootNodes.length > 0

  $: treeviewWidth = $isShowMeshFileTreeView
    ? `${$desktopTreeviewWidth}px`
    : '6.4rem'
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
  $bg-2-rgb: var(--bg-2-rgb);
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
        background-color: rgba($bg-2-rgb, 0.6) !important;
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
            > div > button {
              margin-left: 0;
            }
          }
        }
        .empty-nodes {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 90%;
          > img {
            width: 19.6rem;
            height: 16rem;
            user-select: none;
          }
          > span {
            margin-top: 1.6rem;
            font-size: 1.6rem;
            color: #c0c0c0;
            user-select: none;
            font-weight: normal;
          }
        }
      }
      .treeview-resizer {
        width: 1rem;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        display: flex;
        border-left: 2px solid transparent;
        box-sizing: content-box;
        &.resize-mode {
          border-color: #60b3ff;
          cursor: col-resize;
        }
        > img {
          width: 0.5rem;
          height: 1.2rem;
          user-select: none;
          pointer-events: none;
        }
      }
    }

    .treeview-float {
      position: absolute;
      margin: 1.2rem 0;
    }

    &.closed {
      .treeview-body {
        width: $treeview-fold-width;
        padding: 0;
        min-width: auto;
        box-shadow: $Shadow03;
      }

      &.mobile-landscape {
        left: 0 !important;
        .treeview-body {
          width: 0;
          padding: 0;
        }
      }
    }

    &.mobile-portrait {
      position: fixed;
      width: 100%;
      top: unset;
      bottom: 0;
      padding: 0.8rem;
      box-shadow: 0 0.3rem 0.4rem 0 rgba(0, 0, 0, 0.14);
      background-color: rgba($bg-2-rgb, 0.6) !important;
      animation: slidein-mobile-portrait;
      animation-duration: 0.5s;

      &.mobile-closed {
        animation: slideout-mobile-portrait;
        animation-duration: 0.3s;
      }

      &.mobile-landscape {
        top: 0;
        animation: slidein-mobile-landscape;
        animation-duration: 0.5s;

        &.mobile-closed {
          animation: slideout-mobile-landscape;
          animation-duration: 0.5s;
        }
      }

      .treeview-body {
        overflow-y: auto;
        width: 100%;
        box-shadow: unset;
        padding: 0.6rem;
        background-color: transparent;
      }

      .treeview-float {
        left: unset;
        right: 0;
        float: right;
        margin-top: -7.2rem;
        margin-right: 0;
        padding-right: 0;
        justify-content: flex-end;
      }
    }
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

  .list-tree-view-panel {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    flex: 1;
    overflow-y: auto;

    .group-parent {
      .bg-group {
        background-color: #fff;
        border: solid 1px #d9dadd;
        border-radius: 0.4rem;
      }
    }

    .bg-group {
      display: flex;
      width: calc(100% - 2.4rem);
      height: 4.8rem;
      align-items: center;

      > img {
        width: 2.4rem;
        margin: 0 1.2rem;
      }
    }

    .item-group-types {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0;
      margin: 0;
      margin-top: 0.8rem;
      pointer-events: auto;

      &:first-of-type {
        margin-top: 0;
      }

      &.child {
        height: 4.8rem;
        background: none;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }

  .group-group-type {
    display: flex;
    align-items: center;

    &.mobile-portrait {
      width: calc(100% - 2.4rem);
    }
  }

  .disable-click * {
    pointer-events: none;
  }

  .skeleton-area {
    margin-bottom: 0.2rem;
    border-radius: 0.4rem;
  }
</style>

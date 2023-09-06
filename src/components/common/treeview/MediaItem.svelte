<script lang="ts">
  import { MEDIA_TYPE } from '$const'
  import type { TreeNode } from '$store/treeview'
  import IconButtonRenderer from '../IconButtonRenderer.svelte'
  import NeedSync from '../svg/NeedSync.svelte'
  import Visibility from '../svg/Visibility.svelte'

  export let item: TreeNode
  export let displayName: string

  const onClickMediaItem = () => {}

  $: currentMedia = {
    ...item,
    fileUuid: '',
  } as TreeNode

  $: disabled =
    item.isPreviewAble === false || item.mediaType === MEDIA_TYPE.PARSE_FAILED

  $: isShowMediaViewer = false
</script>

<div
  class="group-entity-body media-item"
  role="presentation"
  on:click={onClickMediaItem}
>
  <div class="group-name-entity">
    <div
      class="name-entity"
      class:disabled
      class:current-media={isShowMediaViewer &&
        currentMedia.fileUuid === item.fileUuid}
    >
      {displayName}
    </div>
  </div>
  <div class="group-item-button">
    {#if item.isNotUploaded}
      <IconButtonRenderer xxs style="pointer-events: none">
        <NeedSync />
      </IconButtonRenderer>
    {/if}
    {#if isShowMediaViewer && currentMedia.fileUuid === item.fileUuid}
      <IconButtonRenderer xxs>
        <Visibility />
      </IconButtonRenderer>
    {/if}
    <div class="blank" />
  </div>
</div>

<style lang="scss">
  $anim-duration: 350ms;

  .name-entity {
    font-weight: 400 !important;
    &.disabled {
      color: #6a6a6a;
    }
    &.current-media {
      font-weight: 700 !important;
    }
  }

  .group-entity-body {
    width: 100%;
    height: 100%;
    min-height: 3.2rem;
    display: flex;
    flex: 1;
    justify-content: space-between;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &.media-item {
      cursor: pointer;
    }

    .group-name-entity {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: calc(100% - 8rem);

      .name-entity {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        backface-visibility: initial;
        color: #1b1b1e;
        $transform-before-anim-text: translateX(0) translateY(0) scale(1);
        $transform-after-anim-text: translateX(-0.2rem) translateY(-0.6rem)
          scale(0.85);
        @keyframes on-hover-text {
          0% {
            transform: $transform-before-anim-text;
          }

          100% {
            transform: $transform-after-anim-text;
          }
        }
        @keyframes on-mouseout-text {
          0% {
            transform: $transform-after-anim-text;
          }

          100% {
            transform: $transform-before-anim-text;
          }
        }

        &.hover {
          animation: on-hover-text $anim-duration;
          transform: $transform-after-anim-text;
        }

        &.mouseout {
          animation: on-mouseout-text $anim-duration;
          transform: $transform-before-anim-text;
        }

        &.disabled {
          color: #6a6a6a;
        }
      }

      @keyframes on-hover-slider {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes on-mouseout-slider {
        0% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }

      .slider {
        position: absolute;
        width: calc(100% - 0.4rem) !important;
        bottom: 0.4rem;
        margin: 0;
        opacity: 0;

        &.hover {
          opacity: 1;
          animation: on-hover-slider $anim-duration;
        }

        &.mouseout {
          opacity: 0;
          animation: on-mouseout-slider $anim-duration;
        }
      }
    }

    .group-item-button {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-right: 0.8rem;

      > button {
        margin-left: 0 !important;
      }
    }
  }
</style>

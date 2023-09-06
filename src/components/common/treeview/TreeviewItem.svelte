<script lang="ts">
  import type { SvelteComponent } from 'svelte'

  import type { TreeNode } from '$store/treeview'
  import treeviewStore, {
    toggleShowChildren,
    findShownChildrenNodes,
  } from '$store/treeview'
  import { TOOTH_NUMBER_TYPE, FILE_NAMES } from '$const'
  import Utils from '$utils'
  import Minus from '../svg/Minus.svelte'
  import Plus from '../svg/Plus.svelte'
  import IconButtonRenderer from '../IconButtonRenderer.svelte'
  import MediaItem from './MediaItem.svelte'
  import MeshItem from './MeshItem.svelte'

  export let item: TreeNode = {
    key: '',
    name: '',
    displayName: '',
    path: '',
    sortOrder: 0,
    showOnTreeview: false,
  }

  export let depth: number = 0

  export const root: Object = {}

  let component: SvelteComponent

  const onFocus = () => {}
  const onBlur = () => {}

  const formatToothNumber = (toothNumber: number) => {
    // Shell에는 US 기준으로 저장되어 있다.
    // if (!toothNumber) return 'base'
    if (toothNumber > 100) return toothNumber - 100
    if ($treeviewStore.toothNumberType === TOOTH_NUMBER_TYPE.FDI) {
      return Utils.getFdiNumber(toothNumber)
    }
    return toothNumber
  }

  const formatViewTextForTeethNum = (viewText: string) => {
    if (!viewText) return ''
    const re = /^(\d{1,3}-?)+$/gi
    if (viewText === 'DataObject') return 'Base'
    const toothNumbers = viewText.toString().match(re)
    if (!toothNumbers) return ''
    return toothNumbers[0]
      .split('-')
      .map((number) => formatToothNumber(Number(number)))
      .sort((a: number, b: number) => a - b)
      .join('-')
  }

  const formatToothNumberFromFilename = (toothNumber: number) => {
    // File 이름에는 FDI 기준으로 저장되어 있다.
    if (isNaN(toothNumber)) return toothNumber
    if ($treeviewStore.toothNumberType === TOOTH_NUMBER_TYPE.US) {
      return Utils.getUsNumber(toothNumber)
    }
    return toothNumber
  }

  const getDisplayName = () => {
    const {
      hasChildren,
      isFolder,
      displayNameRule,
      displayName,
      postfix,
      fileName,
      name,
      viewRoot,
    } = item
    const toothNumLabel = formatViewTextForTeethNum(postfix || '')
    const refinedFileName: string =
      fileName
        ?.replace('.' + FILE_NAMES.FILE_SPECIAL_EXTENSION_GENERAL_MEDITMESH, '')
        ?.replace('.' + FILE_NAMES.FILE_SPECIAL_EXTENSION_CAD_MEDITMESH, '') ||
      ''
    const defaultName = refinedFileName || name

    let itemDisplayName = ''
    if (hasChildren && !isFolder) {
      itemDisplayName = formatViewTextForTeethNum(name) || name
    } else {
      switch (displayNameRule) {
        case 'GlobalString':
          itemDisplayName = displayName
          break
        case 'OnlyUsingViewText':
          itemDisplayName = postfix || name
          break
        case 'OnlyUsingViewTextForTeethNum':
          itemDisplayName = toothNumLabel
          break
        case 'GlobalStringAndUsingViewText':
          itemDisplayName = displayName + (postfix || '')
          break
        case 'GlobalStringAndUsingViewTextForTeethNum':
          itemDisplayName = displayName + (toothNumLabel || name || '')
          break
        case 'RemoveCaseItemId': {
          const parts: (string | number)[] = refinedFileName
            .replace(/\d{7,8}[-.]?/gi, '')
            .split('-')
          for (let i = 0; i < parts.length; i++) {
            if (isNaN(Number(parts[i]))) break
            parts[i] = formatToothNumberFromFilename(Number(parts[i]))
          }
          itemDisplayName = parts.join('-')
          break
        }
        case 'DefaultFileName':
          itemDisplayName = refinedFileName
          // NOTE: Apps산출물 중 3D Data의 경우 확장자를 보여주지 않음 (COL-17332)
          if (viewRoot?.startsWith('Medit_')) {
            let fileName = refinedFileName
            const dotIndex = fileName.lastIndexOf('.')
            if (
              dotIndex > 0 &&
              fileName.endsWith(FILE_NAMES.FILE_EXTENSION_MEDITMESH)
            ) {
              fileName = fileName.slice(0, dotIndex)
            }
            itemDisplayName = fileName
          }
          break
        default:
          itemDisplayName = defaultName
          break
      }
    }

    return itemDisplayName
  }

  $: containerClass = `container-entity ${$$restProps.class}`

  $: children = findShownChildrenNodes(item.path)

  $: displayName = getDisplayName()
</script>

<li class={containerClass}>
  <div>
    {#if depth !== 0}
      <div style="width: {depth * 2 * 0.8}rem; flex: 0 0 auto" />
    {/if}

    <div
      class="group-entity"
      class:root={depth === 0}
      on:focus={onFocus}
      on:blur={onBlur}
    >
      {#if children.length > 0}
        <IconButtonRenderer
          class={children.length === 0 ? 'no-child' : ''}
          xxs
          on:click={() => toggleShowChildren(item.path)}
        >
          {#if item.isShowChildren}
            <Minus />
          {:else}
            <Plus />
          {/if}
        </IconButtonRenderer>
      {/if}

      {#if item.mediaType}
        <MediaItem {item} {displayName} />
      {:else}
        <MeshItem />
      {/if}
    </div>
  </div>

  {#if children.length > 0 && item.isShowChildren}
    <ul class="list-tree-view-panel">
      {#each children as child}
        <svelte:self bind:this={component} depth={depth + 1} item={child} />
      {/each}
    </ul>
  {/if}
</li>

<style lang="scss">
  $anim-duration: 350ms;

  ul {
    list-style-type: none;
  }

  .container-entity {
    position: relative;
    pointer-events: all;
    /* slider 드래그 시 텍스트 하이라이트 방지 */
    user-select: none;
    > div {
      display: flex;
    }
  }

  .group-entity {
    position: relative;
    display: flex;
    height: 3.2rem;
    align-items: center;
    overflow: hidden;
    flex: 1;
    margin-bottom: 0.2rem;
    border-radius: 0.4rem;

    &.root {
      background-color: #fff !important;
    }

    > img {
      cursor: pointer;
    }

    > :global(button) {
      height: 100%;
      margin: 0 0.8rem;
      padding: 0 !important;
    }

    & :global(.no-child) {
      visibility: hidden;
      width: auto;
    }

    .download-failed {
      position: absolute;
      margin-left: 4.4rem;
      margin-top: 0.2rem;
      color: gray;
    }
  }

  .group-visibility {
    display: flex;
    align-items: center;

    > img {
      width: 2.4rem;
      cursor: pointer;
    }

    .btn-context {
      position: absolute;
      right: -3rem;
      opacity: 0;

      .container-button {
        padding: 0 0.4rem;
      }

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
</style>

import { derived, writable, type Writable } from 'svelte/store'

type KeyValuePair = { [key: string | isShowNames]: boolean | number }

type isShowNames = 'MeshFileTreeView' | 'GuideModal' | 'MediaViewer'

export interface UIStore {
  isShow: KeyValuePair
  animation: KeyValuePair
  treeview: KeyValuePair
}

const store: Writable<UIStore> = writable({
  isShow: {
    MeshFileTreeView: true,
    GuideModal: false,
    MediaViewer: false,
  },
  animation: {
    showZoomFit: false,
    showZoomFocus: false,
  },
  treeview: {
    width: 519,
    isResizing: false,
  },
})

export const isShowMeshFileTreeView = derived(store, ($_) => $_.isShow.MeshFileTreeView)
export const isShowGuideModal = derived(store, ($_) => $_.isShow.isShowGuidModal)
export const isShowMediaViewer = derived(store, ($_) => $_.isShow.MediaViewer)

export const desktopTreeviewWidth = derived(store, ($_) => $_.treeview.width)

export const toggleShow = (name: isShowNames) => {
  store.update((_) => ({
    ..._,
    isShow: { ..._.isShow, [name]: !_.isShow[name] },
  }))
}

export default store

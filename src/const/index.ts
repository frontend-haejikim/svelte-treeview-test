export * from './FileNames'

import { FILE_NAMES } from './FileNames'

export const CAMERA_STATE = {
  NONE: 'NONE',
  ROTATE: 'ROTATE',
  ZOOM: 'ZOOM',
  PAN: 'PAN',
  TOUCH_ZOOM_PAN: 'TOUCH_ZOOM_PAN',
  INITIAL: 'INITIAL',
}

export const KEY_CODE = {
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  META1: 91, // based on webkit on macOS
  META2: 224, // based on moz on macOS
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

export const MOUSE_CODE = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
}

export const VIEWPORT = {
  FRONT: {
    x: 0,
    y: -13.2,
    z: 50,
  },
  BACK: {
    x: 0,
    y: -13.2,
    z: -50,
  },
  LEFT: {
    x: 50,
    y: -13.2,
    z: 0,
  },
  RIGHT: {
    x: -50,
    y: -13.2,
    z: 0,
  },
}

export const MATERIAL = {
  DEFAULT: 0,
  PLAIN: 1,
  MARGIN_LINE: 2,
}

export const TOOTH_NUMBER_TYPE = {
  FDI: 0,
  US: 1,
}

export const TOOTH_NUMBER = {
  FDI: {
    UPPER_START: 11,
    UPPER_EMPTY: [19, 20],
    UPPER_END: 28,
    LOWER_START: 31,
    LOWER_EMPTY: [39, 40],
    LOWER_END: 48,
  },
  US: {
    UPPER_START: 1,
    UPPER_EMPTY: [],
    UPPER_END: 16,
    LOWER_START: 17,
    LOWER_EMPTY: [],
    LOWER_END: 32,
  },
}

export const VIEWER_TYPE = {
  ANONYMOUS: 0,
  SHARERER: 1,
  PARTNER: 2,
  PATIENT: 3,
}

export const RENDER_METHODS = {
  DEFAULT: 0,
  DDP: 1,
  WBOIT: 2,
}

export const MEDIA_TYPE = {
  IMAGE: 1,
  IMAGE_OVERLAY: 2,
  VIDEO: 3,
  PARSE_FAILED: -1,
}

export const FILE_TYPE = {
  FILETYPE_UNKNOWN: 0,
  FILETYPE_FORM_DATA: 1,
  FILETYPE_SCAN_RAW_DATA: 2,
  FILETYPE_SCAN_RESULT_DATA: 3,
  FILETYPE_SCAN_CAPTURED_DATA: 4,
  FILETYPE_CAD_OUTPUT: 5,
  FILETYPE_CAM_MACRO: 6,
  FILETYPE_CAM_PROJECT: 7,
  FILETYPE_CAM_OUTPUT: 8,
  FILETYPE_MILLING_CODE: 9,
  FILETYPE_FORM_IMAGE_DATA: 10,
  FILETYPE_ATTACHED: 11,
  FILETYPE_SCAN_EXTRA_3D_DATA: 12,
}

export const RENDERABLE_FILE_TYPES = [
  FILE_TYPE.FILETYPE_SCAN_RESULT_DATA,
  FILE_TYPE.FILETYPE_SCAN_EXTRA_3D_DATA,
  FILE_TYPE.FILETYPE_CAD_OUTPUT, // 이하 type들은 Image가 섞여 있으므로 metadata와 크로스 체크
  FILE_TYPE.FILETYPE_CAM_OUTPUT,
  FILE_TYPE.FILETYPE_MILLING_CODE,
  FILE_TYPE.FILETYPE_ATTACHED,
  FILE_TYPE.FILETYPE_SCAN_CAPTURED_DATA, // COL-12833 - 동영상 파일인데 타입이 Captured Data 인게 있음
]

export const RENDERABLE_FILE_NAMES = [
  FILE_NAMES.FILE_EXTENSION_MEDITMESH,
  FILE_NAMES.FILE_EXTENSION_LIBRARY_INFO,
  FILE_NAMES.FILE_EXTENSION_MARGINLINE,
  FILE_NAMES.FILE_EXTENSION_MEDIT_IMPORTED_MESH,
  FILE_NAMES.FILE_EXTENSION_MEDIT_CT_MESH,
]

export const SCAN_RESULT_VIEW_ROOTS = [
  'Maxilla',
  'Mandible',
  'Face',
  'Occlusion',
  'MultiDie',
  'AdditionalStage',
  'AdditionalData',
  'DynamicOcclusion',
]

export const METADATA = {
  CATEGORY: {
    UNDEFINED: 0,
    FORM: 1,
    RAWDATA: 2,
    MESH: 3,
    IMAGE: 4,
    VIDEO: 5,
    // Medit Apps 산출물은 1001부터 시작
    SMILE_DESIGN_PREVIEW: 1001,
  },
}

export const UPLOAD_STATUS = {
  UPLOADING: 1,
  UPLOADED: 2,
}

export const SPLIT_STATUS = {
  SPLIT_FAILED: -1,
  SPLIT_REQUESTED: 0,
  SPLIT_SUCCEED: 1,
  SYNC_WAIT: 9, // UI 출력을 위한 Renderer 자체 상태
}

// COL-12834 - 이미지, 비디오, 기타 파일 ... 메뉴 버튼 제거
export const HIDE_CONTROL_KEY = {
  IMAGE: 'Image',
  VIDEO: 'Video',
  ETC: 'Etc',
}

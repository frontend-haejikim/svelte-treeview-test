import { TOOTH_NUMBER, TOOTH_NUMBER_TYPE } from './const'
import { FILE_NAMES } from './const/FileNames'

const Utils = {
  getFileInfo(fileName: string) {
    let iconType = ''
    let groupType = ''

    iconType = this.checkForMultiDieData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'MultiDie'
      return {
        iconType,
        groupType,
      }
    }

    iconType = this.checkForMaxillaryData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'Maxilla'
      return {
        iconType,
        groupType,
      }
    }

    iconType = this.checkForMandibleData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'Mandible'
      return {
        iconType,
        groupType,
      }
    }

    iconType = this.checkForOcculusionData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'Occlusion'
      return {
        iconType,
        groupType,
      }
    }

    iconType = this.checkForFaceImportData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'Face'
      return {
        iconType,
        groupType,
      }
    }

    iconType = this.checkForFaceCTData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'Face'
      return {
        iconType,
        groupType,
      }
    }

    iconType = this.checkForFaceData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'Face'
      return {
        iconType,
        groupType,
      }
    }

    iconType = this.checkForAttachmentData(fileName)
    if (iconType !== 'Unknown') {
      groupType = 'Attachment'
      return {
        iconType,
        groupType,
      }
    }

    return {
      iconType: 'Unknown',
      groupType: 'Etc',
    }
  },
  checkForMultiDieData(fileName: string) {
    const toothNumberList = this.extractToothNumber(fileName)
    if (toothNumberList.length === 0) {
      return 'Unknown'
    }

    for (let i = 0; i < toothNumberList.length; i++) {
      if (!this.isMultiDie(toothNumberList[i])) {
        return 'Unknown'
      }
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_WAXUP)) {
      return 'IndividualWaxup'
    }

    return 'MultiDie'
  },
  checkForMaxillaryData(fileName: string) {
    if (this.isLibraryInfoFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MAXILLARY)) {
      return 'Abutment'
    }

    if (this.isLibraryInfoFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MAXILLARY_SCANBODY)) {
      return 'Scanbody'
    }

    if (
      this.isLibraryInfoFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_UPPERJAW_SCANBODYINFO)
    ) {
      return 'Scanbody'
    }

    if (this.isMarginLineFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MAXILLARY)) {
      return 'MarginLine'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MAXILLARY_SCANBODY)) {
      return 'ScanbodyBase'
    }

    if (
      this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_INITIALMODEL_MAXILLARY)
    ) {
      return 'PreOP'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MAXILLARY_DENTURE)) {
      return 'Denture'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_UPPERJAW)) {
      return 'Base'
    }

    if (
      this.isMeditMeshFileEndsWith(
        fileName,
        FILE_NAMES.FILE_SPECIAL_NAME_UPPERJAW + '-' + FILE_NAMES.FILE_SPECIAL_NAME_GINGIVA
      )
    ) {
      return 'Gingiva'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MAXILLARY)) {
      return 'Base'
    }

    // Check using number
    const toothNumberList = this.extractToothNumber(fileName)
    const allUpper = toothNumberList.every((toothNum: number) => {
      return this.isUpper(toothNum)
    })
    if (toothNumberList.length === 0 || !allUpper) {
      return 'Unknown'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_SCANBODY)) {
      return 'ScanbodyBaseTScan'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_STUDYMODEL)) {
      return 'PreOP'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_WAXUP)) {
      return 'Waxup'
    }

    if (
      toothNumberList.length >= 1 &&
      this.isEndWithNumber(fileName, FILE_NAMES.FILE_EXTENSION_MEDITMESH)
    ) {
      return 'Prep'
    }

    return 'Unknown'
  },
  checkForMandibleData(fileName: string) {
    if (this.isLibraryInfoFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MANDIBULAR)) {
      return 'Abutment'
    }

    if (
      this.isLibraryInfoFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MANDIBULAR_SCANBODY)
    ) {
      return 'Scanbody'
    }

    if (
      this.isLibraryInfoFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_LOWERJAW_SCANBODYINFO)
    ) {
      return 'Scanbody'
    }

    if (this.isMarginLineFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MANDIBULAR)) {
      return 'MarginLine'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MANDIBULAR_SCANBODY)) {
      return 'ScanbodyBase'
    }

    if (
      this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_INITIALMODEL_MANDIBLE)
    ) {
      return 'PreOP'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MANDIBULAR_DENTURE)) {
      return 'Denture'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_LOWJAW)) {
      return 'Base'
    }

    if (
      this.isMeditMeshFileEndsWith(
        fileName,
        FILE_NAMES.FILE_SPECIAL_NAME_LOWJAW + '-' + FILE_NAMES.FILE_SPECIAL_NAME_GINGIVA
      )
    ) {
      return 'Gingiva'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MANDIBULAR)) {
      return 'Base'
    }

    // Check using number
    const toothNumberList = this.extractToothNumber(fileName)
    const allLower = toothNumberList.every((toothNum) => {
      return this.isLower(toothNum)
    })
    if (toothNumberList.length === 0 || !allLower) {
      return 'Unknown'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_SCANBODY)) {
      return 'ScanbodyBaseTScan'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_STUDYMODEL)) {
      return 'PreOP'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_WAXUP)) {
      return 'Waxup'
    }

    if (
      toothNumberList.length >= 1 &&
      this.isEndWithNumber(fileName, FILE_NAMES.FILE_EXTENSION_MEDITMESH)
    ) {
      return 'Prep'
    }

    return 'Unknown'
  },
  checkForOcculusionData(fileName: string) {
    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_FIRST_OCCLUSIOIN)) {
      return 'FirstBase'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_SECOND_OCCLUSIOIN)) {
      return 'SecondBase'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_OCCLUSIOIN)) {
      return 'Base'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_WAXRIM)) {
      return 'Aestheticplate'
    }

    if (this.isMeditMeshFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_NAME_MOVEMENTMARKER)) {
      return 'MovementMarker'
    }

    return 'Unknown'
  },
  checkForFaceData(fileName: string) {
    if (fileName.includes(FILE_NAMES.FILE_SPECIAL_NAME_FACE)) {
      return 'Base'
    }

    return 'Unknown'
  },
  checkForFaceImportData(fileName: string) {
    if (
      fileName.toLowerCase().endsWith(FILE_NAMES.FILE_EXTENSION_MEDIT_IMPORTED_MESH.toLowerCase())
    ) {
      return 'Imported'
    }

    return 'Unknown'
  },
  checkForFaceCTData(fileName: string) {
    if (fileName.toLowerCase().endsWith(FILE_NAMES.FILE_EXTENSION_MEDIT_CT_MESH.toLowerCase())) {
      return 'CT'
    }

    return 'Unknown'
  },
  checkForAttachmentData(fileName: string) {
    if (this.isFileEndsWith(fileName, FILE_NAMES.FILE_SPECIAL_EXTENSION_GENERAL_MEDITMESH)) {
      return '3DData'
    }
    if (this.isMeditMeshFileEndsWith(fileName, '')) {
      return '3DData'
    }
    if (
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_BMP) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_GIF) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_JPG) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_JPEG) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_PNG) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_TIF) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_TIFF) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_HEIC)
    ) {
      return 'Image'
    }
    if (
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_AVI) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_MKV) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_MP4) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_WMV) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_MOV) ||
      this.isFileEndsWith(fileName, FILE_NAMES.FILE_EXTENSION_HEVC)
    ) {
      return 'Video'
    }

    return 'Unknown'
  },
  isLibraryInfoFileEndsWith(fileName: string, findString: string) {
    const compareStr = (findString + '.' + FILE_NAMES.FILE_EXTENSION_LIBRARY_INFO).toLowerCase()
    return fileName.toLowerCase().endsWith(compareStr)
  },
  isMeditMeshFileEndsWith(fileName: string, findString: string) {
    const compareStr = (findString + '.' + FILE_NAMES.FILE_EXTENSION_MEDITMESH).toLowerCase()
    return fileName.toLowerCase().endsWith(compareStr)
  },
  isMarginLineFileEndsWith(fileName: string, findString: string) {
    const compareStr = (findString + '.' + FILE_NAMES.FILE_EXTENSION_MARGINLINE).toLowerCase()
    return fileName.toLowerCase().endsWith(compareStr)
  },
  isFileEndsWith(fileName: string, findString: string) {
    const compareStr = findString.toLowerCase()
    return fileName.toLowerCase().endsWith(compareStr)
  },
  isEndWithNumber(fileName: string, removeString: string) {
    const checkStr = fileName.replace('.' + removeString, '')
    const re = /-\d{1,2}$/gi
    const result = re.exec(checkStr)
    return result && result.length > 0
  },
  isMultiDie(toothNumber: number) {
    return toothNumber >= 101 && toothNumber <= 118
  },
  extractToothNumber(fileName: string) {
    return fileName
      .replace('.', '-')
      .split('-') // replace to exclude extension
      .filter((str: string) => {
        return !isNaN(Number(str))
      })
      .map((toothNum: string) => {
        return Number.parseInt(toothNum)
      })
      .filter((toothNum: number) => {
        return (
          (toothNum >= TOOTH_NUMBER.FDI.UPPER_START && toothNum <= TOOTH_NUMBER.FDI.LOWER_END) ||
          this.isMultiDie(toothNum)
        )
      })
  },
  isUpper(toothNum: number, type = TOOTH_NUMBER_TYPE.FDI) {
    if (type === TOOTH_NUMBER_TYPE.FDI) {
      // 11 <= toothNum <= 28, not 19, 20
      return (
        TOOTH_NUMBER.FDI.UPPER_START <= toothNum &&
        toothNum <= TOOTH_NUMBER.FDI.UPPER_END &&
        !TOOTH_NUMBER.FDI.UPPER_EMPTY.includes(toothNum)
      )
    } else if (type === TOOTH_NUMBER_TYPE.US) {
      return TOOTH_NUMBER.US.UPPER_START <= toothNum && toothNum <= TOOTH_NUMBER.US.UPPER_END
    }
  },
  isLower(toothNum: number, type = TOOTH_NUMBER_TYPE.FDI) {
    if (type === TOOTH_NUMBER_TYPE.FDI) {
      // 31 <= toothNum <= 48, not 39, 40
      return (
        TOOTH_NUMBER.FDI.LOWER_START <= toothNum &&
        toothNum <= TOOTH_NUMBER.FDI.LOWER_END &&
        !TOOTH_NUMBER.FDI.LOWER_EMPTY.includes(toothNum)
      )
    } else if (type === TOOTH_NUMBER_TYPE.US) {
      return TOOTH_NUMBER.US.LOWER_START <= toothNum && toothNum <= TOOTH_NUMBER.US.LOWER_END
    }
  },
  getFdiNumber(us: number) {
    if (this.isUpper(us, TOOTH_NUMBER_TYPE.US)) {
      return us <= 8 ? 19 - us : 12 + us
    } else if (this.isLower(us, TOOTH_NUMBER_TYPE.US)) {
      return us <= 24 ? 55 - us : 16 + us
    }

    return 0
  },
  getUsNumber(fdi: number) {
    if (this.isUpper(fdi, TOOTH_NUMBER_TYPE.FDI)) {
      return fdi <= 18 ? 19 - fdi : fdi - 12
    } else if (this.isLower(fdi, TOOTH_NUMBER_TYPE.FDI)) {
      return fdi <= 38 ? 55 - fdi : fdi - 16
    }

    return 0
  },
}

export default Utils

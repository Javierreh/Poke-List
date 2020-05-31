import { FormControl } from '@angular/forms/src/forms';

export function ImageFormatValidator(control: FormControl) {
  const fileName = control.value;
  if (fileName) {
    const [_, extension]: string[] = fileName.split('.');
    if (extension &&
        extension.toLowerCase() !== 'jpeg' &&
        extension.toLowerCase() !== 'jpg' &&
        extension.toLowerCase() !== 'png') {
      return {
        fileExtension: {
          wrongFileType: extension
        }
      };
    }
  }
  return null;
}

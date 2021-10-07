module.exports = {
  isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  },

  isValidimgURL(str) {
    const imageReg = /[.](gif|jpg|jpeg|tiff|png)$/i;
    return this.isValidURL(str) && !!imageReg.test(str);
  },

  isAllLowerCase(str) {
    return (/[a-z]+/.test(str));
  },

  isValidPhoneNumber(str) {
    return (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(str));
  }
}
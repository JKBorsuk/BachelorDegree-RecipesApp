export const validName = new RegExp('^[a-zA-Z]{1,20}$');
export const validLogin = new RegExp('^[a-zA-Z]{3,20}$');
export const validPassword = new RegExp('^(?=.{6,20}$)(?=.*[a-zA-Z])(?=.*[0-9]).*$');
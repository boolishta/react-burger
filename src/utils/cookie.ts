function setCookie(cname: string, cvalue: string): void {
  document.cookie = cname + '=' + cvalue + ';path=/';
}

function getCookie(cname: string): string {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function deleteCookie(cname: string): void {
  document.cookie = cname + '=;path=/';
}

export { setCookie, getCookie, deleteCookie };

import 'document-register-element';
import moment from 'moment';

function getLocale() {
  let documentElement = (document || {}).documentElement;
  let lang = (documentElement || {}).leng;
  lang && moment.locale(lang) && (getLocale = undefined);
}

class HTMLRelativeTimeElement extends HTMLElement {
  attachedCallback() {
    typeof getLocale === 'function' && getLocale();
    let currentDateTime = this.getAttribute('datetime');
    currentDateTime && this.attributeChangedCallback('datetime', currentDateTime, currentDateTime);
  }

  attributeChangedCallback(name, previousValue, value) {
    let relativeTime = moment(value).fromNow();
    this.textContent = relativeTime;
  }

  createdCallback() {
    let currentDateTime = this.getAttribute('datetime');
    currentDateTime && this.attributeChangedCallback('datetime', undefined, currentDateTime);
  }

  detachedCallback() {
  }
}

HTMLRelativeTimeElement.extends = 'time';

document.registerElement('relative-time', HTMLRelativeTimeElement);

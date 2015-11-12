'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

require('document-register-element');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getLocale() {
  var documentElement = (document || {}).documentElement;
  var lang = (documentElement || {}).leng;
  lang && _moment2.default.locale(lang) && (getLocale = undefined);
}

var HTMLRelativeTimeElement = (function (_HTMLElement) {
  _inherits(HTMLRelativeTimeElement, _HTMLElement);

  function HTMLRelativeTimeElement() {
    _classCallCheck(this, HTMLRelativeTimeElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLRelativeTimeElement).apply(this, arguments));
  }

  _createClass(HTMLRelativeTimeElement, [{
    key: 'attachedCallback',
    value: function attachedCallback() {
      typeof getLocale === 'function' && getLocale();
      var currentDateTime = this.getAttribute('datetime');
      currentDateTime && this.attributeChangedCallback('datetime', currentDateTime, currentDateTime);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, previousValue, value) {
      var relativeTime = (0, _moment2.default)(value).fromNow();
      this.textContent = relativeTime;
    }
  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      var currentDateTime = this.getAttribute('datetime');
      currentDateTime && this.attributeChangedCallback('datetime', undefined, currentDateTime);
    }
  }, {
    key: 'detachedCallback',
    value: function detachedCallback() {}
  }]);

  return HTMLRelativeTimeElement;
})(HTMLElement);

HTMLRelativeTimeElement.extends = 'time';

document.registerElement('relative-time', HTMLRelativeTimeElement);
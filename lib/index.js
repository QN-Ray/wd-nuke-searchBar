'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rax = require('rax');

var _nuke = require('nuke');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CloseIcon = function (_Component) {
    _inherits(CloseIcon, _Component);

    function CloseIcon() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CloseIcon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CloseIcon.__proto__ || Object.getPrototypeOf(CloseIcon)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            bShow: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CloseIcon, [{
        key: 'show',
        value: function show() {
            this.setState({
                bShow: true
            });
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({
                bShow: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _rax.createElement(_nuke.Icon, { name: 'deleteFilling', style: [_style2.default.searchCloseIcon, this.state.bShow ? { opacity: 1 } : { opacity: 0 }] });
        }
    }]);

    return CloseIcon;
}(_rax.Component);

var WDSearchBar = function (_Component2) {
    _inherits(WDSearchBar, _Component2);

    function WDSearchBar(props) {
        _classCallCheck(this, WDSearchBar);

        var _this2 = _possibleConstructorReturn(this, (WDSearchBar.__proto__ || Object.getPrototypeOf(WDSearchBar)).call(this, props));

        _this2.state = {
            clear: false,
            value: null
        };
        return _this2;
    }

    _createClass(WDSearchBar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.state.value = this.props.value || null;
            this.state.showMask = this.props.showMask;
            this.state.clear = this.props.value ? true : false;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.clear) {
                this.refs.closeIcon.show();
            }
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit() {
            if (this.props.onSubmit) {
                var value = this.state.value || '';
                this.props.onSubmit(value.trim && value.trim() || '');
            }
            this.refs.myInput && this.refs.myInput.blur && this.refs.myInput.blur();
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            if (e.value) {
                this.state.value = e.value;

                if (this.state.clear === false) {
                    this.state.clear = true;
                    this.refs.closeIcon.show();
                }
            } else {
                this.state.value = e.value;
                this.state.clear = false;
                this.refs.closeIcon.hide();
            }

            if (this.props.onChange) {
                this.props.onChange(e.value);
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus(e) {
            this.props.onFocus && this.props.onFocus(e.value);
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            this.state.showMask && this.refs.modal.hide();
            this.props.onBlur && this.props.onBlur(e.value);
        }
    }, {
        key: 'onClear',
        value: function onClear() {
            var _this3 = this;

            this.setState({
                value: ' '
            }, function () {
                _this3.setState({
                    value: ''
                }, function () {
                    _this3.state.value = '';
                    _this3.state.clear = false;
                    _this3.refs.closeIcon.hide();
                });
            });

            this.refs.myInput && this.refs.myInput.blur && this.refs.myInput.blur();

            if (this.props.onClear) {
                this.props.onClear('');
            }
            if (this.props.onChange) {
                this.props.onChange('');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var value = this.state.value;
            var _props = this.props,
                _props$placeholder = _props.placeholder,
                placeholder = _props$placeholder === undefined ? '输入关键字' : _props$placeholder,
                _props$editable = _props.editable,
                editable = _props$editable === undefined ? true : _props$editable,
                style = _props.style;

            return _rax.createElement(
                _nuke.View,
                { style: [_style2.default.wrapper, style] },
                _rax.createElement(_nuke.Input, {
                    type: 'text',
                    disabled: !editable,
                    placeholder: placeholder,
                    value: value,
                    onInput: this.onChange.bind(this),
                    onFocus: this.onFocus.bind(this),
                    onBlur: this.onBlur.bind(this),
                    style: _style2.default.input,
                    returnKeyType: 'search',
                    onReturn: function onReturn() {
                        _this4.onSubmit();
                    },
                    ref: 'myInput'
                }),
                _rax.createElement(
                    _nuke.View,
                    { style: _style2.default.search },
                    _rax.createElement(_nuke.Icon, { name: 'search', style: _style2.default.searchIcon })
                ),
                _rax.createElement(
                    _nuke.Touchable,
                    { style: _style2.default.searchClose, onPress: function onPress() {
                            return _this4.onClear();
                        } },
                    _rax.createElement(CloseIcon, { ref: 'closeIcon' })
                ),
                _rax.createElement(
                    _nuke.Touchable,
                    { style: _style2.default.searchTextContainer, onPress: function onPress() {
                            _this4.onSubmit();
                        } },
                    _rax.createElement(
                        _nuke.Text,
                        { style: _style2.default.searchText },
                        '\u641C\u7D22'
                    )
                )
            );
        }
    }]);

    return WDSearchBar;
}(_rax.Component);

exports.default = WDSearchBar;
module.exports = exports['default'];
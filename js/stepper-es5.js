'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Stepper = (function () {
    function Stepper(options) {
        _classCallCheck(this, Stepper);

        this.paper = Raphael(document.getElementById(options.id), options.width, options.height);
        this.bcgCircle = this.paper.circle(options.width / 2, options.height / 2, options.width / 2 - options.strokeWidth).attr({
            stroke: options.colors.bcg,
            'stroke-width': options.strokeWidth
        });
        this.options = options;
        var stepPct = options.activeStep / options.steps.length;
        if (stepPct === 1) {
            stepPct = 0.9999;
        }
        this.circle = this.sector(false, options.width / 2, options.height / 2, options.width / 2 - options.strokeWidth, 90, stepPct * 360 + 90, {
            stroke: options.colors.inner,
            'stroke-width': options.innerStrokeWidth
        });
        this.percent = this.paper.text(options.width / 2, options.height / 2 - this.options.percentOffset, options.activeStep / options.steps.length * 100 + '%').attr({
            'font-size': this.options.pecentFontSize,
            fill: this.options.colors.pourcent,
            'font-family': this.options.percentFontFamily
        });

        this.drawStepsState();
    }

    _createClass(Stepper, [{
        key: 'drawStepsState',
        value: function drawStepsState() {
            var _this = this;

            this.labels = [];
            this.options.steps.forEach(function (x, index) {
                var size = _this.options.labelFontSize,
                    color = _this.options.colors.label,
                    height = _this.options.height / 2 + _this.options.labelOffset,
                    opacity = 1;

                if (index + 1 === _this.options.activeStep - 1) {
                    color = _this.options.colors.unselectedLabel;
                    height -= _this.options.unselectedOffset;
                    size = _this.options.unselectedFontSize;
                    opacity = _this.options.unselectedOpacity;
                } else if (index + 1 === _this.options.activeStep + 1) {
                    color = _this.options.colors.unselectedLabel;
                    height += _this.options.unselectedOffset;
                    size = _this.options.unselectedFontSize;
                    opacity = _this.options.unselectedOpacity;
                } else if (index + 1 < _this.options.activeStep - 1 || index + 1 > _this.options.activeStep + 1) {
                    opacity = 0;
                }

                var label = _this.paper.text(_this.options.width / 2, height, x).attr({
                    'font-size': size,
                    fill: color,
                    'font-family': _this.options.labelFontFamily,
                    'opacity': opacity
                });
                _this.labels.push(label);
            });
        }
    }, {
        key: 'animateLabels',
        value: function animateLabels(step) {
            var _this2 = this;

            this.labels.forEach(function (x, index) {
                var size = _this2.options.labelFontSize,
                    color = _this2.options.colors.label,
                    height = _this2.options.height / 2 + _this2.options.labelOffset,
                    opacity = 1;

                if (index + 1 === step - 1) {
                    color = _this2.options.colors.unselectedLabel;
                    height -= _this2.options.unselectedOffset;
                    size = _this2.options.unselectedFontSize;
                    opacity = _this2.options.unselectedOpacity;
                } else if (index + 1 === step + 1) {
                    color = _this2.options.colors.unselectedLabel;
                    height += _this2.options.unselectedOffset;
                    size = _this2.options.unselectedFontSize;
                    opacity = _this2.options.unselectedOpacity;
                } else if (index + 1 !== step) {
                    opacity = 0;
                }

                x.animate({
                    'y': height,
                    'font-size': size,
                    fill: color,
                    'font-family': _this2.options.labelFontFamily,
                    'opacity': opacity
                }, _this2.options.swapTime * 1000);
            });
        }
    }, {
        key: 'sector',
        value: function sector(tp, cx, cy, r, startAngle, endAngle, params) {
            var rad = Math.PI / 180,
                x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx - r * Math.cos(-endAngle * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad);
            if (tp) {
                return ['M', x1, y1, 'A', r, r, 0, +(endAngle - startAngle > 180), 1, x2, y2];
            } else {
                return this.paper.path(['M', x1, y1, 'A', r, r, 0, +(endAngle - startAngle > 180), 1, x2, y2]).attr(params);
            }
        }
    }, {
        key: 'changeStep',
        value: function changeStep(step) {
            var targetStp = step / this.options.steps.length;
            if (targetStp === 1) {
                targetStp = 0.9999;
            }

            var current = this.options.activeStep / this.options.steps.length * 360 + 90,
                target = targetStp * 360 + 90,
                innerStep = (target - current) / 20;

            var pcCurrent = this.options.activeStep / this.options.steps.length * 100,
                pcTarget = step / this.options.steps.length * 100,
                pcStep = (pcTarget - pcCurrent) / 20;

            this.animateLabels(step);

            for (var i = 1; i <= 20; i++) {
                (function () {
                    var _this3 = this;

                    var counter = i;
                    setTimeout(function () {
                        _this3.tinyStep(current + counter * innerStep);
                        _this3.tinyNumberStep(Math.round(pcCurrent + pcStep * counter));
                    }, counter * this.options.swapTime * 1000 / 20);
                }).call(this);
            };

            this.options.activeStep = step;
        }
    }, {
        key: 'tinyNumberStep',
        value: function tinyNumberStep(number) {
            this.percent.attr('text', number + '%');
        }
    }, {
        key: 'tinyStep',
        value: function tinyStep(miniStep) {
            var path2 = this.sector(true, this.options.width / 2, this.options.height / 2, this.options.width / 2 - this.options.strokeWidth, 90, miniStep, { stroke: this.options.colors.inner, 'stroke-width': this.options.strokeWidth - 6 });
            this.circle.animate({ path: path2 }, this.options.swapTime * 1000 / 20);
        }
    }, {
        key: 'update',
        value: function update(camera) {
            _get(Object.getPrototypeOf(Stepper.prototype), 'update', this).call(this);
        }
    }]);

    return Stepper;
})();

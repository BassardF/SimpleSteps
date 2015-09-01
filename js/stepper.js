class Stepper {
    constructor(options) {
        this.paper = new Raphael(document.getElementById(options.canvasId), options.width, options.height);
        this.bcgCircle = this.paper.circle(options.width/2, options.height/2, options.width/2 - options.strokeWidth.bcg).attr({
            stroke : options.colors.bcg,
            'stroke-width' : options.strokeWidth.bcg
        });
        this.options = options;
        let stepPct = options.activeStep / options.steps.length;
        if(stepPct === 1){
            stepPct = 0.9999;
        }
        this.circle = this.sector(false, options.width/2, options.height/2, options.width/2 - options.strokeWidth.bcg, 90, stepPct * 360 + 90, {
            stroke : options.colors.inner,
            'stroke-width' : options.strokeWidth.inner
        });
        this.percent = this.paper.text(options.width/2, options.height/2 - this.options.offsets.percent, options.activeStep / options.steps.length * 100 + '%').attr({
            'font-size' : this.options.fontSize.percent,
            fill : this.options.colors.pourcent,
            'font-family' : this.options.fontFamily.percent
        });

        this.drawStepsState();
    }

    drawStepsState(){
        this.labels = [];
        this.options.steps.forEach((x, index) => {
            let size = this.options.fontSize.label,
                color = this.options.colors.label,
                height = this.options.height/2 + this.options.offsets.label,
                opacity = 1;

            if(index + 1 === this.options.activeStep - 1){
                color = this.options.colors.unselectedLabel;
                height -= this.options.offsets.unselected;
                size = this.options.fontSize.unselected;
                opacity = this.options.unselectedOpacity;
            } else if(index + 1 === this.options.activeStep + 1){
                color = this.options.colors.unselectedLabel;
                height += this.options.offsets.unselected;
                size = this.options.fontSize.unselected;
                opacity = this.options.unselectedOpacity;
            } else if(index + 1 < this.options.activeStep - 1 || index + 1 > this.options.activeStep + 1){
                opacity = 0;
            }

            let label = this.paper.text(this.options.width/2, height, x).attr({
                'font-size' : size, 
                fill : color,
                'font-family' : this.options.fontFamily.label,
                'opacity' : opacity
            });
            this.labels.push(label);
        });
    }

    animateLabels(step){
        this.labels.forEach((x, index) => {
            let size = this.options.fontSize.label,
                color = this.options.colors.label,
                height = this.options.height/2 + this.options.offsets.label,
                opacity = 1;

            if(index + 1 === step - 1){
                color = this.options.colors.unselectedLabel;
                height -= this.options.offsets.unselected;
                size = this.options.fontSize.unselected;
                opacity = this.options.unselectedOpacity;
            } else if(index + 1 === step + 1){
                color = this.options.colors.unselectedLabel;
                height += this.options.offsets.unselected;
                size = this.options.fontSize.unselected;
                opacity = this.options.unselectedOpacity;
            } else if(index + 1 !== step){
                opacity = 0;
            }

            x.animate({
                'y' : height,
                'font-size' : size, 
                fill : color,
                'font-family' : this.options.fontFamily.label,
                'opacity' : opacity
            }, this.options.transitionTime * 1000);
        });
    }

    sector(tp, cx, cy, r, startAngle, endAngle, params) {
        let rad = Math.PI / 180,
            x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx - r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        if(tp){
            return ["M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 1, x2, y2];
        } else {
            return this.paper.path(["M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 1, x2, y2]).attr(params);    
        }
    }

    changeStep(step){
        let targetStp = step / this.options.steps.length;
        if(targetStp === 1){
            targetStp = 0.9999;
        }

        let current = this.options.activeStep / this.options.steps.length * 360 + 90,
            target = targetStp * 360 + 90,
            innerStep = (target - current) / 40;

        let pcCurrent = this.options.activeStep / this.options.steps.length * 100,
            pcTarget = step / this.options.steps.length * 100,
            pcStep = (pcTarget - pcCurrent) / 40;


        this.animateLabels(step);

        for (var i = 1; i <= 40; i++) {
            (function(){
                let counter = i;
                setTimeout(() => {
                    this.tinyStep(current + counter * innerStep);
                    this.tinyNumberStep(Math.round(pcCurrent + pcStep * counter));
                }, counter * this.options.transitionTime * 1000 / 40);
            }.call(this));
        }

        this.options.activeStep = step;
    }

    tinyNumberStep(number){
        this.percent.attr('text', number + '%');
    }

    tinyStep(miniStep){
        let path2 = this.sector(true, this.options.width/2, this.options.height/2, this.options.width/2 - this.options.strokeWidth.bcg, 90, miniStep, {stroke : this.options.colors.inner, 'stroke-width' : this.options.strokeWidth.bcg - 6});
        this.circle.animate({path: path2}, this.options.transitionTime * 1000 / 40);
    }

    update(camera) {
        super.update();
    }
}

module.exports = Stepper;

// Base model for shapes
class Form {
    constructor(params) {
        this.points = [],
        this.fillStyle = params.fillStyle
    }  
    
}

class Line extends Form {
    constructor(params){
        super(params);
        this.line = d3.line().context(context);
        this.lineWidth = '1px';
    }
    init(x, y) {
        this.points.push([x,y], [x,y]);
    }
    update(x,y) {
        this.points.pop();
        this.points.push([x, y]);
    }
    render() {
        context.beginPath();
        context.strokeStyle = this.fillStyle;
        this.line(this.points);
        context.stroke();
        context.fill();
        context.closePath();
    }
}

class Rect extends Form {
    constructor(params) {
        super(params);
        this.width = 0;
        this.height = 0;
    }
    init(x, y) {
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
    }
    update(x, y) {
        this.points.pop();
        this.points.push([x, y]);
        this.width = x - this.x;
        this.height = y - this.y;
    }
    render() {
        context.beginPath();
        context.strokeStyle = this.fillStyle;
        context.strokeRect(this.x, this.y, this.width, this.height);
        context.stroke();
        context.closePath();

    }
}

class FillRect extends Rect {
    constructor(params) {
        super(params)
        this.rgbStyle = this.hexToRGB(params.fillStyle)
    }
    hexToRGB(color) {
        var value = color.match(/[A-Za-z0-9]{2}/g);
        value = value.map(function(v) { return parseInt(v, 16) });
        return value;   
    }
    render() {
        context.beginPath();
        context.fillStyle = "rgba(" + this.rgbStyle[0] + "," + this.rgbStyle[1] + "," + this.rgbStyle[2] + "," + 0.2 + ")"; 
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fill();
        context.closePath();

    }

}

// x, y, radius, startAngle and endAngle.
class Circle extends Form {
    constructor(params) {
        super(params)
    }
    init(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
    }
    update(x, y) {
        this.points.pop();
        this.points.push([x, y]);
        this.radius = Math.hypot(x-this.x, y-this.y);
    }
    render() {
        context.beginPath();
        context.strokeStyle = this.fillStyle;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2) // Complete circles
        context.stroke()
        context.closePath();
    }

}

class FillCircle extends Circle {
    init(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.rgbStyle = this.hexToRGB(params.fillStyle)
    }
    
    // Transform the value of the colorpicker to rgb
    hexToRGB(color) {
        var value = color.match(/[A-Za-z0-9]{2}/g);
        value = value.map(function(v) { return parseInt(v, 16) });
        return value;   
    }

    render() {
        context.beginPath();
        context.fillStyle = "rgba(" + this.rgbStyle[0] + "," + this.rgbStyle[1] + "," + this.rgbStyle[2] + "," + 0.2 + ")"; 
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill();
        context.closePath();
    }
}

// Factory of shapepes 
class ShapesFactory {
    constructor(type, params) {
        if(type === 'line') {
            return new Line(params);
        }
        if(type === 'rect') {
            return new Rect(params);
        }
        if(type === 'fillrect') {
            return new FillRect(params);
        }
        if(type == 'circle') {
            return new Circle(params);
        }
        if(type == 'fillcircle') {
            return new FillCircle(params);
        }
    }
}
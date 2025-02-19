export class SvgGradient {
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    convertHslToHex(hue, saturation, lightness) {
        const h = hue / 360;
        const s = saturation / 100;
        const l = lightness / 100;

        const r = this.calcComponent(h + 1 / 3, s, l);
        const g = this.calcComponent(h, s, l);
        const b = this.calcComponent(h - 1 / 3, s, l);

        return "#" + this.toHex(r) + this.toHex(g) + this.toHex(b);
    }

    calcComponent(h, s, l) {
        const chroma = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const base = 2 * l - chroma;

        if (h < 0) h += 1;
        if (h > 1) h -= 1;
        if (h < 1 / 6) {
            return base + (chroma - base) * 6 * h;
        }
        if (h < 1 / 2) {
            return chroma;
        }
        if (h < 2 / 3) {
            return base + (chroma - base) * (2 / 3 - h) * 6;
        }

        return base;
    }

    toHex(number) {
        const hex = Math.round(number * 255).toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    }

    generateVibrantColor() {
        return this.convertHslToHex(this.randomInt(0, 360), this.randomInt(70, 100), this.randomInt(40, 60));
    }

    generateColorStops(count) {
        const stops = [];
        for (let i = 0; i < count; i++) {
            stops.push(this.generateVibrantColor());
        }

        return stops;
    }

    createPosition(x, y, width) {
        return {
            x,
            y,
            radius: width / this.randomInt(2, 4),
        };
    }

    generateFirstAnchorPoint(width, height, buffer, isHorizontal, splitThreshold) {
        if (isHorizontal) {
            return this.createPosition(
                this.randomInt(buffer, splitThreshold - buffer),
                this.randomInt(buffer, height - buffer),
                width,
            );
        }

        return this.createPosition(
            this.randomInt(buffer, width - buffer),
            this.randomInt(buffer, splitThreshold - buffer),
            width,
        );
    }

    generateSecondAnchorPoint(width, height, buffer, isHorizontal, splitThreshold) {
        if (isHorizontal) {
            return this.createPosition(
                this.randomInt(splitThreshold + buffer, width - buffer),
                this.randomInt(buffer, height - buffer),
                width,
            );
        }
        return createPosition(
            this.randomInt(buffer, width - buffer),
            this.randomInt(splitThreshold + buffer, height - buffer),
            width,
        );
    }

    generateRandomPosition(width, height, buffer) {
        return this.createPosition(
            this.randomInt(buffer, width - buffer),
            this.randomInt(buffer, height - buffer),
            width,
        );
    }

    generateCirclePositions(count, width, height, buffer, isHorizontal, splitThreshold) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            if (i === 0) {
                positions.push(this.generateFirstAnchorPoint(width, height, buffer, isHorizontal, splitThreshold));
            } else if (i === 1) {
                positions.push(this.generateSecondAnchorPoint(width, height, buffer, isHorizontal, splitThreshold));
            } else {
                positions.push(this.generateRandomPosition(width, height, buffer));
            }
        }

        return positions;
    }

    generateCircleElements(positions, colors) {
        let elements = "";
        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            const color = colors[i] || colors[colors.length - 1];
            elements += `<circle cx="${pos.x}" cy="${pos.y}" r="${pos.radius}" fill="${color}"/>`;
        }

        return elements;
    }

    buildSvg(colorStops, circlePositions, width, height) {
        const blurRadius = width / 4;
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="${blurRadius}"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="${colorStops[0]}" opacity="0.15"/>
        <g filter="url(#blur)" opacity="0.85">
          ${this.generateCircleElements(circlePositions, colorStops)}
        </g>
      </svg>`;
    }

    generate(svgWidth = 256, svgHeight = 64) {
        const buffer = 5;
        const isHorizontal = svgWidth > svgHeight;
        const splitThreshold = isHorizontal ? svgWidth / 2 : svgHeight / 2;
        const colorCount = this.randomInt(3, 5);
        const colorStops = this.generateColorStops(colorCount);
        const circlePositions = this.generateCirclePositions(
            colorCount,
            svgWidth,
            svgHeight,
            buffer,
            isHorizontal,
            splitThreshold,
        );
        const svgString = this.buildSvg(colorStops, circlePositions, svgWidth, svgHeight);
        const encoded = encodeURIComponent(svgString).replace(/'/g, "%27").replace(/"/g, "%22");

        return `data:image/svg+xml,${encoded}`;
    }
}

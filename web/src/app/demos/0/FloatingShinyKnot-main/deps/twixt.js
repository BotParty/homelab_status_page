const Easings = {
  Linear: function (t) {
    return t;
  },

  InQuint: function (t) {
    return t * t * t * t * t;
  },
  OutQuint: function (t) {
    return --t * t * t * t * t + 1;
  },
  InOutQuint: function (t) {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
  },
};

class Twixt {
  constructor() {
    this.values = {};
    this.update();
  }

  create(name, value) {
    const v = new TwixtValue(value);
    this.values[name] = v;
    return v;
  }

  update() {
    requestAnimationFrame(this.update.bind(this));

    const time = performance.now();

    Object.keys(this.values).forEach((v) => {
      var value = this.values[v];
      this.updateValue(value, time);
    });
  }

  updateValue(value, time) {
    let nValue;
    let reached = false;

    if (value.duration === 0) {
      nValue = value.target;
    } else {
      const fn = value.easing;
      let t = time - value.startTime;
      t /= value.duration;

      t = fn(t);

      if (t < 0) {
        nValue = value.origin;
      } else if (t >= 1) {
        nValue = value.target;
        reached = true;
      } else {
        nValue = value.origin + t * (value.target - value.origin);
      }
    }

    value.value = nValue;
    if (reached && value.reached === false) {
      value.reached = true;
      value.onReached();
    }
  }
}

class TwixtValue {
  constructor(value, easing) {
    this.value = value || 0;
    this.origin = value || 0;
    this.target = value || 0;
    this.easing = easing || Easings.Linear;
    this.startTime = 0;
    this.duration = 0;
    this.reached = false;
  }

  to(target, duration, easing) {
    this.origin = this.value;
    this.startTime = performance.now();
    this.easing = Easings[easing] || this.easing;
    this.target = target;
    this.duration = duration || 0;
    this.reached = false;

    var value = this;

    return new Promise((resolve, reject) => {
      value.onReached = resolve;
    });
  }
}

const twixt = new Twixt();

export { twixt };

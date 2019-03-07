// -- SPECIAL FUNCTIONS -- //

function fetchLastColors() {
  let c = localStorage.getItem('color-stuff-color');
  if (c)
    globs.c_in.value = c;

  let tc = localStorage.getItem('color-stuff-top'),
      lc = localStorage.getItem('color-stuff-low');

  if (tc)
    outputColor(globs.t_out, globs.t_out_c, tc);
  if (lc)
    outputColor(globs.l_out, globs.l_out_c, lc);
}

function backupColor(c) {
  return localStorage.setItem('color-stuff-color', c);
}

function backupOutput() {
  localStorage.setItem('color-stuff-top',
    globs.t_out_c.innerHTML);
  localStorage.setItem('color-stuff-low',
    globs.l_out_c.innerHTML);
}

function isValidColor(c) {
    if (/rgb\((?: )*\d+(?: )*,(?: )*\d+(?: )*,(?: )*\d+(?: )*\)/g.test(c)) {
      return true;
    }
    else if (/rgba\((?: )*\d+(?: )*,(?: )*\d+(?: )*,(?: )*\d+(?: )*,(?: )*[0-1]?\.\d+(?: )*\)/g.test(c)) {
      return true;
    }
    else if (/#(?:(?:[A-Fa-f]|\d){6}$|(?:[A-Fa-f]|\d){3}$)/g.test(c)) {
      return true;
    }
    else if (/hsl\((?: )*\d+,(?: )*(?: )*\d+%,(?: )*\d+%(?: )*\)/g.test(c)) {
      return true;
    }
    else if (/hsla\((?: )*\d+(?: )*,(?: )*(?: )*\d+%(?: )*,(?: )*\d+%(?: )*,(?: )*[0-1]?\.\d+(?: )*\)/g.test(c)) {
      return true;
    }
    else if (globs.htmlColors.filter(e => e.toLowerCase() === c).length) {
      return true;
    }

    return false;
}

function getAndCheckColor() {
  let inColor = globs.c_in.value.toLowerCase().trim();

  if(!isValidColor(inColor)) {
    window.alert('Invalid color!');
    return null;
  }

  backupColor(inColor);
  return inColor;
}

function randColorName() {
  return globs.htmlColors[
    Math.floor(Math.random()*globs.htmlColors.length)];
}

function randHex() {
  return "#" + Math.random().toString(16).substr(2, 6);
}

function randRGB() {
  return "rgb(" + Array(3).fill(0).map(x =>
    Math.floor(Math.random()*256)) + ")";
}

function randHSL() {
  let rand = top => Math.floor(Math.random()*(top+1));
  return "hsl(" + rand(360) + ", " + rand(100) + "%, " +
    rand(100) + "%)";
}

function randColor() {
  let posbs = [
    randColorName,
    randHex,
    randRGB,
    randHSL
  ];
  return posbs[Math.floor(Math.random()*posbs.length)]();
}

function outputColor(target_div, target_text, c) {
  target_div.style.backgroundColor = c;
  target_text.innerHTML = c;
}

// ---------------------- //

// -- HANDLER FUNCTIONS -- //

function upColor() {
  let c = getAndCheckColor();

  if (!c)
    return;

  outputColor(globs.t_out, globs.t_out_c, c);
}

function downColor() {
  let c = getAndCheckColor();

  if (!c)
    return;

  outputColor(globs.l_out, globs.l_out_c, c);
}

function randColors() {
  outputColor(globs.t_out, globs.t_out_c, randColor());
  outputColor(globs.l_out, globs.l_out_c, randColor());
}

// ---------------------- //


// -- INIT FUNCTIONS -- //

const globs = {
  c_in: document.getElementById('in_color'),

  t_out: document.getElementById('o_up'),
  t_out_c: document.getElementById('o_up_c'),
  l_out: document.getElementById('o_lo'),
  l_out_c: document.getElementById('o_lo_c'),

  htmlColors: ['Black', 'Navy', 'DarkBlue', 'MediumBlue', 'Blue', 'DarkGreen', 'Green', 'Teal', 'DarkCyan', 'DeepSkyBlue', 'DarkTurquoise', 'MediumSpringGreen', 'Lime', 'SpringGreen', 'Aqua', 'Cyan', 'MidnightBlue', 'DodgerBlue', 'LightSeaGreen',
                'ForestGreen', 'SeaGreen', 'DarkSlateGray', 'DarkSlateGrey', 'LimeGreen', 'MediumSeaGreen', 'Turquoise', 'RoyalBlue', 'SteelBlue', 'DarkSlateBlue', 'MediumTurquoise', 'Indigo', 'DarkOliveGreen', 'CadetBlue', 'CornflowerBlue', 'RebeccaPurple', 'MediumAquaMarine', 'DimGray', 'DimGrey', 'SlateBlue',
                'OliveDrab', 'SlateGray', 'SlateGrey', 'LightSlateGray', 'LightSlateGrey', 'MediumSlateBlue', 'LawnGreen', 'Chartreuse', 'Aquamarine', 'Maroon', 'Purple', 'Olive', 'Gray', 'Grey', 'SkyBlue', 'LightSkyBlue', 'BlueViolet', 'DarkRed', 'DarkMagenta', 'SaddleBrown',
                'DarkSeaGreen', 'LightGreen', 'MediumPurple', 'DarkViolet', 'PaleGreen', 'DarkOrchid', 'YellowGreen', 'Sienna', 'Brown', 'DarkGray', 'DarkGrey', 'LightBlue', 'GreenYellow', 'PaleTurquoise', 'LightSteelBlue', 'PowderBlue', 'FireBrick', 'DarkGoldenRod', 'MediumOrchid', 'RosyBrown',
                'DarkKhaki', 'Silver', 'MediumVioletRed', 'IndianRed', 'Peru', 'Chocolate', 'Tan', 'LightGray', 'LightGrey', 'Thistle', 'Orchid', 'GoldenRod', 'PaleVioletRed', 'Crimson', 'Gainsboro', 'Plum', 'BurlyWood', 'LightCyan', 'Lavender', 'DarkSalmon',
                'Violet', 'PaleGoldenRod', 'LightCoral', 'Khaki', 'AliceBlue', 'HoneyDew', 'Azure', 'SandyBrown', 'Wheat', 'Beige', 'WhiteSmoke', 'MintCream', 'GhostWhite', 'Salmon', 'AntiqueWhite', 'Linen', 'LightGoldenRodYellow', 'OldLace', 'Red', 'Fuchsia',
                'Magenta', 'DeepPink', 'OrangeRed', 'Tomato', 'HotPink', 'Coral', 'DarkOrange', 'LightSalmon', 'Orange', 'LightPink', 'Pink', 'Gold', 'PeachPuff', 'NavajoWhite', 'Moccasin', 'Bisque', 'MistyRose', 'BlanchedAlmond', 'PapayaWhip', 'LavenderBlush',
                'SeaShell', 'Cornsilk', 'LemonChiffon', 'FloralWhite', 'Snow', 'Yellow', 'LightYellow', 'Ivory', 'White']
};

const listenerInit = () => {
  document.getElementById('i_up').addEventListener('click', upColor);
  document.getElementById('i_down').addEventListener('click', downColor);
  document.getElementById('i_rand').addEventListener('click', randColors);

  document.addEventListener('click', e => {
    backupOutput();
  });
};

const init = () => {
  fetchLastColors();
  listenerInit();
};

// ---------------------- //

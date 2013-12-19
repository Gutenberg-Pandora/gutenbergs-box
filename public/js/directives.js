// There must be a better way to do this. Really. Y'know, with Angular.
// Still, this hack should work.
setTimeout(function() {
  var idx;

  var inputs = document.getElementsByTagName("input");
  var input;
  var searchbox = null;

  for (idx = 0; idx < inputs.length; idx++) {
    input = inputs[idx];
    if (!searchbox && input.getAttribute('placeholder') === 'Search') {
      searchbox = input;
    }
  }

  var buttons = document.getElementsByTagName("button");
  var button;
  var gobutton = null;

  for (idx = 0; idx < buttons.length; idx++) {
    button = buttons[idx];
    if (!gobutton && button.getAttribute('ng-click') === 'classify(title)') {
      gobutton = button;
    }
  }

  searchbox.addEventListener('keypress', function(ev) {
    if (ev.which === 13) {
      gobutton.click();
    }
  });
}, 1 * 1000);

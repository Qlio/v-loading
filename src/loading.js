import './style.css';

function plugin (Vue) {
  Vue.directive('loading', {
    bind (el, binding, vnode) {
      let position = window.getComputedStyle(el).position;
      if (position === 'static' || position === '') {
        el.style.position = 'relative';
      }
      let msg = document.createElement('div');
      msg.className = 'vue-loading-msg';

      let spinner = document.createElement('i');
      spinner.className = 'fa fa-spin fa-spinner fa-3x';

      let box = document.createElement('div');
      box.className = 'vue-loading-box';

      msg.appendChild(spinner);
      box.appendChild(msg);
      el.appendChild(box);

      if (binding.value) {
        binding.def.showLoadingBox(box);
      }
    },
    update (el, binding, vnode) {
      let box = el.getElementsByClassName('vue-loading-box')[0];
      if (binding.value) {
        binding.def.showLoadingBox(box);
      } else {
        binding.def.hideLoadingBox(box);
      }
    },
    showLoadingBox (box) {
      box.style.display = 'initial';
      window.requestAnimationFrame(() => {
        box.style.opacity = 1;
      })
    },
    hideLoadingBox (box) {
      box.style.display = 'none';
      window.requestAnimationFrame(() => {
        box.style.opacity = 0;
      })
    }
  })
}

plugin.version = '0.0.1'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

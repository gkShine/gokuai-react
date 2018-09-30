<script>
  export default {
    name: 'gk-scroll-load',
    bind(el, binding) {
      let timer = 0;
      let option = (new Function('return {' + (el.getAttribute('gk-scroll-load-option') || '') + '}'))();

      option = Object.assign({
        distance: 20,
        disabled: false,
        frequency: 200,
        selector: false
      }, option);
      if (option.selector !== false && el.querySelector(option.selector).length) {
        el = el.querySelector(option.selector);
      }
      let check = () => {
        if (el.scrollTop && el.scrollTop + el.clientHeight + option.distance >= el.scrollHeight) {
          if (typeof binding.value === 'function') {
            binding.value();
          }
        }
      };
      check();
      el.onscroll = () => {
        if (option.disabled) {
          return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          check();
        }, option.frequency);
      }
    },

    update(el, binding) {
    }
  };
</script>
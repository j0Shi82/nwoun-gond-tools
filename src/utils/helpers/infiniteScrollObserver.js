export default (callback = () => {}, options = {}) => new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    callback();
  }
}, {
  rootMargin: '500px',
  ...options,
});

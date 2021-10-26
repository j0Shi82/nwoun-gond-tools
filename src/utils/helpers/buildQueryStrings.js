export default (paramData = []) => {
  if (paramData.length === 0) return '';
  const params = [];
  paramData.forEach((param) => {
    switch (param.type) {
      case 'innerText':
        if (param.comp) params.push(`${param.name}=${param.element.innerText}`);
        break;
      case 'attrValue':
        if (param.comp) params.push(`${param.name}=${param.element.value}`);
        break;
      case 'value':
        if (param.comp) params.push(`${param.name}=${param.element}`);
        break;
      default:
        break;
    }
  });
  return params.length ? `?${params.join('&')}` : '';
};

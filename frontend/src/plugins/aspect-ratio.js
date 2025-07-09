const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addComponents, theme }) {
  const aspectRatioComponents = {
    '.aspect-w-1': {
      position: 'relative',
      paddingBottom: '100%',
    },
    '.aspect-w-16': {
      position: 'relative',
      paddingBottom: '56.25%', /* 16:9 */
    },
    '.aspect-w-4': {
      position: 'relative',
      paddingBottom: '75%', /* 4:3 */
    },
    '.aspect-w-3': {
      position: 'relative',
      paddingBottom: '66.66%', /* 3:2 */
    },
    '.aspect-h-1': {
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  };

  addComponents(aspectRatioComponents);
});
